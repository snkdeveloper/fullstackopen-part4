const jwt = require('jsonwebtoken')
const User = require('../models/user')
const tokenExtractor = (request, response, next) => {
    // code that extracts the token
     
        const authorization = request.get('authorization')
        if (authorization && authorization.startsWith('Bearer ')) {
            request.token = authorization.replace('Bearer ', '')
        }else{
            request.token = null
        }
      
      
    next()
  }
  const userExtractor = async(request, response, next) => {
    // code that extracts the token

     
        const authorization = request.get('authorization')
        if (authorization && authorization.startsWith('Bearer ')) {
            const token = authorization.replace('Bearer ', '')
            const decodedToken = jwt.verify(token, process.env.SECRET)
            request.user = await User.findById(decodedToken.id)

        }else{
            request.user = null
        }
      
      
    next()
  }

module.exports= {tokenExtractor,userExtractor}