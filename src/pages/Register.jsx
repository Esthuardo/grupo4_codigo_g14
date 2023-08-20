import React, { useState } from 'react'
import { albumImagenesEstaticas } from '../assets/images/ImagenesStaticas'
import { Link, useNavigate} from 'react-router-dom'
import SelectPhoneCodes from '../components/SelectPhoneCodes'
import ConfirmSMS from '../components/ConfirmSMS'
import PopUpRegister from '../components/pop_ups/PopUpRegister'
import InputPassword from '../components/inputPassword'

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
  const [popUp,setPopup]=useState({
    show: false,
    text:'Contraseñas invalidas, por favor ingrese una la misma contraseña en los campos correspondientes'
  })
  const handleChange=(event)=>{
    const name=event.target.id
    const value=event.target.value
    setForm({ ...form, [name]: value })
  }
  const handleConfirm=(valor)=>{
    setForm({ ...form, confirmSMS: valor })
  }
  const handleSubmit=(event)=>{
    event.preventDefault()
    if (form.contraseña === form.confirmContraseña && form.contraseña!=='' && form.confirmContraseña!=='') {
        //Aqui iria para guardarlo en el JSON o base de datos
        console.log(form)
        //navigate('/')
    }else{
        setPopup({...popUp,show:true})
    }
  }
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
                            <input id='apellidos' className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' type="text" pattern='^[^0-9]+$' title='No se permiten números' required onInput={handleChange} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor="nombres">Nombres</label>
                            <input id='nombres' className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' type="text" pattern='^[^0-9]+$' title='No se permiten números' required onInput={handleChange}/>
                        </div>
                        <div className='flex flex-col gap-1 col-span-2'>
                            <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor="email">Correo electrónico</label>
                            <input id='email' className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' type='email' required onInput={handleChange} />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor="telefono">Teléfono</label>
                            <div className='flex rounded-[15px] border-2 border-black pl-2 p-1 w-[20rem]'>
                                <select className='w-20 h-7 border-none border-0' onChange={handleChange} id='phoneCode'>
                                    <SelectPhoneCodes />
                                </select>
                                <input id='telefono' className='outline-none h-7 w-[13rem] pl-2' type="tel" title='Incluye solo números' pattern="[0-9]{9}" onInput={handleChange}/>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <ConfirmSMS handleConfirm={handleConfirm}></ConfirmSMS>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <InputPassword handleChange={handleChange} id='contraseña' nombre='Contraseña'/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <InputPassword handleChange={handleChange} id='confirmContraseña' nombre='Confirmar Contraseña'/>
                        </div>
                    </section>
                    <input type="submit" className={`cursor-pointer mx-auto mt-4 rounded-[15px] h-10 w-[21.9375rem]  border-2 border-black bg-blue-500 ${!form.confirmSMS ? 'opacity-50':''}`} value="Registrarse" onClick={handleSubmit} title='Recuerde completar todos los campos y que el SMS sea el correcto'disabled={!form.confirmSMS}/>
                </form>
                <div className='w-auto flex-col flex gap-6 pb-8'>
                    <Link to="/login" className='text-[1.328125rem] underline onlyLine'><span>&#8592;</span>  ¿Ya tiene un usuario?</Link>
                    <Link to="/" className='text-[1.328125rem] underline onlyLine'><span>&#8592;</span>  Volver</Link>
                </div>
                <PopUpRegister isOpen={popUp.show} onRequestClose={()=>setPopup({...popUp, show: false})} texto={popUp.text}/>
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