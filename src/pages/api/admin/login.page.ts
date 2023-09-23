import { NextApiRequest, NextApiResponse } from "next";
import Admin from "../../../../db/models/admin";
import { connectToDataBase } from "@/pages/db/database";

const jwt = require('jsonwebtoken');

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  try{
    await connectToDataBase()

    if(req.method==="POST"){
      const {username, password} = req.headers;
      const ifAdminExist = await Admin.find({username, password});
      if(ifAdminExist){
        const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, { expiresIn: '100h' });
        res.json({ message: 'Logged in successfully', token, email: username  });
      }else{
        res.status(403).json({ message: 'Invalid username or password' });
      }
    }else{
      res.send(300)

    }
  }catch(error){
    res.send(400)
    console.log(error);
    
  }
}

export default handler;