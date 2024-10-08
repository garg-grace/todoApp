import express from "express";
import jwt from "jsonwebtoken";
import {authenticateJwt, SECRET} from "../middleware/index";
import {User} from "../db";
const router = express.Router();
import { CustomRequest } from "../types";
import { z } from "zod";

const reqInput = z.object({
    username : z.string().min(1).max(20),
    password:z.string().min(1).max(20)
})

router.post('/signup',async (req,res)=>{
    const parsedInput = reqInput.safeParse(req.body);
    if(!parsedInput.success){
        res.status(411).json({
            error:parsedInput.error
        })
        return;
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;

    const user = await User.findOne({username});

    if(user){
        res.status(403).json({message:'User already exists'});
    }else{
        const newUser = new User({username,password});
        await newUser.save();
        const token = jwt.sign({ id: newUser._id},SECRET,{expiresIn:'1h'});
        res.json({message:'User created successfully',token});
    }
});

router.post('/login',async (req,res)=>{
    const parsedInput = reqInput.safeParse(req.body);
    if(!parsedInput.success){
        res.status(411).json({
            error:parsedInput.error
        })
        return;
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    
    const user = await User.findOne({username,password});

    if(user){
        const token = jwt.sign({id:user._id},SECRET,{expiresIn:'1h'});
        res.json({message:'Logged in successfully',token});
    }else{
        res.status(403).json({message:'Invalid username or password'});
    }
});

router.get('/me',authenticateJwt,async (req:CustomRequest,res)=>{
    const userId = req.userId;
    
    const user = await User.findOne({_id:userId});
    

    if(user){
        res.json({username:user.username});
    }else{
        res.status(403).json({message:'User not logged in'});
    }
});

export default router;