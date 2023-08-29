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

  const handleSearch = async (event) =>{
    if (event.key === 'Enter') {    //se eligio el event.key==='Enter' para evitar saturar de consultas al servidor
      const value = document.querySelector('.buscador').value
      console.log(value)
      if (value.length >=4) {
        const buscado = await SearchProducts(value)
        if (buscado) {
          setFound({...found, founded: true})
        }else{
          buscado.push('No existen resultados')
          setFound({...found,founded: false})
        }
        setResults(buscado)
      }
    }
  }

  const handleImageClick = (event) =>{
    event.preventDefault()    //asi evitamos que luego oculte el div
    const inputEnter = new KeyboardEvent('keyup',{key:'Enter'}) //simulamos presionar enter
    handleSearch(inputEnter)
    if (referencia.current){
      referencia.current.focus()
    }
  }
  
  const handleRedirect = (id) =>{
    navigate(`/producto/${id}`)
    referencia.current.value = ''
  }
  return (
    <>
    <div>
      <div className='flex gap-1 px-2 items-center rounded-lg bg-white justify-between'>
          <input className='buscador outline-none h-8 px-1' type="text" placeholder='Buscador... ' onKeyUp={handleSearch} onBlur={()=>setFound({...found, show: false})} ref={referencia}/>
          <img className='h-8' src={lupa} alt="lupa buscador" onClick={handleImageClick} onKeyUp={handleSearch} onBlur={()=>setFound({...found, show: false})}/>
      </div>
      {found.show && 
        <div className='bg-white absolute max-h-[198px] w-[200px] max-w-[400px] overflow-y-auto mt-2'>
          <ul className='cursor-pointer'>
            {results.map((resultado)=>(
              found.founded ? (
                <li key={resultado.id} className='p-2' onClick={()=>handleRedirect(resultado.id)}></li>)
                : (
                <li key={resultado} className='p-2'>{resultado}</li>)
            ))}
          </ul>
        </div>
      }
    </div>
    </>
  )
}

export default Searcher