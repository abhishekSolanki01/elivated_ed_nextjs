import withMiddleware from "@/middleware";
import Course from "../../../../../../db/models/course";

const handler = async (req: any, res: any) => {
    try {
        if (req.method === "GET") {           
            const {courseId} = req.query;
            const courseById = await Course .findById(courseId)
            if (courseById) {
                res.json(courseById);
            } else {
                res.status(404).json({ message: 'Course not found' });
            }
        } else if (req.method === "PUT") {
           
            
            const { courseId } = req.query;
            const { title, description, price, imageLink, published, summary } = req.body;
            
            let summaryArray;
            if(summary && typeof summary !== "object"){
              summaryArray = summary.split(/\r?\n/)
            }
            const updateCourseById = await Course.findByIdAndUpdate(courseId, { title, description, price, imageLink, published, summary: summaryArray }, { new: true })
            if(updateCourseById){
              res.json({ message: 'Course updated successfully' });
            }else{
              res.status(404).json({ message: 'Course not found' });
            }
          
          }

    } catch (error) {
        console.log("error", error);
        
        res.status(500).json({ message: "Internal server error" })
    }
}

export default withMiddleware("authMw")(handler);