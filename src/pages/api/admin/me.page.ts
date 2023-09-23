import { NextApiRequest, NextApiResponse } from "next"
import { connectToDataBase } from "../../../../db/database"
import Admin from "../../../../db/models/admin"
import CustomRequest from "@/types"
import withMiddleware from "@/middleware"

const handler = async(req: any, res: any) => {
    try {

        if(req.method==="GET"){
            
            const isUserExist = await Admin.exists({ username: req.user.username })
            
            if (!isUserExist) {
                res.status(403).send({ message: 'User not found' })
            } else {
                res.status(200).send({ message: 'userExist', email: req.user.username, isAdmin: true })
            }
        }

    } catch (error) {
        console.log(error);
        
        res.status(500).send({ message: 'Internal server error' })
    }
}

export default withMiddleware("authMw")(handler);


