import withMiddleware from "@/middleware";
import Course from "../../../../../../db/models/course";
import { User } from "../../../../../../db/models/user";

const handler = async(req:any,res: any) => {
    try{
        if(req.method === "GET"){
            const { courseId } = req.query;
            const courseById = await Course .findById(courseId)
            console.log("courseById", courseById);
            
            if(courseById){
              res.json(courseById);
            }else{
              res.status(404).json({ message: 'Course not found' });
            }
          
          }else if(req.method === "POST"){
            const {courseId} = req.query;
            const course = await Course.findById(courseId);
            if(course){
              const user = await User.findOne({username: req.user.username});
              user.purchasedCourses.push(course);
              await user.save()
              res.json({ message: 'Course purchased successfully' });
            }else{
              res.status(404).json({ message: 'Course not found' });
            }
          
          }

    }catch(e){
      res.status(500).json({ message: 'Internam server error' });

    }
}

export default withMiddleware("userAuthMw")(handler);