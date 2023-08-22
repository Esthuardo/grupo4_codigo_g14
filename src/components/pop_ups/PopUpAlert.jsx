import React from 'react'
import Modal from 'react-modal';
import popUpImageRegister from '../../assets/images/StaticImages/PopUpAlertaRegistro.svg'

const PopUpRegister = ({isOpen,onRequestClose,texto}) => {
  return (
    <>
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className='inset-0 fixed m-auto flex  w-[44.375rem] h-[25rem] bg-white flex-col px-10 py-6'>
        <div className='flex justify-end'>
          <button className="popup-close h-10 text-3xl" onClick={onRequestClose}>X</button>
        </div>
        <div className='flex justify-center mt-[2.125rem] gap-16'>
          <img className='mt-6 h-[11.875rem] w-[13.375rem]' src={popUpImageRegister} alt="Alerta de error" />
          <div className='flex flex-col gap-2'>
            <h2 className='text-3xl'>{texto}</h2>
            <button className='w-[10rem] rounded-[15px] text-2xl bg-blue-600 m-auto text-white' onClick={onRequestClose}>Aceptar</button>
          </div>
        </div>
        </Modal>
    </>
  )
}

export default PopUpRegister