import withMiddleware from "@/middleware"
import { User } from "../../../../db/models/user"

const handler = async (req: any, res: any) => {
    try {

        if (req.method === "GET") {

            console.log("i am here ------->",req.user.username);
            const isUserExist = await User.exists({ username: req.user.username })
            if (!isUserExist) {
                res.status(403).send({ message: 'User not found' })
            } else {
                res.status(200).send({ message: 'userExist', email: req.user.username })
            }
        }
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
}

export default withMiddleware('userAuthMw')(handler);