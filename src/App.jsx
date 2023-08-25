import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import PrimaryLayout from "./layouts/PrimaryLayout"

import { BrowserRouter,Routes,Route,Outlet } from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<PrimaryLayout />}>
            <Route index element={<Home />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
