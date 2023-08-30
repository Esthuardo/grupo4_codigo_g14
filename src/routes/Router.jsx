import PrimaryLayout from "../layouts/PrimaryLayout"
import { UserProvider } from "../context/UserContext"

import Register from "../pages/Register"
import Login from "../pages/Login"
import Home from "../pages/Home"
import DataUser from "../pages/DataUser"
import Purchases from "../pages/Purchases"
import Products from "../pages/Products"
import Product from "../pages/Product"

import { BrowserRouter,Routes,Route } from "react-router-dom"
import PrivateRoutes from "./PrivateRoutes"

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<PrimaryLayout />}>
            <Route index element={<Home />} />
            <Route path="/productos" element={<Products/>} />
            <Route path="/producto/:id" element={<Product/>} />
            <Route element={<PrivateRoutes/>}>
              <Route path="/compras" element={<Purchases/>} />
              <Route path="/datos" element={<DataUser/>} />
            </Route>
          </Route>
        </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default Router