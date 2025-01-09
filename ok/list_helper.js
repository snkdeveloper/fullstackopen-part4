// const blog = require("../models/blog")

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]


const lo =require('lodash')
const favouriteBlog = (blogs) =>{
  let max = Math.max.apply(null,blogs.map(function(o){return o.likes}))

  return blo = blogs.find(o => o.likes=== max)

}

const mostBlogs = (blogs) =>{
  const red=(blog)=>{
    return blog.author
  }
  const nice = lo.countBy(blogs,red)
  let arr = Object.values(nice)
  let max = Math.max(...arr)
  for (let[key,value] of Object.entries(nice)){
    if(value==max){
      return {
        "author":key,
        "blogs":value
      }
    }
  }


}

const mostLikes = (blogs) =>{
  max = 0
  let jacob = {}
  const aumost = []
  const red=(blog)=>{
    return blog.author
  }
  const nice = lo.groupBy(blogs,red)
  // let arr = Object.values(nice)
  // let max = Math.max(...arr)
  for (let[key,value] of Object.entries(nice)){
    count = 0
    // console.log(key)
    // console.log(value)
    const list = value.values()

    for(let obj of list){
      // console.log("obj", obj)
      for(let[key2,value2] of Object.entries(obj)){
      // console.log(key2)
      // console.log("val2", value2)
      if(key2==="likes"){
        count+=value2

      }
      
    }
    
    }if(count>max){
      max = count
      jacob = {
        author:key,
        likes:count
      }

    }
   
  }
  return jacob


}

const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) =>{
const reducer = (sum,item)=>{
  return sum + item.likes
}

return blogs.reduce(reducer,0)



}


  
  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
  }

