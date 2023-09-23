import { Grid, Typography } from "@mui/material";
import React from "react";
import { fetchPurchasedCourse, purchaseCourse, viewAllCourses } from "../axios";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CourseCard from "../component/CourseCard";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";


function ShowCourses() {
    const [courses, setCourses] = React.useState([]);
    const isAdmin =  getCookie('isAdmin');
    const router = useRouter()


    // Add code to fetch courses from the server
    // and set it in the courses state variable.

    const fetchAllCourses = async () => {
        const allCourses = await viewAllCourses()
        setCourses(allCourses.courses)
    }

    const onPurchaseCourseClick = async (id) => {
        const purchaseCourseRes =  await purchaseCourse(id)
    }

    React.useEffect(() => {
        fetchAllCourses()
    }, [])

    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2} mb={3}>
            <Grid item xs={12}>
                <Typography variant='h4'>Courses</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={3}>
                    {courses.map((c, index) => {
                        let actions = [{
                            title: "Buy",
                            onClick: () => {onPurchaseCourseClick(c._id)},
                            variant: "contained",
                            disabled: c.purchased
                        }] 
                        return (
                            <CourseCard 
                                key={index}
                                title={c.title} 
                                description={c.description} 
                                index={index} 
                                imageLink={c.imageLink} 
                                actions={isAdmin? [] : actions}
                                onCardClick={() => {router.push(`/courses/${c._id}`)}}
                            />
                        )}
                        )}
                </Grid>
            </Grid>
        </Grid>
    )

}



export default ShowCourses;