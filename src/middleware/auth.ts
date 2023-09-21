import CustomRequest from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import Admin from "../../db/models/admin";
import { Middleware } from "next-api-middleware";
import { connectToDataBase } from "../../db/database";

const authMw: Middleware = async (req, res, next) => {
    try {
        await connectToDataBase()

        const authorization = req.headers.authorization;


        if (!authorization) {
            console.log("Unauth");
            return res.status(403).send({ message: "Unauthorised" })
        }
        const token = authorization.split(" ")[1];

        const decodeToken = await jwt.verify(token, process.env.SECRET || "");

        if (typeof decodeToken === 'string') {
            return res.status(401).send({ message: "Unauthorised" });
        } else if (typeof decodeToken === 'object') {
            const adminUser = await Admin.exists({ username: decodeToken.username })
            
            if (adminUser) {
                (req as any).user = decodeToken
                next();
            } else {
                return res.status(401).send({ message: "Unauthorised" });
            }
        }else{
            return res.status(401).send({ message: "Unauthorised" });
        }

    } catch (err) {
        return res.status(401).send({ message: "Unauthorised" });
    }
}

export default authMw;