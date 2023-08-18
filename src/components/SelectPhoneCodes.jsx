import React from 'react'
import countries from '../Json/PhoneNumbers.json'

const SelectPhoneCodes = () => {
  return (
    <>
      {countries.countries.map(country=>
        (<option value={country.code}>{`(${country.code})`}{country.name}</option>)
      )}
    </>
  )
}

export default SelectPhoneCodes