import JWT from 'jsonwebtoken';
import usermodel from '../models/usermodel.js';

// Protected Routes token base
export const requireSignIn =async(req, res, next)=>{
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_ACCESS_SECRET
        );
        req.user=decode;
        next();
    } catch (error) {
        console.log(error)
    }
}

// admin access
export const isAdmin = async(req, res, next)=>{
    try {
        const user = await usermodel.findById(req.user._id);
        if(user.role != 1)
        {
            return res.status(401).send({
                success: false,
                message:"You are not authorized to perform this action"
            })
        }else{
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success: false,
            message:'Error in Admin Middleware'
        })
    }
}

export const protect = async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
  
        //decodes token id
        const decoded = JWT.verify(token, process.env.JWT_ACCESS_SECRET);
  
        req.user = await usermodel.findById(decoded._id).select("-password");
  
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }
  
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  };
  