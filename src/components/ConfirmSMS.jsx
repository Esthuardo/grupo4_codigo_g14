import React, { useState } from 'react'
import { useRef } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import confirmarSMS from '../assets/images/StaticImages/ConfirmarSMS.svg'

const ConfirmSMS = ({handleConfirm,phoneCode,telefono}) => {
  const MySwal = withReactContent(Swal)
  const [SMS,setSMS] = useState(['','','','',''])
  const [texto,setTexto] = useState({texto:'Enviar código', color: 'text-blue-600'})
  const [deshabilitado,setDeshabilitado] = useState(true)
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

  const handleClick = ()=>{
    let codigo=''
    for (let index = 0; index < SMS.length; index++) {
      codigo = codigo + SMS[index]
    }
    if (CodigoTemporal === codigo) {
      setTexto({texto: '¡Código correcto!', color: 'text-emerald-400'})
      handleConfirm(true)
    }else{
      setTexto({texto: 'Incorrecto-reenviar código', color: 'text-1xl text-red-400'})
      handleConfirm(false)
    }
  }

  const confirmarNumero=()=>{
    if (phoneCode!=='' && telefono !=='') {
      setDeshabilitado(false)
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Faltan datos',
        text: 'Debe ingresar un número de telefono junto al código de su país para recibir el mensaje',
      })
    }
  }

  return (
    <>
      <div className='flex flex-col gap-1'>
        <div className='flex justify-between items-center'>
          <label className='ml-2 text-[1.328125rem] onlyLine'>Código SMS</label>
          <label className={`text-[1rem] onlyLine mr-3 cursor-pointer ${texto.color}`} onClick={confirmarNumero}> {texto.texto}</label>
        </div>
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
            <img className={`${deshabilitado ? 'cursor-not-allowed pointer-events-none opacity-25' : 'cursor-pointer'} h-10`} src={confirmarSMS} alt="Confirmar SMS" onClick={handleClick} disabled={deshabilitado} id='confirmSMS'/>
        </div>
      </div>
    </>
  )
}

export default ConfirmSMS