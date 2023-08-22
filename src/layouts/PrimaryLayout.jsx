import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

import Searcher from '../components/Searcher'

import UserNoLogin from '../assets/images/StaticImages/User_noLogin.svg'
import UserLogin from '../assets/images/StaticImages/User_Login.svg'

const PrimaryLayout = () => {
  const [user,setUser]=useState({
    login: false,
    image: UserNoLogin
  })

  return (
    <>
        <header className='flex justify-between bg-red-400 h-[7.875ren] items-center px-4'>
            <div className='flex gap-3 items-center py-2'>
                <Link to="/"><img src="" alt="Logo" className='rounded-full bg-red-300 mr-4 h-[5rem] w-[5rem]' /></Link>
                <Searcher/>
            </div>
            <div>
                {/*Aqui puede ir las categorias y asi se tenga acceso a estas */}
            </div>
            <div>
                <img src={user.image} alt="Usuario"/>
            </div>
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