import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import TypeProducts from '../components/TypeProducts'
import Searcher from '../components/Searcher'

import UserNoLogin from '../assets/images/StaticImages/User_noLogin.svg'
import UserLogin from '../assets/images/StaticImages/User_Login.svg'
import shopCar from '../assets/images/StaticImages/carritoCompra.svg'

const PrimaryLayout = () => {
  const navigate = useNavigate()
  const [user,setUser]=useState({
    showMenu: false,
    image: UserNoLogin,
  })
  const datosUsuario = JSON.parse(localStorage.getItem('datosUsuario'))

  useState(()=>{
    if (datosUsuario) {
      setUser({...user,image: UserLogin})
    }else{
      setUser({...user,image: UserNoLogin})
    }
  },[])
  
  const handleShowMenu = ()=>{
    const show= user.showMenu
    setUser({...user,showMenu:!show})
  }
  const handleRedirect = (page)=>{
    if (page==='logout') {
      localStorage.removeItem('datosUsuario')
      page='login'
    }
    navigate(`/${page}`)
  }
  return (
    <>
        <header className='flex justify-between bg-red-400 h-[7.875ren] items-center px-4'>
            <section className='flex gap-3 items-center py-2'>
              <Link to="/"><img src="" alt="Logo" className='rounded-full bg-red-300 mr-4 h-[5rem] w-[5rem]' /></Link>
              <Searcher/>
            </section>
            <section>
              <span className='text-3xl text-white font-bold cursor-pointer' onClick={()=>navigate('/productos')}> | Nuestros productos | </span>
              {user.showProducts && (
                <TypeProducts/>
              )}
            </section>
            <section className='flex gap-3'>
              <div className='flex bg-yellow-400 items-center px-4 rounded-lg gap-4'>
                <img src={shopCar} alt='carrito' />
                <label className='text-4xl font-bold'>0.00</label>
              </div>
              <div>
                <img src={user.image} alt="Usuario" onClick={handleShowMenu} className='cursor-pointer' />
                <div className='bg-green-500 absolute top-[96px] right-0 w-[200px] rounded-b-lg px-3'>
                  {user.showMenu && (
                    <ul className='cursor-pointer font-semibold text-[1.2rem] p-2'>
                      {datosUsuario ? (
                        <>
                        <li onClick={()=>handleRedirect('compras')}>Mis compras</li>
                        <li onClick={()=>handleRedirect('datos')}>Mis datos</li>
                        <li onClick={()=>handleRedirect('logout')}>Cerrar sesión</li>
                        </>
                      ):(
                        <>
                        <li onClick={()=>handleRedirect('register')}>Registrarse</li>
                        <li onClick={()=>handleRedirect('login')}>Ingresar</li>
                        </>
                      )}
                    </ul>
                  )}
                </div>
              </div>
              
            </section>
        </header>
        <main>
            <Outlet/>
        </main>
        <footer>
          
        </footer>
    </>
  )
}

export default PrimaryLayout