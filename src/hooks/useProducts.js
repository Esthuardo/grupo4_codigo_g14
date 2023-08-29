import { query, where, collection, getDocs } from "firebase/firestore";
import { firestore } from "../services/firebase";

export const useProducts = () => {
  const reference = collection(firestore,'productos')

  const SearchProducts = async (name) =>{
    const busqueda = query(reference,where('ARTICULO','>=',name.toUpperCase()))  //consulta para encontrar en articulo valores que contengan el nombre enviado
    const resultadoBusqueda = await getDocs(busqueda)
    const productos = []
    if (resultadoBusqueda) {
      resultadoBusqueda.forEach((resultado) => {
        const valor = resultado.data().ARTICULO   //Obtenemos el nombre de cada ARTICULO
        if (valor.includes(name.toUpperCase())){   //Se filtra para que incluya el nombre enviado
          productos.push({id:resultado.id,...resultado.data()})
        }
      });
    }
    return productos
  }
  return {
    SearchProducts
  }
}