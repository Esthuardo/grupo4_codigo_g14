import React, { useState } from 'react'

import { useProducts } from '../hooks/useProducts'

import lupa from '../assets/images/StaticImages/Search.svg'

const Searcher = () => {
  const [results, setResults] = useState([])
  const [found,setFound] = useState({
    founded: false,
    show: false
  })

  const {SearchProducts} = useProducts()

  const handleName = async (value) =>{
    setFound({...found,show:true})
    if (value.length >= 4) {
      const buscado = await SearchProducts(value)
      setFound({...found,founded: true})
      if (buscado.length === 0) {
        buscado.push('No existen resultados')
        setFound({...found,founded: false})
      }
      setResults(buscado)
    }
  } 

  const handleImageClick = (event) =>{
    event.preventDefault()    //asi evitamos que luego oculte el div
    handleName(document.querySelector('.buscador').value)
  }
  return (
    <>
    <div>
      <div className='flex gap-1 px-2 items-center rounded-lg bg-white justify-between'>
          <input className='buscador outline-none h-8 px-1' type="text" placeholder='Buscador... ' onKeyUp={()=>handleName(event.target.value)} onBlur={()=>setFound({...found, show: false})}/>
          <img className='h-8' src={lupa} alt="lupa buscador" onClick={handleImageClick}/>
      </div>
      {found.show && 
        <div className='bg-white absolute max-h-[198px] w-[200px] max-w-[400px] overflow-y-auto mt-2'>
          <ul className='cursor-pointer'>
            {results.map((resultado)=>(
              found.founded ? (
                <li key={resultado.id} className='p-2'>{resultado.ARTICULO}</li>)
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


