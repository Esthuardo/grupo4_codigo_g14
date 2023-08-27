import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../services/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

import InputEmail from '../components/inputs/inputEmail'
import InputPassword from '../components/inputs/inputPassword'

import { userUserStats } from '../hooks/useUserStats'
import { handleChange, ErrorMessage} from '../services/handle'

import loginImage from '../assets/images/StaticImages/LoginImage.jpg'

const Login = () => {
  const navigate = useNavigate()
  const [form,setForm] = useState({
    email: '',
    contraseña: ''
  })
  const handleLogin = async (event) =>{
    event.preventDefault()
    try {
      const loginFirebase = await signInWithEmailAndPassword(auth,form.email,form.contraseña)
      if (loginFirebase) {
        const {obtainUser} = userUserStats()
        const userEmail = loginFirebase.user.email
        const userData = await obtainUser(userEmail)
        if (userData===null) {
          ErrorMessage({titulo:'Usuario no encontrado',mensaje:error})
        }else{
          const datosUsuario = {
            nombre: userData.Nombres,
            email: userData.email
          }
          localStorage.setItem('datosUsuario',JSON.stringify(datosUsuario))
          navigate('/')
        }
      }
    } catch (error) {
      ErrorMessage({titulo: 'Error de credenciales', mensaje: error})
    }
  }

  return (
    <main className='flex w-full h-full'>
      <section className='w-1/2'>
          <img className='w-full h-full' src={loginImage} alt="" />
      </section>
      <section className='w-1/2 pl-[4.5625rem] flex flex-col gap-5'>
        <form onSubmit={handleLogin} className='flex flex-col gap-1'>
          <section className='flex justify-between mt-[2.38125rem] items-center'>
              <h1 className='font-bold text-[3.5rem]'>Login</h1>
              <img className='w-[8rem] h-[8rem] rounded-full bg-red-300 mr-4' src="" alt="logo"/>
          </section>
          <section className='flex flex-col justify-center gap-10'>
            <div className='flex flex-col gap-5 items-center mt-10'>
              <InputEmail handleChange={()=>handleChange(event,form,setForm)} id='email' name='Correo electronico' placeHolder='user@user.com'/>
              <InputPassword handleChange={()=>handleChange(event,form,setForm)} id='contraseña' name='Contraseña' placeHolder='Ingrese su contraseña'/>
            </div>
            <input className='cursor-pointer mx-auto mt-4 rounded-[15px] h-10 w-[21.9375rem]  border-2 border-black bg-blue-500' type="submit" value="Ingresar"/>
          </section>
        </form>
        <div className='mr-28 flex-col flex gap-6 pb-8 mt-7 mb-16 items-end'>
          <Link to="/register" className='text-[1.328125rem] underline onlyLine'>¿No tienes usuario?<span>&#8594;</span></Link>
          <Link to="/" className='text-[1.328125rem] underline onlyLine'> Volver<span>&#8594;</span></Link>
        </div>
      </section>
    </main>
  )
}

export default Login