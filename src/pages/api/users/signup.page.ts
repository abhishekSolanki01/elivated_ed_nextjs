import { User } from "../../../../db/models/user";
import jwt from 'jsonwebtoken';

const handler = async(req: any, res: any) => {
    if(req.method === "POST"){
        const { username, password } = req.body;
        if(!username || !password ){
          res.status(403).json({ message: 'enter correct email and password' });
        }
        const addUser = await User.exists({username})
        if(addUser){
          res.status(403).json({ message: 'User already exists' });
        }else{
          const addNewUser = new User({username, password})
          await addNewUser.save(); 
          const token = await jwt.sign({username, password}, process.env.SECRET || "", {expiresIn: "1h"});
          res.json({ message: 'User created successfully', token, email: username  });
        }
      }
}

export default handler;