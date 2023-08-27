import React from 'react'

const InputUser = ({handleChange,id,name,placeHolder}) => {
  return (
    <>
    <div className='flex flex-col gap-1'>
        <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor={id}>{name}</label>
        <input id={id} className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' type="text" pattern='^[^0-9]+$' title='No se permiten números' required onInput={handleChange} placeholder={placeHolder}/>
    </div>
    </>
  )
}

export default InputUser