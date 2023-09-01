import React, { useContext, useEffect, useState } from 'react'

import LateralProducts from '../components/LateralProducts'

import { UserContextProducts } from '../context/UserContext'
import { useProducts } from '../hooks/useProducts'
import { useNavigate } from 'react-router-dom'

const Products = () => {
  const {categoriaBuscar,setCategoriaBuscar} = useContext(UserContextProducts)
  const {showNovedades,showCategoria} = useProducts()
  const [showCategory, setShowCategory] = useState([])
  const [pages,setPages] = useState(1)
  const [pageList, setPageList] = useState(1)
  const [productos,setProductos] = useState([])
  const navigate = useNavigate()

  const obtenerProductos = async () =>{
    let productosObtenidos= []
    if (categoriaBuscar === 'All') {
      productosObtenidos = await showNovedades()
    }else{
      productosObtenidos = await showCategoria(categoriaBuscar)
    }
    setShowCategory(productosObtenidos)
    setPages(Math.ceil(productosObtenidos.length /8))
    handleList(pageList)
  }

  useEffect(()=>{
    setCategoriaBuscar('All')
  },[])

  useEffect(()=>{
    obtenerProductos()
    handleList(1)
  },[categoriaBuscar])

  const handleList = (page) =>{
    setPageList(page)
    const variable = 8 * (page-1)
    const variableFin = variable + 8
    const productosVariable = showCategory.slice(variable,variableFin)
    setProductos(productosVariable)
  }
  
  const handleRedirect = (id) =>{
    navigate(`/producto/${id}`)
  }

  return (
    <>
    <main className='grid grid-cols-5 px-5 py-5 gap-5'>
      <section className='flex flex-col'>
        <LateralProducts/>
      </section>
      <section className='col-span-4'>
        <div className='text-3xl bg-red-400 text-center py-5 font-semibold underline'>{categoriaBuscar}</div>
        <section className='grid grid-cols-4 gap-10 mt-7'>
          {productos.map((producto) =>(
          <div key={producto.id} className='w-[16.875rem] h-[25rem] items-center flex flex-col justify-center gap-3 p-3 bg-green-400 rounded-2xl'>
            <img className='w-[12.5rem] h-[15.625rem] cursor-pointer' src={producto.Image}  alt=""  onClick={()=>handleRedirect(producto.id)}/>
            <h2 className='text-2xl'>{producto.Articulo}</h2>
            <div className='rounded-xl bg-blue-400 p-1 px-4'>
              <h3>Precio: S/ {producto.Precio}</h3>
            </div>
          </div>)
          )}
        </section>
        <section className='flex justify-center items-center mt-5 p-5 gap-5'>
          {Array.from({ length: pages }, (_, index) => (
            <button  key={index} className={`p-2 text-xl font-medium rounded-xl ${
              index + 1 === pageList ? 'bg-slate-400 text-white' : 'bg-gray-300 text-gray-700'
            }`} onClick={()=>handleList(index+1)}>
              {index + 1}
            </button  >
          ))}
        </section>
      </section>
    </main>
    </>
  )
}

export default Products