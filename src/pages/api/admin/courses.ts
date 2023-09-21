import withMiddleware from "@/middleware";
import Course from "../../../../db/models/course";

const handler = async(req:any, res:any) => {
    ("============================>");
    try {
        if(req.method === "POST"){

            
            const { title, description, price, imageLink, published } = req.body;
            const obj = {title, description, price, imageLink, published };
            const courseDB = new Course(obj);
            await courseDB.save()
            res.json({ message: 'Course created successfully', courseId: courseDB.id });    
        }else if(req.method === "GET") {
            console.log("======>");
            const courses = await Course.find({});
            res.json({ courses });
        }

      } catch (error) {
        res.status(500).send({ message: 'Internal server error' })
    }
}


export default withMiddleware("authMw")(handler)