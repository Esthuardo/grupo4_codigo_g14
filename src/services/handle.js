export const handleChange=(event,form,setForm)=>{
    const name=event.target.id
    const value=event.target.value
    setForm({ ...form, [name]: value })
}

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const ErrorMessage = ({titulo,mensaje}) => {
    const MySwal = withReactContent(Swal)
    Swal.fire({
        icon: 'error',
        title: titulo,
        text: mensaje,
    })
}

export const ProcesoCorrecto = ({titulo}) =>{
    const MySwal = withReactContent(Swal)
    Swal.fire({
        icon: 'success',
        title: titulo,
      })
}
