
const express = require('express')
const blogsRouter = require('express').Router()
blogsRouter.use(express.json())
const Blog = require('../models/blog')


blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
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
    // console.log(request.body)
    const like = request.body.likes ===undefined?0:request.body.likes
    const blog = new Blog({
        title:request.body.title,
        author:request.body.author,
        url:request.body.url,
        likes:like
    })

    const result = await blog.save()
    response.status(201).json(result)
  
  
  })


  blogsRouter.delete('/:id', async(request, response,next) => {
    await Blog.findByIdAndDelete(request.params.id)
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