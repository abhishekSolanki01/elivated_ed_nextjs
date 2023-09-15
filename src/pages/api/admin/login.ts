
const jwt = require('jsonwebtoken');
const Admin = require('../db/admin');

const handler = (req, res) => {
  try{
    if(req.method==="POST"){
      const {username, password} = req.headers;
      const ifAdminExist = await Admin.exists({ username, password });
      if(ifAdminExist){
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '100h' });
        res.json({ message: 'Logged in successfully', token, email: username  });
      }else{
        res.status(403).json({ message: 'Invalid username or password' });
      }
    }
  }catch(error){
    
  }
}
