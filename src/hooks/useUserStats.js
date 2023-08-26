import { addDoc, collection } from "firebase/firestore"
import { firestore } from "../services/firebase"

export const userUserStats = () =>{
    const reference = collection(firestore,'users')
    const createUser = async(form) =>{
        const newUser = {
            Apellidos: form.apellidos,
            Nombres: form.nombres,
            email: form.email,
            telefono: form.phoneCode + " " + form.telefono,
            contraseña: form.contraseña
        }
        const response = await addDoc(reference,newUser)
        return{ id: form.id,newUser}
    }
    return{
        createUser
    }
}