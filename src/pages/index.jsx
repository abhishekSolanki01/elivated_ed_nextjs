
import { Box, Container, Grid, Stack, Typography, Button } from "@mui/material";
import React from "react";
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import img from "../../public/Thesis-rafiki-detailed.svg"

import { fetchPurchasedCourse, purchaseCourse, viewAllCourses } from "../axios";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CourseCard from "../component/CourseCard";
import { userState } from "../store/atoms/user";
import {userEmailStatus} from '../store/selectors/userEmail'
import { snackBarState } from "../store/atoms/snackBar";
import { useState } from "react";
import Image from "next/image";

function Landing() {
    const router = useRouter()
    const user = useRecoilValue(userEmailStatus);

    return <>

        <Container>
            <Grid container sx={{ justifyContent: 'space-between' }}>
                <Grid item sm={6} xs={12}>
                    <Box sx={{
                        height: "90vh", display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            // justifyContent: 'space-around'
                        }}>

                            <Typography gutterBottom={4} sx={{display: "flex", flexWrap:"wrap"}} variant="h3">Simplify  <span style={{color: '#41a5f5'}}>Learning</span>, Amplify <span style={{color: "#41a5f5"}}>Growth</span></Typography>
                            <Typography variant="h5" sx={{textAlign:"initial"}}>Welcome to <span style={{color:"#41a5f5"}}>LEARNit</span>, your gateway to a world of knowledge and skill enhancement! Our cutting-edge course selling web application is designed to help educators, professionals, and knowledge seekers easily create, market, and sell their courses online.</Typography>
                            {!user && <Stack spacing={2} mt={6} direction="row" alignItems="center" justifyContent="center">
                                <Button variant="contained" onClick={() => { router.push('/Login') }} >Login</Button>
                                <Button variant="outlined" onClick={() => { router.push('/Register') }}  >Signup</Button>
                            </Stack>}

                        </Box>

                    </Box>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Box sx={{
                        height: "90vh", display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}>
                        <Box component="div">
                            <Image src={img} height="100vh" />
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {user && <> <Box style={{border: "1px solid #41a5f5", width: 300, margin: "auto", marginBottom: 30 }}/>

            <Grid container sx={{ justifyContent: 'space-between' }}>
                <Grid item xs={12}>
                    <Box sx={{ height: "fit-content" }} mb={3}>
                        <Typography variant="h5">Learn at Your Own Pace, Guided by Industry Experts, Interactive & Rich Content.</Typography>
                        <Stack spacing={2} mt={6} direction="row" alignItems="center" justifyContent="center">

                            <Courses/>

                        </Stack>
                    </Box>
                </Grid>
            </Grid> </>}
        </Container>
    </>
}

const Courses = () => {
    const [courses, setCourses] = React.useState([]);
    const user = useRecoilValue(userEmailStatus)
    const [disableBuy, setDisableBuy] = useState(false)
    // const navigate = useNavigate()
    const router = useRouter()
    const setSnackBarDetails = useSetRecoilState(snackBarState)



    const onPurchaseCourseClick = async (id) => {
        try{
            const purchaseCourseRes = await purchaseCourse(id);
            if(purchaseCourseRes.message === "Course purchased successfully"){
                setDisableBuy(true)
                setSnackBarDetails({
                    message: purchaseCourseRes.message,
                    type: 'success',
                    isOpen: true,
                    triggerOpen: new Date().getTime(),
                    showSnackBar: true
                })
            }
        }catch(e){
            setSnackBarDetails({
                message: e?.response?.data?.message || "Could not purchase",
                type: 'success',
                isOpen: true,
                triggerOpen: new Date().getTime(),
                showSnackBar: true
            })
        }
    }

    const fetchAllCourses = async () => {
        const allCourses = await viewAllCourses()
        setCourses(allCourses.courses)
    }

    React.useEffect(() => {
        fetchAllCourses()
    }, [])
    
    return (
        <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={3}>
                {courses.map((c, index) => {
                    let actions = [{
                        title: "Buy",
                        onClick: () => { onPurchaseCourseClick(c._id) },
                        variant: "contained",
                        disabled: c.purchased || disableBuy
                    }]
                    let purchased = c.purchased
                    if (!user || JSON.parse(localStorage.getItem('isAdmin'))) {
                        actions = [];
                    }
                    return (
                        <CourseCard
                            title={c.title}
                            description={c.description}
                            index={index}
                            imageLink={c.imageLink}
                            actions={actions}
                            onCardClick={() => {router.push(`/ShowSelectedCourse/${c._id}/${purchased}`)}}
                            // onCardClick={() => {router.push(`/ShowSelectedCourse/purchased/sadasdasd`)}}

                        />
                    )
                }
                )}
            </Grid>
        </Grid>

    )
}

export default Landing;