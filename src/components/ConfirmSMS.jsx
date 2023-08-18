import React, { useState } from 'react'
import { useRef } from 'react'
import { albumImagenesEstaticas } from '../assets/images/ImagenesStaticas'
const ConfirmSMS = () => {
  const [SMS,setSMS] = useState(['','','','',''])
  const referencia = useRef([])

  const handleInput = (event, index)=>{
    const nuevoCodigo = [...SMS]
    nuevoCodigo[index]=event.target.value
    setSMS(nuevoCodigo)
    if (event.target.value.length === 1 && index < referencia.current.length - 1) {
        referencia.current[index+1].focus()
    }
  }
  // Este codigo es temporal solo para confirmar que funcione adecuadamente
  const CodigoTemporal = '12345'

  return (
    <>
        <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor="SMS">Código SMS</label>
        <div className='flex gap-4 justify-center'>
            {SMS.map((sms,index)=>(
                <input
                  key={index}
                  className='rounded-md h-10 w-8 border-2 border-black text-center' 
                  maxLength={1} 
                  type='text' 
                  required 
                  onChange={event=>handleInput(event,index)}
                  ref={elemento => referencia.current[index]=elemento}
                  />
            ))}
            <img className='h-10' src={albumImagenesEstaticas.confirmarSMS} alt="Confirmar SMS"/>
        </div>
        {/* <input id='codigoSMS' className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' type="text" /> */}
    </>
  )
}

export default ConfirmSMS