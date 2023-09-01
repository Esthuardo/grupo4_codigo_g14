import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useUserAuth from "../hooks/useUserAuth" 
import { ErrorMessage, ProcesoCorrecto } from "../services/handle"
import { UserContext } from "../context/UserContext"

import { userUserStats } from "../hooks/useUserStats"
import { useProducts } from "../hooks/useProducts"

import shopCart from '../assets/images/StaticImages/carritoCompra.svg'

const Product = () => {
  const {id} = useParams()
  const [cantidad, setCantidad] = useState(0)
  const [producto, setProducto] = useState([])
  const navigate = useNavigate()
  const {isAuth} = useUserAuth()
  const {modificarCampo, asignarAlCarrito} = userUserStats()
  const {datosProductos} = useProducts()

  const {totalValor,setTotalValor} = useContext(UserContext)
  const operar = (value) => {
    let newCantidad = 0
    if (isAuth) {
      if (value) {
        newCantidad = cantidad + 1
        if (newCantidad > producto.stock ){
          ErrorMessage({titulo:'Solicitud excesiva', mensaje:'En estos momentos no contamos con tantos productos en stock, disculpe las molestias'})
          newCantidad = producto.stock
        }
      }else{
        newCantidad = cantidad - 1
        if (newCantidad < 0) {
          newCantidad = 0
        }
      }
      setCantidad(newCantidad)
    }else{
      navigate('/login')
    }
  }
  
  const agregarCarrito = async() =>{
    if (cantidad !== 0) {
      const total = totalValor + (cantidad * producto.Precio)
      const seAsigno = await asignarAlCarrito(producto.Articulo,producto.Precio,cantidad)
      if (seAsigno) {
        setTotalValor(total)
        await modificarCampo('carrito',total)
        setCantidad(0)
        ProcesoCorrecto({titulo: 'Producto agregado al carrito'})
      }else{
        ErrorMessage({titulo:'Error',mensaje:'Error al guardar el producto'})
      }
      
    }else{
      ErrorMessage({titulo:'Cantidad invalida',mensaje:'Para agregar al carrito necesita minimo un producto'})
    }
  }

  useEffect(()=>{
    const data = async ()=>{
      const productos = await datosProductos(id)
      setProducto(productos)
    }
    data()
  },[id])

  return (
    <>
    <main className="flex justify-center items-center gap-10 p-16">
      <div className="p-4 w-[40.625rem] h-[34.375rem] bg-red-500 justify-center flex">
        <img src={producto.Image} alt="Producto" />
      </div>
      <div className="flex flex-col w-[25rem] gap-6">
        <h1 className="text-center text-3xl font-bold">{producto.Articulo}</h1>
        <h2 className="font-semibold">Descripción: 
          <p className="font-normal pl-4">{producto.Descripcion}</p>
        </h2>
        <div className="flex justify-between px-3 text-2xl">
          <div>
            <p>Precio: S/.{producto.Precio} </p>
          </div>
          <div>
            <p>Stock: {producto.Stock} unidades</p>
          </div>
        </div>
        <div className="flex justify-center text-2xl">
          <button className="bg-red-400 px-5 py-3 rounded-l-2xl w-[60px]" onClick={()=>operar(false)}>-</button>
          <p className="px-5 py-3 w-[100px] text-center">{cantidad}</p>
          <button className="bg-green-400 px-5 py-3 rounded-r-2xl w-[60px]" onClick={()=>operar(true)}>+</button>
        </div>
        <div className="flex justify-between text-1xl font-semibold px-5">
          <button className="bg-red-400 px-5 py-1 flex items-center rounded-xl" onClick={agregarCarrito}>
            Añadir al carrito <img src={shopCart} alt="carrito" className="h-10 ml-2" />
          </button>
          <button className="bg-green-400 px-5 py-1 rounded-xl" >Comprar</button>
        </div>
      </div>
    </main>
    </>
  )
}

export default Product