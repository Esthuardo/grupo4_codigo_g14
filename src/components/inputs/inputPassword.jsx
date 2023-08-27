import React, { useState } from 'react'
import closeEye from '../../assets/images/StaticImages/CloseEye.svg'
import openEye from '../../assets/images/StaticImages/OpenEye.svg'

const InputPassword = ({handleChange,id,name}) => {
  const [image,setImage]=useState({
    show:false,
    image:closeEye,
    type:'password'
    })
  const changeImage=()=>{
    if (image.show) {setImage({
        show:false,
        image:closeEye,
        type:'password'})
    }else{setImage({
        show:true,
        image:openEye,
        type:'text'})}
  }
  return (
    <>
      <div className='flex flex-col gap-1'>
        <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor={id}>{name}</label>
        <div className='w-[20rem] gap-2 flex border-2 border-black px-4 rounded-[15px]'>
            <input id={id} className=' h-10 w-[16rem] outline-none ' required minLength={8} pattern="^(?=.*[A-Z]).{8,}$" type={image.type} onInput={handleChange} placeholder='Ingrese su contraseña'/>
            <img className='h-10 w-10' src={image.image} alt="" onClick={changeImage}/>
        </div>
      </div>
    </>
  )
}

export default InputPassword