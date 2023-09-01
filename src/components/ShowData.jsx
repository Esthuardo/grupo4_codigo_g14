import React, { useEffect, useState } from 'react'

const ShowData = ({nombre, value=''}) => {
  const [tipo,setTipo] = useState(true)

  useEffect(()=>{
    const verificar = ()=>{
        if (nombre==='Contraseña') {
            setTipo(false)
          }
    }
    verificar()
  },[])
  
  return (
    <>
    <div key={nombre} className='flex flex-col h-[5.625rem] justify-center gap-5'>
        <label className='text-2xl font-semibold'>{nombre}</label>
        <div className='flex ml-5 text-xl'>
            <input type={tipo ? 'text':'password'} value={value} readOnly className='w-[300px]'/>
        </div>
    </div>
    </>
  )
}

export default ShowData