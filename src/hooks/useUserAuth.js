import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../services/firebase'

const useUserAuth = () =>{
    const useUserAuthentication = async (email,password)=>{
        try{
            const usuarioNuevo= await createUserWithEmailAndPassword(auth,email,password)
            return usuarioNuevo.user
        }catch(error){
            return null
        }
    }
    const user = JSON.parse(localStorage.getItem('datosUsuario')) || {email:''}
    
    const isAuth = Boolean(user?.email)
    return{
        useUserAuthentication,
        isAuth
    }
}


export default useUserAuth