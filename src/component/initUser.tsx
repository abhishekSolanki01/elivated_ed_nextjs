import { loginStatus } from "@/axios";
import { userState } from "@/store/atoms/user";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const InitUser = () => {
    const setUser = useSetRecoilState (userState);
  
    useEffect(() => {
      init()
    }, [])
  
    const init = async() => {
      try{
        const isUserLoggedIn = await loginStatus();
        console.log(isUserLoggedIn);
        if(isUserLoggedIn?.email){
          setUser({
            loading: false,
            userEmail: isUserLoggedIn?.email
          })
        }else{
          setUser({
            loading: false,
            userEmail: null
          })
        }
      }catch(err){
        setUser({
          loading: false,
          userEmail: null
        })
      }
    }
  
    return <></>
  }

  export default InitUser;