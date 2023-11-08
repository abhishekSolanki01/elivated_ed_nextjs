import withMiddleware from "@/middleware"
import { User } from "../../../../db/models/user";
import jwt from "jsonwebtoken";
import { connectToDataBase } from "../../../../db/database";

const handler = async(req: any, res: any) => {
    try {
        // return res.status(200).json({ message: 'Invalid username or password --- test' });
        if(req.method === "POST"){   
            await connectToDataBase()
            console.log("inside")
            const { username, password } = req.headers;
            console.log("username, password", username, password)
            const user = await User.exists({ username, password });
            console.log("user",user)
            if(user){
              const token = jwt.sign({ username, role: 'user' }, process.env.SECRET || "", { expiresIn: '100h' });
                
              res.json({ message: 'Logged in successfully', token, email: username });
            }else{
              res.status(403).json({ message: 'Invalid username or password' });
            }
          }
    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ message: 'internal server error' });

    }
}

export default handler;
