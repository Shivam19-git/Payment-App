const JWT_SECRET = require('../Config')
const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
    const authHeader = req.header.authorization
    
    if(!authHeader || authHeader.startsWith('Bearer ')){
        return res.status(411).json({
            message : "Give valid Auth Header"
        })
    }

    const token = authHeader.split(' ')[1] // Split String into array where it find white space, Access element of index [1] that is second element 
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        req.userId = decoded.userId
        
    }catch(e){
        res.status(404).json({
            error : e 
        })
    }

}

module.exports = authMiddleware