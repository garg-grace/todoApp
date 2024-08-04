"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = exports.SECRET = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET = 'SECr3T';
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, exports.SECRET, (err, user) => {
            if (err || !user) {
                return res.sendStatus(403);
            }
            // Assuming user is a JwtPayload and has an 'id' property
            if (typeof user !== "string") {
                req.userId = user.id;
                return next();
            }
            else {
                return res.sendStatus(403);
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
            // next();
        });
    }
    else {
        return res.sendStatus(401);
    }
};
exports.authenticateJwt = authenticateJwt;
