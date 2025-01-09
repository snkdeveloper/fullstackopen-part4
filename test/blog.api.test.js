const { test, after} = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')


const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id is retured',async()=>{
    const helper = require('D:\\Projects\\fullstack\\fullstackopen-part4\\tests\\test_helper')
   
    const blogToDelete = await helper.bac()

    const response = await api.get('/api/blogs')
    

    assert.strictEqual(response.body[0].id,blogToDelete.id)
})
test('a valid note can be added ', async () => {
    const newBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    }
    const response1 = await api.get('/api/blogs')
   
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response2 = await api.get('/api/blogs')
    
  
    const contents = response2.body.map(r => r.title)
  
    assert.strictEqual(response1.body.length + 1, response2.body.length)
  
    assert(contents.includes('React patterns'))
  })

test('likes test',async()=>{
    const newBlog2 = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        
    }
    const response1 = await api.get('/api/blogs')
   
   
    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response2 = await api.get('/api/blogs')

    
  
    const contents = response2.body.map(r => r.likes)
  
    assert.strictEqual(contents[response2.body.length-1], 0)
  
  
    


})

test('delete test',async()=>{
    const helper = require('D:\\Projects\\fullstack\\fullstackopen-part4\\tests\\test_helper')
   
    const blogToDelete = await helper.bac()

    
    
    const response1 = await api.get('/api/blogs')
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
      
  
    const response2 = await api.get('/api/blogs')
    
  
    assert.strictEqual(response1.body.length-1, response2.body.length)
  
    


})

test('a valid note can be updated ', async () => {
    const helper = require('D:\\Projects\\fullstack\\fullstackopen-part4\\tests\\test_helper')
    const first= await helper.bac()
    
    const newBlog = {
        title: " patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 8
    }
   
   
    await api
      .put(`/api/blogs/${first.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    
    
  
    const blogToUpdate2 = await helper.bac()
    delete blogToUpdate2.id
    assert.deepStrictEqual(blogToUpdate2, newBlog)
  
    
  })

after(async () => {
    await mongoose.connection.close()
  })
  