import React, { useEffect, useState } from 'react'

import InputPassword from '../components/inputs/inputPassword'
import ShowData from '../components/ShowData'

import { ErrorMessage, handleChange } from '../services/handle'
import useUserAuth from '../hooks/useUserAuth'
import { userUserStats } from '../hooks/useUserStats'

import user from '../assets/images/StaticImages/User.png'
import editImage from '../assets/images/StaticImages/Edit.svg'
import { useNavigate } from 'react-router-dom'

const DataUser = () => {
  const [edit,setEdit] = useState(false)
  const [datosUsuario, setDatosUsuario] = useState([])
  const navigate = useNavigate()
  const [form,setForm] = useState({
    direccion: '',
    contraseña: '',
    confirmContraseña: ''
  })

  useEffect(()=>{
    const asignarDatos = async () =>{
      const {datosUser} = userUserStats()
      let datos = []
      datos = await datosUser()
      setDatosUsuario(datos)
    }
    asignarDatos()
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (form.contraseña === form.confirmContraseña && form.contraseña!=='' && form.confirmContraseña!=='') {
      const {changePassword} = useUserAuth()
      const cambio = await changePassword(datosUsuario.email,datosUsuario.contraseña,form.contraseña)
      if (cambio) {
        const {modificarCampo} = userUserStats()
        await modificarCampo('direccion',form.direccion)
        await modificarCampo('contraseña',form.contraseña)
      }else{
        ErrorMessage({titulo:'Error durante el cambio',mensaje:'Error en el cambio de contraseña intentelo nuevamente'})
      }
    }else{
        ErrorMessage({titulo:'Contraseñas incorrectas',mensaje:'Ambas contraseñas deben ser iguales y no estar vacias'})
    }
    navigate('/')
  }

  return (
    <>
    <div className='px-10 pt-10 flex items-center'>
      <section className='px-10'>
        <img src={user} alt="Usuario" />
      </section>
      <section className='flex flex-col gap-5 justify-center'>
        <div className='grid grid-cols-2 px-10 mx-4 my-10'>
          <ShowData nombre='Apellidos y nombres' value={`${datosUsuario.Apellidos} ${datosUsuario.Nombres}`} />
          <ShowData nombre='Telefono' value={datosUsuario.telefono} />
          <ShowData nombre='Correo electrónico' value={datosUsuario.email}/>
          {!edit ? (
            <>
            <ShowData nombre='Direccion' value={datosUsuario.direccion} />
            <ShowData nombre='Contraseña' value={datosUsuario.contraseña} />
            <button onClick={()=>{setEdit(true)}} className='justify-center items-center col-span-2 mt-4 ml-72 '>
              <img className='bg-[#138F84] rounded-lg p-4' src={editImage} alt="Boton editar" />
            </button>
            </>
          ):(
            <>
            <div> </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-4'>
              <div className='flex gap-5'>
                <div className='flex-col flex '>
                  <div className='flex flex-col gap-1 mb-10'>
                    <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor='direccion'>Dirección</label>
                    <input id='direccion' className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' type="text" required placeholder='Direccion' onInput={(event) => handleChange(event, form, setForm)} value={form.direccion}/>
                  </div>
                  <div className='flex col-span-2 justify-center items-center bg-[#138F84] text-white font-semibold'>
                    <input type="submit" value="Guardar datos" />
                  </div>
                </div>
                <div>
                  <InputPassword handleChange={(event)=>handleChange(event,form,setForm)} id='contraseña' name='Contraseña'/>
                  <InputPassword handleChange={(event)=>handleChange(event,form,setForm)} id='confirmContraseña' name='Confirmar Contraseña'/>
                </div>
              </div>
            </form>
            </>
          )}
        </div>
      </section>
    </div>
    </>
  )
}

export default DataUser