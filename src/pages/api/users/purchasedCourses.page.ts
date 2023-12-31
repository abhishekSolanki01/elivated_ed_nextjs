import withMiddleware from "@/middleware";
import { User } from "../../../../db/models/user";
// import { connectToDataBase } from "../../../../db/database";


const handler = async(req: any, res: any)=>{
    try {
        if(req.method === "GET"){
            // await connectToDataBase()

            const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
            if(user){
              res.json({ purchasedCourses: user.purchasedCourses || [] });
            }else {
              res.status(403).json({ message: 'User not found' });
            }
          }
    } catch (error) {
        res.status(403).json({ message: 'Internal server error' });
    }
}

export default withMiddleware("userAuthMw")(handler);
