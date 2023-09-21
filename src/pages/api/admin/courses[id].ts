import withMiddleware from "@/middleware";
import Course from "../../../../db/models/course";

const handler = async (req: any, res: any) => {
    try {
        console.log("======================");

        if (req.method === "GET") {
            console.log("======================");
            
            const { courseId } = req.params;
            const courseById = await Course .findById(courseId)

            if (courseById) {
                res.json(courseById);
            } else {
                res.status(404).json({ message: 'Course not found' });
            }

        } else if (req.method === "PUT") {

        }

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export default withMiddleware("authMw")(handler);