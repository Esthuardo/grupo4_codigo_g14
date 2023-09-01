import { addDoc, collection, getDocs, query, where, updateDoc, getDoc,doc } from "firebase/firestore"
import { firestore } from "../services/firebase"

export const userUserStats = () =>{
    const reference = collection(firestore,'users')
    const email = JSON.parse(localStorage.getItem('datosUsuario'))

    const createUser = async(form) =>{
        const newUser = {
            Apellidos: form.apellidos,
            Nombres: form.nombres,
            email: form.email,
            telefono: form.phoneCode + " " + form.telefono,
            contraseña: form.contraseña,
            carrito: 0,
            direccion: '',
            ProductosCarrito:{}
        }
        const response = await addDoc(reference,newUser)
        return{ id: response.id,newUser}
    }
    //Obtenemos el usuario debido a que el id en firestore es distinto al de authentication y al pasar el de authentication no cumple con las reglas de firestore ;-;
    const obtainUser = async(emailLogin)=>{
        const emailUsuario = query(reference, where('email','==',emailLogin))
        const response = await getDocs(emailUsuario)
        if (response.empty) {
            return null
        }else{
            const user = response.docs[0]
            return user.data()
        }
    }

    const referenciaUser = async() =>{
        const user = query(reference, where('email','==',email.email))
        const response = await getDocs(user)
        const docReference = doc(firestore,'users', response.docs[0].id)
        return docReference
    }
    const modificarCampo = async (campo,value) =>{
        await updateDoc(await referenciaUser(),{[campo]: value})
    }
    const datosUser = async()=>{
        const referencia = await referenciaUser()
        const datos = await getDoc(referencia)
        return datos.data()
    }
    const obtenerCarrito = async()=>{
        try{
            const carrito = await datosUser()
            return carrito.carrito
        }catch{
            return 0
        }
    }
    const asignarAlCarrito = async(nombre,precio,cantidad)=>{
        try {
            const docReference = await referenciaUser()
            const existeUsuario = await datosUser()
            if (existeUsuario) {
                const nuevaCompra = {
                    cantidad,precio
                }
                const agregarCompra = {...existeUsuario.ProductosCarrito,[nombre]:nuevaCompra}
                await updateDoc(docReference,{ProductosCarrito:agregarCompra})
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    return{
        createUser,
        obtainUser,
        datosUser,
        modificarCampo,
        obtenerCarrito,
        asignarAlCarrito
    }
}