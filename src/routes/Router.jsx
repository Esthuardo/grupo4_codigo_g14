import PrimaryLayout from "../layouts/PrimaryLayout"

import Register from "../pages/Register"
import Login from "../pages/Login"
import Home from "../pages/Home"
import DataUser from "../pages/DataUser"
import Purchases from "../pages/Purchases"
import Products from "../pages/Products"

import { BrowserRouter,Routes,Route } from "react-router-dom"
import PrivateRoutes from "./PrivateRoutes"
import useUserAuth from "../hooks/useUserAuth"

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<PrimaryLayout />}>
            <Route index element={<Home />} />
            <Route path="/productos" element={<Products/>} />
            <Route element={<PrivateRoutes/>}>
              <Route path="/compras" element={<Purchases/>} />
              <Route path="/datos" element={<DataUser/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router