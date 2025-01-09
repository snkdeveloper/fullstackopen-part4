const Blog = require('../models/blog')
const bac = async() => {
    const notes = await Blog.find({})
    
    const j = notes.map(note => note.toJSON())
    const first = await j[0]
    return first
    
  

    
}



module.exports={bac}