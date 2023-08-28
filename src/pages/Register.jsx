import React, { useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'

import SelectPhoneCodes from '../components/SelectPhoneCodes'
import ConfirmSMS from '../components/ConfirmSMS'
import InputPassword from '../components/inputs/inputPassword'
import InputUser from '../components/inputs/inputUser'
import InputEmail from '../components/inputs/inputEmail'

import useUserAuth from '../hooks/useUserAuth'
import { userUserStats } from '../hooks/useUserStats'
import { handleChange, ErrorMessage } from '../services/handle'

import registro from '../assets/images/StaticImages/RegisterImage.png'

const Register = () => {
  const navigate = useNavigate()
  const [form,setForm] = useState({
    apellidos:'',
    nombres: '',
    email:'',
    phoneCode: '',
    telefono: '',
    confirmSMS: false,
    contraseña: '',
    confirmContraseña: ''
  })

  const handleConfirm=(valor)=>{
    setForm({ ...form, confirmSMS: valor })
  }
  const handleSubmit=async (event)=>{
    event.preventDefault()
    if (form.contraseña === form.confirmContraseña && form.contraseña!=='' && form.confirmContraseña!=='') {
        const {useUserAuthentication} = useUserAuth()
        const user = await useUserAuthentication(form.email,form.contraseña)
        if (user) {
            const {createUser} = userUserStats()
            await createUser(form)
            navigate('/')
            //si logra crear el usuario que lo guarde en el local storage para el PrimaryLayout
            const datosUsuario={
                nombre: form.nombres,
                email: form.email
            }
            localStorage.setItem('datosUsuario',JSON.stringify(datosUsuario))
        }else{
            ErrorMessage({titulo:'Error al crear nuevo usuario',mensaje:'Se produjo un error al crear un nuevo usuario, vuelva a intentarlo por favor'})
        }
    }else{
        ErrorMessage({titulo:'Contraseñas incorrectas',mensaje:'Ambas contraseñas deben ser iguales y no estar vacias'})
    }
  }
  return (
    <>
        <main className='flex w-full h-full'>
            {/* Formulario con los datos a recolectar */}
            <section className='w-1/2 pl-[4.5625rem] flex flex-col gap-5'>
                <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
                    <section className='flex justify-between mt-[2.38125rem] items-center'>
                        <h1 className='font-bold text-[3.5rem]'>Registro</h1>
                        <img className='w-[8rem] h-[8rem] rounded-full bg-red-300 mr-4' src="" alt="logo"/>
                    </section>
                    <section className='container grid grid-cols-2 gap-1 mt-[2.1875rem]'>
                        <InputUser handleChange={()=>handleChange(event,form,setForm)} id='apellidos' name='Apellidos' placeHolder='Ingrese sus apellidos'/>
                        <InputUser handleChange={()=>handleChange(event,form,setForm)} id='nombres' name='Nombres' placeHolder='Ingrese sus nombres'/>
                        <InputEmail handleChange={()=>handleChange(event,form,setForm)} id='email' name='Correo electronico' placeHolder='user@user.com'/>
                        <div className='flex flex-col gap-1'>
                            <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor="telefono">Teléfono</label>
                            <div className='flex rounded-[15px] border-2 border-black pl-2 p-1 w-[20rem]'>
                                <select className='w-20 h-7 border-none border-0' onChange={()=>handleChange(event,form,setForm)} id='phoneCode'>
                                    <SelectPhoneCodes />
                                </select>
                                <input id='telefono' className='outline-none h-7 w-[13rem] pl-2' type="tel" title='Incluye solo números' pattern="[0-9]{9}" onInput={()=>handleChange(event,form,setForm)} required placeholder='123456789'/>
                            </div>
                        </div>
                        <ConfirmSMS handleConfirm={handleConfirm} phoneCode={form.phoneCode} telefono={form.telefono}></ConfirmSMS>
                        <InputPassword handleChange={()=>handleChange(event,form,setForm)} id='contraseña' name='Contraseña'/>
                        <InputPassword handleChange={()=>handleChange(event,form,setForm)} id='confirmContraseña' name='Confirmar Contraseña'/>
                    </section>
                    <input type="submit" className={`cursor-pointer mx-auto mt-4 rounded-[15px] h-10 w-[21.9375rem]  border-2 border-black bg-blue-500 ${!form.confirmSMS ? 'opacity-50':''}`} value="Registrarse" title='Recuerde completar todos los campos y que el SMS sea el correcto'disabled={!form.confirmSMS}/>
                </form>
                <div className='w-auto flex-col flex gap-6 pb-8'>
                    <Link to="/login" className='text-[1.328125rem] underline onlyLine'><span>&#8592;</span>  ¿Ya tiene un usuario?</Link>
                    <Link to="/" className='text-[1.328125rem] underline onlyLine'><span>&#8592;</span>  Volver</Link>
                </div>
            </section>
            {/* Imagen de acompañamiento*/}
            <section className='w-1/2'>
                <img className='w-full h-full' src={registro} alt="" />
            </section>
        </main>
    </>
  )
}

export default Register