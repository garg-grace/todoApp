import { Request } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  userId?: string;
  user?: jwt.JwtPayload | string;
}