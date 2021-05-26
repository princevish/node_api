const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

const auth = async(req,res,next)=>{
    try{
         const usercookie =req.cookies.key;
         const token=jwt.verify(usercookie,process.env.SECRET_CODE);
         console.log(token);
         const userfind =await User.findById({_id:token.id});
         if(!userfind){ throw new Error('user not found')}
         req.userID=token.id;
         req.userEmail=token.email;
         next()
    }catch(err){
        res.status(401).json({error:err,msg:"token invalid"});

    }
}
module.exports = auth;