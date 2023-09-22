import { Middleware } from "next-api-middleware";
import jwt from 'jsonwebtoken'
import { User } from "../../db/models/user";
import { connectToDataBase } from "../../db/database";

const userAuthMw: Middleware = async (req, res, next) => {
    try {
        
        await connectToDataBase()
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(403).send({ message: "Unauthorised" })
        }
        const token = authorization.split(" ")[1];
        const decodeToken = await jwt.verify(token, process.env.SECRET || "");
        let user;
        if (typeof decodeToken === 'string') {
            return res.status(403).json({ message: 'User not found' });
        }
        console.log("====>check01", decodeToken);
        if (decodeToken) {
            
            user = await User.exists({ username: decodeToken.username })
        }
        if (user) {
            (req as any).user = decodeToken
            next();
        } else {
            return res.status(403).json({ message: 'User not found' });
        }
    } catch (e) {
        return res.status(403).json({ message: 'User not found' });
    }
}

export default userAuthMw;