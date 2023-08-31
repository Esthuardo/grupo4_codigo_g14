import React, { useContext, useEffect, useState } from 'react'

import LateralProducts from '../components/LateralProducts'

import { UserContextProducts } from '../context/UserContext'
import { useProducts } from '../hooks/useProducts'

const Products = () => {
  const {categoriaBuscar,setCategoriaBuscar} = useContext(UserContextProducts)
  const {showNovedades,showCategoria} = useProducts()
  const [showCategory, setShowCategory] = useState([])
  const [pages,setPages] = useState(1)
  const [productos,setProductos] = useState([])

  useEffect(()=>{
    const predeterminadoProductos = async () =>{
      const productos = await showNovedades(UserContextProducts)
      setShowCategory(productos)
    }
    predeterminadoProductos()
    setPages(Math.ceil(showCategory.length /8))
    handleList(1)
  },[])

  const handleList = (page) =>{
    const variable = 8 * (page-1)
    const producto = []
    for (let index = 0; index < showCategory.length; index++) {
      producto.push(showCategory[index + variable])
    }
    setProductos(producto)
  }
  const handleProductsCategory = async() =>{
    
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
            <img className='w-[12.5rem] h-[15.625rem]' src={producto.Image}  alt="" />
            <h2 className='text-2xl'>{producto.Articulo}</h2>
            <div className='rounded-xl bg-blue-400 p-1 px-4'>
              <h3>Precio: S/ {producto.Precio}</h3>
            </div>
          </div>)
          )}
        </section>
        <section className='flex justify-center items-center mt-5'>
          {Array.from({ length: pages }, (_, index) => (
            <button  key={index} className='mx-2 text-xl font-bold'>
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