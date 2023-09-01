import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'

import lupa from '../assets/images/StaticImages/Search.svg'

const Searcher = () => {
  const [results, setResults] = useState([])
  const referencia = useRef(null)
  const navigate = useNavigate()
  const [found,setFound] = useState({
    founded: false,
    show: false,
  })
  const {SearchProducts} = useProducts()

  const handleSearch = async (event)=>{
    if (event.key === 'Enter') {
      event.preventDefault()
      handleImageClick()
    }
  }

  const handleImageClick = async () =>{
    const value = document.querySelector('.buscador').value
    if (value.length > 3) {
      const buscado = await SearchProducts(value)
      if (buscado.length !== 0) {
        setFound({show: true, founded: true})
      }else{
        buscado.push('No existen resultados')
        setFound({show: true,founded: false})
      }
      setResults(buscado)
    }else{
      setFound({show: true,founded: false})
      setResults(["Ingrese más caracteres"])
    }
  }
  
  const handleRedirect = (id) =>{
    console.log('as')
    navigate(`/producto/${id}`)
    referencia.current.value = ''
  }
  return (
    <>
    <div>
      <div className='flex gap-1 px-2 items-center rounded-lg bg-white justify-between'>
          <input className='buscador outline-none h-8 px-1' type="text" placeholder='Buscador... ' onKeyUp={handleSearch} ref={referencia} 
            onBlur={() => {
              setTimeout(() => {
                setFound({ ...found, show: false });
              }, 200); 
            }}/>
          <img className='h-8' src={lupa} alt="lupa buscador" onClick={handleImageClick} />
      </div>
      {found.show && 
        <div className='bg-white absolute max-h-[198px] w-[200px] max-w-[400px] overflow-y-auto mt-2'>
          <ul className='cursor-pointer'>
            {results.map((resultado,index)=>(
              <li key={index} className='p-2' onClick={()=>handleRedirect(resultado.id)}>{found.founded ? resultado.Articulo : resultado} </li>)
            )}
          </ul>
        </div>
      }
    </div>
    </>
  )
}

export default Searcher