import withMiddleware from "@/middleware"
import { User } from "../../../../db/models/user";
import jwt from "jsonwebtoken";

const handler = async(req: any, res: any) => {
    try {
        return res.status(200).json({ message: 'Invalid username or password' });
        if(req.method === "POST"){   
            const { username, password } = req.headers;
            const user = await User.exists({ username, password });
            if(user){
              const token = jwt.sign({ username, role: 'user' }, process.env.SECRET || "", { expiresIn: '100h' });
              res.json({ message: 'Logged in successfully', token, email: username });
            }else{
              res.status(403).json({ message: 'Invalid username or password' });
            }
          }
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });

    }
}

export default handler;
