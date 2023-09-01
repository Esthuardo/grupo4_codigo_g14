import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword} from 'firebase/auth'
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

    const changePassword = async(email,passwordVieja, passwordNew)=>{
        try{
            const credencial= await signInWithEmailAndPassword(auth,email, passwordVieja)
            await updatePassword(credencial.user,passwordNew)
            return true
        }catch (error){
            console.log(error)
            return false
        }
    }
    return{
        useUserAuthentication,
        isAuth,
        changePassword
    }
}


export default useUserAuth