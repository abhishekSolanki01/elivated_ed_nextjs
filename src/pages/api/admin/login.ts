import { NextApiRequest, NextApiResponse } from "next";
import Admin from "../../../../db/models/admin";
import { connectToDataBase } from "@/pages/db/database";

const jwt = require('jsonwebtoken');
// const Admin = require('../db/admin');

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  try{
    connectToDataBase()

    if(req.method==="POST"){
      const {username, password} = req.headers;
      const ifAdminExist = await Admin.find({});
      // if(ifAdminExist){
      //   const token = jwt.sign({ username, role: 'admin' }, process.env.SECRET, { expiresIn: '100h' });
      //   res.json({ message: 'Logged in successfully', token, email: username  });
      // }else{
      //   res.status(403).json({ message: 'Invalid username or password' });
      // }
    // res.send(400)
            res.status(200).json(ifAdminExist);


    }else{
      res.send(300)

    }
  }catch(error){
    res.send(400)
  }
}

export default handler;