import { useEffect } from "react";
import useUserAuth from "../hooks/useUserAuth";
import { useNavigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const {isAuth} = useUserAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    if (!isAuth) {
        navigate('/login')
    }
  },[isAuth])

  return (
    <Outlet/>
  )
}

export default PrivateRoutes
