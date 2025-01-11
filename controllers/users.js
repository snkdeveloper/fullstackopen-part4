const express = require('express')
const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
usersRouter.use(express.json())
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  
  if(request.body.password === undefined){
    return response.status(400).json({ error: 'Please provide passsword' })
  }
  const { username, name, password } = request.body
  
  
  if(password.length <3){
    return response.status(400).json({ error: 'password too short' })
  }



  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
 
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs',{ url: 1, title: 1,author:1 })
    response.json(users)
  })

module.exports = usersRouter