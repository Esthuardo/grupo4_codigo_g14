import React, { useState, useContext } from 'react'
import Modal from 'react-modal'
import { UserContext } from '../../context/UserContext'

import DeleteImage from '../../assets/images/StaticImages/Delete.svg'

const ModalCarrito = ({ isOpen, onClose }) => {
  const [metodoPago, setMetodoPago] = useState(null)
  const [disponible,setDisponible] = useState(false)
  const {totalValor,setTotalValor} = useContext(UserContext)

  const handleMetodo=(metodo)=>{
    setMetodoPago(metodo)
    setDisponible(true)
  }
  return (
    <>
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2 className='text-2xl font-semibold m-5'>Direccion</h2>
      <div className='grid grid-flow-col gap-8 ml-8'>
        <section className='flex flex-col'>
          <div className='flex overflow-y-auto items-center justify-center gap-10'>
            <img src="" alt="imagenproducto" className='w-40 h-40' />
            <div className='flex flex-col items-center text-2xl'>
              <h3>Nombre</h3>
              <h3>Precio</h3>
            </div>
            <img src={DeleteImage} alt="" />
          </div>
          <div className='flex overflow-y-auto items-center justify-center gap-10'>
            <img src="" alt="imagenproducto" className='w-40 h-40' />
            <div className='flex flex-col items-center text-2xl'>
              <h3>Nombre</h3>
              <h3>Precio</h3>
            </div>
            <img src={DeleteImage} alt="" />
          </div>
        </section>
        <section className='flex flex-col gap-5 items-center justify-center'>
          <div className='flex gap-8 items-center'>
            <h2 className=' text-3xl'>Total</h2>
            <div className='text-center bg-yellow-400 text-3xl p-5 rounded-2xl'>
                <h2>{totalValor.toFixed(2)}</h2>
            </div>
          </div>
          <div className='flex gap-5'>
            <label htmlFor="Efectivo" className='text-xl gap-3 flex items-center'> Efectivo
                <input type="radio" name="metodoPago" id='Efectivo' value='Efectivo' onChange={()=>handleMetodo('Efectivo')} />
            </label>
            <label htmlFor="Efectivo" className='text-xl gap-3 flex items-center'> Transferencia
                <input type="radio" name="metodoPago" id='Transferencia' value='Transferencia' onChange={()=>handleMetodo('Transferencia')} />
            </label>
          </div>
          <div className='flex gap-5'>
            <button disabled={!disponible} className='px-3 bg-green-400 rounded-xl'> Comprar </button>
            <button className='px-3 bg-red-400 rounded-xl' onClick={onClose}> Cancelar </button>
          </div>
        </section>
      </div>
    </Modal>
    </>
  )
}

export default ModalCarrito