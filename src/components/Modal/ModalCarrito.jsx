import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-modal'
import { UserContext } from '../../context/UserContext'
import { userUserStats } from '../../hooks/useUserStats'

import DeleteImage from '../../assets/images/StaticImages/Delete.svg'
import { ErrorMessage } from '../../services/handle'

const ModalCarrito = ({ isOpen, onClose }) => {
  const [metodoPago, setMetodoPago] = useState(null)
  const [disponible,setDisponible] = useState(false)
  const {totalValor,setTotalValor} = useContext(UserContext)
  const [productos, setProductos] = useState({})
  const [direccion, setDireccion] = useState('')
  const {obtenerProductoCarrito, eliminarProductoCarrito, modificarCampo, datosUser} = userUserStats()

  const handleMetodo=(metodo)=>{
    setMetodoPago(metodo)
    setDisponible(true)
  }
  const cargarProductos = async () => {
    const productosCarrito = await obtenerProductoCarrito()
    setProductos(productosCarrito)
    const datosDireccion = await datosUser()
    setDireccion(datosDireccion.direccion)
  }
  const handleDelete = async (nombreProducto) =>{
    const quitar = productos[nombreProducto].cantidad * productos[nombreProducto].precio
    const eliminar = await eliminarProductoCarrito(nombreProducto)
    if (eliminar) {
      setProductos(eliminar)
      const nuevoValor = totalValor - quitar
      setTotalValor(nuevoValor)
      await modificarCampo('carrito',nuevoValor)
      console.log(eliminar)
    }else{
      ErrorMessage({titulo: 'Error' , mensaje: eliminar})
    }
  }
  useEffect(()=>{
    cargarProductos()
  },[])
  return (
    <>
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2 className='text-2xl font-semibold m-5'>Direccion: {direccion}</h2>
      <div className='grid grid-flow-col gap-8 ml-8'>
        <section className='flex flex-col'>
          {Object.keys(productos).map((nombreProducto) =>{
            const producto = productos[nombreProducto]
            return(
              <>
              <div key={nombreProducto} className='flex overflow-y-auto items-center justify-center gap-10 border border-black'>
                <img src={producto.imagen} alt="imagenproducto" className='w-40 h-40' />
                <div className='flex flex-col items-center text-2xl'>
                  <h3>{nombreProducto}</h3>
                  <h3>Precio: {producto.precio}</h3>
                  <h3>Cantidad: {producto.cantidad}</h3>
                </div>
                <img src={DeleteImage} alt="Boton eliminar" onClick={()=>handleDelete(nombreProducto)}/>
              </div>
              </>
            )
          })}
        </section>
        <section className='flex flex-col gap-5 items-center justify-center'>
          <div className='flex gap-8 items-center'>
            <h2 className=' text-3xl'>Total</h2>
            <div className='text-center bg-[#138F84] text-3xl p-5 rounded-2xl text-white font-semibold'>
                <h2>{totalValor.toFixed(2)}</h2>
            </div>
          </div>
          <div className='flex gap-5 m-4'>
            <label htmlFor="Efectivo" className='text-2xl gap-3 flex items-center font-semibold'> Efectivo
                <input type="radio" name="metodoPago" id='Efectivo' value='Efectivo' onChange={()=>handleMetodo('Efectivo')} />
            </label>
            <label htmlFor="Efectivo" className='text-2xl gap-3 flex items-center font-semibold'> Transferencia
                <input type="radio" name="metodoPago" id='Transferencia' value='Transferencia' onChange={()=>handleMetodo('Transferencia')} />
            </label>
          </div>
          <div className='flex gap-5 m-4 text-white font-semibold text-3xl'>
            <button disabled={!disponible} className='px-3 bg-[#17823C] rounded-xl py-4'> Comprar </button>
            <button className='px-3 bg-red-500 rounded-xl py-4' onClick={onClose}> Cancelar </button>
          </div>
        </section>
      </div>
    </Modal>
    </>
  )
}

export default ModalCarrito