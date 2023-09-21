import { NextApiRequest } from "next"

interface USER {
    _id?: String,
    firstName?: String, 
    lastName?: String, 
    gender?: String, 
    contactNumber?: number, 
    email?: String, 
    password?: String, 
    username?: String
}

export default interface CustomRequest extends NextApiRequest {
    user : USER
}