import React from 'react'

import lupa from '../assets/images/StaticImages/Search.svg'

const Searcher = () => {
  return (
    <>
    <div className='flex gap-1 px-2 items-center rounded-lg bg-white'>
        <input className='outline-none h-8 px-1' type="text" placeholder='Buscador...'/>
        <img className='h-8' src={lupa} alt="lupa buscador" />
    </div>
    </>
  )
}

export default Searcher