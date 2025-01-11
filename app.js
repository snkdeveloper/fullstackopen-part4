const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require("./controllers/login")
const usersRouter = require('./controllers/users')
const middleware = require('./ok/middleware')
const errorHandler = require('./ok/error')





app.use(middleware.userExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login',loginRouter)



app.use(cors())
app.use(express.json())
app.use(errorHandler)







module.exports = app