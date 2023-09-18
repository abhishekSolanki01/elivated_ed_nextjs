import { NextApiRequest, NextApiResponse } from "next";
import Admin from "../../../../db/models/admin";
import { connectToDataBase } from "@/pages/db/database";

const jwt = require('jsonwebtoken');
// const Admin = require('../db/admin');

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  try{
    connectToDataBase()

    if(req.method==="POST"){
      const { username, password } = req.body;
  
    const alreadyAnAdmin = await Admin.exists({username});
    if(alreadyAnAdmin){
      res.status(403).send({message: 'Admin already exists'})
    }else{
      const obj = { username, password };
      const adminToBeAdd = new Admin(obj)
      const saveAdmin = await adminToBeAdd.save();
      const token = jwt.sign({username, role: 'admin'}, process.env.SECRET, { expiresIn: '100h' })
      res.json({ message: 'Admin created successfully', token , email: username });
    }


    }else{
      res.send(300)

    }
  }catch(error){
    res.send(400)
  }
}

export default handler;
