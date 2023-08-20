import React from 'react'
import countries from '../Json/PhoneNumbers.json'

const SelectPhoneCodes = () => {
  return (
    <>
    <option hidden>Selecciona el código de su país</option>
      {countries.countries.map((country,index)=>
        (<option key={country.name} value={country.code}>{`(${country.code})`}{country.name}</option>)
      )}
    </>
  )
}

export default SelectPhoneCodes