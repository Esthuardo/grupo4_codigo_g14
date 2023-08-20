import React from 'react'

const InputPassword = ({handleChange,id,nombre}) => {
  return (
    <>
        <label className='ml-2 text-[1.328125rem] onlyLine' htmlFor={id}>{nombre}</label>
        <input id={id} className='rounded-[15px] h-10 w-[20rem] border-2 border-black pl-4' required minLength={8} pattern="^(?=.*[A-Z]).{8,}$" type="password" onInput={handleChange} />
    </>
  )
}

export default InputPassword