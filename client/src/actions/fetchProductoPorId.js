// Se agrega el parametro id que lo recibe fetchProductoPorId = async ()
/*
    En la carpeta "actions" tenemos los archivos 
    que van a buscar la data de la API, pero a su ves 
    el componente se comunica con los archivos de "actions":
    Producto.js ( Este le pasa el ID ) ---> actions/fetchProductoPorId.jsx
*/
const fetchMascotaPorId = async (id) => {

    try {
      const resultado = await fetch(`/api/producto/${id}`)
      const parsed = await resultado.json();

      if (!resultado.ok) throw new Error(parsed.message);
  
      return { success: true, data:parsed };
      
    } catch (err) {
      console.log('Error al mostrar Producto', { error: err });
      return { success: false, message: err, data:[] };
    }
  };
  
  export default fetchMascotaPorId;