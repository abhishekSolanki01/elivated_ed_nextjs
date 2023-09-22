import withMiddleware from "@/middleware";
import course from "../../../../../db/models/course";
import { User } from "../../../../../db/models/user";

const handler = async (req: any, res: any) => {
    try {
        if (req.method === "GET") {
            const courses = await course.find({ published: true }).lean();
            const userData = await User.findOne({ username: req.user.username }).lean()
            if(!userData){
                return res.status(404).send({message: "not found"})
            }
            const purchasesCourses = (userData as any).purchasedCourses.map((el: { toString: () => any; }) => el.toString());
            console.log(purchasesCourses);
            let modifiedCourses = courses.map((el: any) => {
                let id = el._id.toString();
                let purchased = purchasesCourses.includes(id)
                return {
                    ...el,
                    purchased
                }
            })
            res.json({ courses: modifiedCourses });
        }
    } catch (error) {

    }
}

export default withMiddleware('userAuthMw')(handler);