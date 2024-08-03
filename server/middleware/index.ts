import jwt from 'jsonwebtoken';
export const SECRET = 'SECr3T';
import {Request,Response,NextFunction} from "express";

export const authenticateJwt = ( req:Request , res:Response , next:NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,SECRET,(err,user)=>{
            if (err || !user) {
                return res.sendStatus(403);
            }

            // Assuming user is a JwtPayload and has an 'id' property
            if (typeof user !== "string" && "id" in user) {
                req.headers["userId"] = (user as jwt.JwtPayload).id;
                next();
            } else {
                res.sendStatus(403);
            }
            // if(err){
            //     return res.sendStatus(403);
            // }
            // if(!user){
            //     res.sendStatus(403);
            // }
            // if(typeof user === "string"){
            //     res.sendStatus(403);
            // }
            // req.headers["userId"] = user.id;
            next();
        });
    }else{
        res.sendStatus(401);
    }
};
