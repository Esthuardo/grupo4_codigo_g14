import React, { useState } from 'react'
import { albumImagenesEstaticas } from '../assets/images/ImagenesStaticas'
import { Link } from 'react-router-dom'
import SelectPhoneCodes from '../services/SelectPhoneCodes'

const Register = () => {
  const [form,setForm] = useState()

  return (
    <>
        <main className='flex w-full h-full'>
            {/* Formulario con los datos a recolectar */}
            <section className='w-1/2 pl-[4.5625rem] flex flex-col gap-5'>
                <form className='flex flex-col gap-'>
                    <section className='flex justify-between mt-[2.38125rem] items-center'>
                        <h1 className='font-bold text-[3.5rem]'>Registro</h1>
                        <img className='w-[8rem] h-[8rem] rounded-full bg-red-300 mr-4' src="" alt="logo"/>
                    </section>
                    <section className='container grid grid-cols-2 gap-1 mt-[2.1875rem]'>
                        <div className='flex flex-col gap-1'>
                            <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor="apellidos">Apellidos</label>
                            <input id='apellidos' className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' type="text" pattern='^[^0-9]+$' title='No se permiten números' required/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor="nombres">Nombres</label>
                            <input id='nombres' className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' type="text" pattern='^[^0-9]+$' title='No se permiten números' required/>
                        </div>
                        <div className='flex flex-col gap-1 col-span-2'>
                            <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor="email">Correo electrónico</label>
                            <input id='email' className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' type='email' required />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor="telefono">Teléfono</label>
                            <div className='flex'>
                                <select className='w-20'>
                                    <SelectPhoneCodes/>
                                </select>
                                <input id='telefono' className='rounded-[15px] h-10 w-[5rem] border-2 border-black pl-4' type="tel" title='Incluye solo números' pattern="[0-9]{10}"/>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor="codigoSMS">Código SMS</label>
                            <input id='codigoSMS' className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' type="text" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor="contraseña">Contraseña</label>
                            <input id='contraseña' className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' required minLength={8} pattern="^(?=.*[A-Z]).{8,}$" type="password" />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor="confirmContraseña">Confirmar contraseña</label>
                            <input id='confirmContraseña' className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' required minLength={8} pattern="^(?=.*[A-Z]).{8,}$" type="password" />
                        </div>
                    </section>
                    <input type="submit" className='mx-auto mt-4 rounded-[15px] h-10 w-[21.9375rem]  border-2 border-black' value="Registrarse" />
                </form>
                <div className='w-auto flex-col flex gap-6 pb-8'>
                    <Link to="/" className='underline onlyLine text-[1.328125rem]'>{"<-- ¿Ya tiene un usuario?"}</Link>
                    <Link to="/" className='underline onlyLine text-[1.328125rem]'>{"<-- Volver"}</Link>
                </div>
            </section>
            {/* Imagen de acompañamiento*/}
            <section className='w-1/2'>
                <img className='w-full h-full' src={albumImagenesEstaticas.registro} alt="" />
            </section>
        </main>
    </>
  )
}

export default Register