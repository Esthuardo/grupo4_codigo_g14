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
            carrito: 0
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
    const agregarProductoCarrito = async (value) =>{
        await updateDoc(await referenciaUser(),{carrito: value})
    }
    const datosUser = async()=>{
        const referencia = await referenciaUser()
        const datos = await getDoc(referencia)
        return datos.data()
    }

    return{
        createUser,
        obtainUser,
        datosUser,
        agregarProductoCarrito
    }
}