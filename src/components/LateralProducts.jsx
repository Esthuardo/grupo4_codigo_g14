import React, { useContext, useEffect, useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { UserContextProducts } from '../context/UserContext'

const LateralProducts = () => {
  const [categorias,setCategorias] = useState([])
  const {categoriasProductos} = useProducts()
  const {setCategoriaBuscar} = useContext(UserContextProducts)
  useEffect(()=>{
    const categoriasList = async() =>{
        const lista = await categoriasProductos()
        setCategorias(lista)
    }
    categoriasList()
  },[])

  const handleClick = (categoria) =>{
    setCategoriaBuscar(categoria)
  }
  return (
    <>
      <h1 className='text-center underline font-semibold text-2xl' onClick={()=>handleClick('All')}>Accesorios</h1>
      <div className='flex flex-col items-start mt-4'>
        {categorias.map((categoria)=>(
          <button className='ml-5 mb-2' key={categoria} onClick={()=>handleClick(categoria)}>▶ {categoria}</button>
        ))}
      </div>
    </>
  )
}

export default LateralProducts