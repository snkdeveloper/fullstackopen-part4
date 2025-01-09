
const express = require('express')
const blogsRouter = require('express').Router()
blogsRouter.use(express.json())
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })

  blogsRouter.post('/', (request, response) => {
    console.log(request.body)
    const blog = new Blog({
        title:request.body.title,
        author:request.body.author,
        url:request.body.url,
        likes:request.body.likes
    })
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  module.exports = blogsRouter