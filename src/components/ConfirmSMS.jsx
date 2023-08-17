import React from 'react'
import { useRef } from 'react'
import { albumImagenesEstaticas } from '../assets/images/ImagenesStaticas'
const ConfirmSMS = () => {
  const codigoSMS = Array.from({ length: 5 }, (_, index) => useRef(null))
  const handleInput = (event, index)=>{
    const codigo = codigoSMS[index]
    if (event.target.value.length === 1 && codigo.current) {
        codigo.current.focus();
    }
  }
  return (
    <>
        <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor="codigoSMS">Código SMS</label>
        <div className='flex gap-4 justify-center'>
            {codigoSMS.map((codigo,index)=>(
                <input  className='rounded-md h-10 w-8 border-2 border-black text-center' ref={codigo} maxLength={1} type='text' required onInput={event=>handleInput(event,index+1)}/>
            ))}
            {/* al escribir la funcion hace focus al input siguiente, por lo que el ref sirve para que el focus continue y no se mantenga en el inicial */}
            <img className='h-10' src={albumImagenesEstaticas.confirmarSMS} alt="Confirmar SMS"/>
        </div>
        {/* <input id='codigoSMS' className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' type="text" /> */}
    </>
  )
}

export default ConfirmSMS