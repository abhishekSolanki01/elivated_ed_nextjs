import axios from "axios"
import { setCookie,getCookie } from 'cookies-next';

const url = `${process.env.NEXT_PUBLIC_BE_URL}api/users` //"http://localhost:3000/api/users" //`/users`
const admin_url =  `${process.env.NEXT_PUBLIC_BE_URL}api/admin` //"http://localhost:3000/api/admin" //`/admin`

// const url = "https://ec2-16-171-142-201.eu-north-1.compute.amazonaws.com:3000/users";
// const admin_url = "https://ec2-16-171-142-201.eu-north-1.compute.amazonaws.com:3000/admin"

export const register = async(data: any, isAdmin = false) => {
    let URL = isAdmin ? admin_url : url;
    const registerRes = await axios.post(`${URL}/signup`, data);
    if(registerRes?.data?.token){
        localStorage.setItem("token", registerRes?.data?.token)
    }
    if(registerRes.status === 200){
        setCookie('isAdmin', isAdmin.toString());
        // localStorage.setItem("isAdmin", isAdmin.toString())
    }
    return registerRes.data
}

export const login = async (data: any, isAdmin=false) => {
    let URL = isAdmin ? admin_url : url;
    const loginRes = await axios({
        url : `${URL}/login`,
        method: "post",
        headers: data
    })
    if(loginRes?.data?.token){
        localStorage.setItem("token", loginRes?.data?.token)
    }
    if(loginRes.status === 200){
        setCookie('isAdmin', isAdmin.toString());
        // localStorage.setItem("isAdmin", JSON.stringify(isAdmin))
    }
    return loginRes.data
}

export const logout = async (data: any | null) => {
    // const loginRes = await axios({
    //     url : `${url}/logout`,
    //     method: "post",
    //     headers : {
    //         "Authorization" : `Bearer ${localStorage.getItem("token")}`
    //     }
    // })
    // localStorage.setItem("token", null)
    // if(loginRes?.data?.token){
    //     localStorage.setItem("token", loginRes?.data?.token)
    // }
    localStorage.setItem("token", "null")
    return { status: true } //loginRes.data
}

export const viewAllCourses = async() => {
    let isAdmin = getCookie('isAdmin') || "false" //localStorage.getItem('isAdmin') || "false";
    let URL = JSON.parse(isAdmin) ? admin_url : url;
    const courses = await axios({
        method: "get",
        url: `${URL}/courses`,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return courses.data
}

export const viewCourse = async(id: any) => {
    console.log("HERE------");
    let isAdmin = JSON.parse(localStorage.getItem('isAdmin') || "false");
    let URL = JSON.parse(isAdmin) ? admin_url : url;
    const courses = await axios({
        method: "get",
        url: `${URL}/courses/${id}`,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return courses.data
}

export const purchaseCourse = async(id: string) => {
    const courses = await axios({
        method: "post",
        url: `${url}/courses/${id}`,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return courses.data
}

export const fetchPurchasedCourse = async() => {
    const courses = await axios({
        method: "get",
        url: `${url}/purchasedCourses`,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return courses.data
}

export const loginStatus = async() => {
    let isAdmin = JSON.parse(localStorage.getItem('isAdmin') || "false");
    let URL = JSON.parse(isAdmin) ? admin_url : url;
    const status = await axios({
        method: 'get',
        url: `${URL}/me`,
        headers : {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return status.data;
}

// admin routes

export const editCourse = async(param: any, body: any) =>{
    const editCourseRes = await axios({
        method: 'put',
        url: `${admin_url}/courses/${param}`,
        data : body,
        headers: { 
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    return editCourseRes.data
}