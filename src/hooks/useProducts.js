import { query, where, collection, getDocs,doc,getDoc } from "firebase/firestore";
import { firestore } from "../services/firebase";

export const useProducts = () => {
  const reference = collection(firestore,'productos')

  const SearchProducts = async (name) =>{
    const busqueda = query(reference,where('Articulo','>=',name.toUpperCase()))  //consulta para encontrar en articulo valores que contengan el nombre enviado
    const resultadoBusqueda = await getDocs(busqueda)
    const productos = []
    if (resultadoBusqueda) {
      resultadoBusqueda.forEach((resultado) => {
        const valor = resultado.data().Articulo  //Obtenemos el nombre de cada ARTICULO
        if (valor.includes(name.toUpperCase())){   //Se filtra para que incluya el nombre enviado
          productos.push({id:resultado.id,...resultado.data()})
        }
      });
    }
    return productos
  }
  const datosProductos = async (id) =>{
    const docReference = doc(firestore,'productos', id)
    const datos = await getDoc(docReference)
    const data = datos.data()
    return data
  }
  const categoriasProductos = async () =>{
    const docReference = await getDocs(reference)
    const categoriasMap = new Map()
    docReference.forEach(producto => {
      const categoria = producto.data().Categoria
      if (!categoriasMap.has(categoria)) {
        categoriasMap.set(categoria,true)
      }
    })
    const categorias = Array.from(categoriasMap.keys())
    return categorias
  }
  const showNovedades = async() =>{
    const busqueda = query(reference,where('Novedades','!=',''))
    const resultadoBusqueda = await getDocs(busqueda)
    const resultados =[]
    if (resultadoBusqueda) {
      resultadoBusqueda.forEach(resultado =>{
        resultados.push({id:resultado.id, ...resultado.data()})
      })
    }
    return resultados
  }
  const showCategoria = async(categoria) =>{
    const busqueda = query(reference,where('Categoria','==',categoria))
    const resultadoBusqueda = await getDocs(busqueda)
    const resultados =[]
    resultadoBusqueda.forEach(resultado =>{
      resultados.push({id:resultado.id, ...resultado.data()})
    })
    return resultados
  }
  return {
    SearchProducts,
    datosProductos,
    categoriasProductos,
    showNovedades,
    showCategoria
  }
}