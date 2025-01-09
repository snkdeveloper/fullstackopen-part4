const express = require('express')
const app = express()
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')





app.use('/api/blogs', blogsRouter)



app.use(cors())
app.use(express.json())







module.exports = app