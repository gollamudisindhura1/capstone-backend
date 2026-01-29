// This middleware verifies the JWT token sent in the Authorization header
// It attaches the decoded user ID to req.user if valid
// Used to protect routes that require authentication

const jwt = require('jsonwebtoken')

//Middleware Authentication

const auth = async (req, res, next) =>{
    try{
    // 1. Get token from header (format: "Bearer <token>")
    const token = req.header('Authorization')?.replace('Bearer', '');
    if(!token){
        return res.status(401).json({
            message: 'No authentication token provided. Please log in'
        });
    }
     // verify the token using our secret
        const decoded = jwt.verify(token,process.env.JWT_SECRET );
        // Attach the user ID to the request object
        // So controllers can access req.user._id 
        req.user = {_id: decoded._id}
        // Proceed to the next middleware
        next()
    }catch(error){
        // Handle the differernt JWT errors 

        if(error.name === 'JsonWebTokenError'){
            return res.status(401).json({
                message: 'Invalid token. Please log in again.'
            })
        }
        if(error.name==='TokenExpiredError'){
            return res.status(401).json({
                message: 'Token has expired. Please log in again.'
            })
        }
        //Fallback for the other errors
        console.error('Auth middleware error:',error);
        res.status(401).json({message: 'Authentication failed.'})

    }

}
module.exports = auth;