import React from 'react'

const inputEmail = ({handleChange,id,name,placeHolder}) => {
  return (
    <>
    <div className='flex flex-col gap-1 col-span-2'>
        <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor={id}>{name}</label>
        <input id={id} className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' type='email' required onInput={handleChange} placeholder={placeHolder} />
    </div>
    </>
  )
}

export default inputEmail