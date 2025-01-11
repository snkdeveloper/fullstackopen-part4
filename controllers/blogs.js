const jwt = require('jsonwebtoken')
const express = require('express')
const blogsRouter = require('express').Router()
blogsRouter.use(express.json())

const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
    
  })
  blogsRouter.get('/:id', async(request, response, next) => {
    const blog = await Blog.findById(request.params.id)
      
        if (blog) {
          response.json(blog)
        } else {
          response.status(404).end()
        }
    
      
  })

  blogsRouter.post('/', async(request, response) => {
    
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!decodedToken.id) {
    //   return response.status(401).json({ error: 'token invalid' })
    // }
    const user2 = request.user
    
    const like = request.body.likes ===undefined?0:request.body.likes
    const blog = new Blog({
        title:request.body.title,
        author:request.body.author,
        url:request.body.url,
        likes:like,

        user:user2
    })

    const result = await blog.save()
    // if(user==null){

    //   response.status(201).json(result)
    // }else{
      
      user2.blogs = user2.blogs.concat(result._id)
      await user2.save()
      
      response.status(201).json(result)

   // }

  

    
    
  
  
  })


  blogsRouter.delete('/:id', async(request, response,next) => {
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user2 = request.user
    const blog =  await Blog.findById((request.params.id))
    if(blog.user.toString()===user2._id.toString()){
      await Blog.findByIdAndDelete(request.params.id)

    }else{
      return response.status(401).json({
        error: 'you cannot delete other people blogs!'
      })
    }
   
    response.status(204).end()
     
     
  })

  blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    // console.log(body)
  
    const blog = {
      title: body.title,
      author:body.author,
      url:body.url,
      likes:body.likes
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
      
  })

  module.exports = blogsRouter