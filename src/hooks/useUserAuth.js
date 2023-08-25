import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../services/firebase'

const useUserAuth = async (email,password)=>{
    try{
        const usuarioNuevo= await createUserWithEmailAndPassword(auth,email,password)
        return usuarioNuevo.user
    }catch(error){
        return null
    }
}
export default useUserAuth