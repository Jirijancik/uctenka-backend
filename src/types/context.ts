import { Request, Response } from "express";
import { SessionData } from "express-session";
import { User } from "../schema/user.schema.ts";

export interface Context {
    req: Request<SessionData>,
    res: Response,
    user: User | null
}