const fetchProductos = async () => {

    try {
      const resultado = await fetch("/api/producto")
      const parsed = await resultado.json();

      if (!resultado.ok) throw new Error(parsed.message);
  
      return { success: true, data:parsed };
      
    } catch (err) {
      console.log('Error al mostrar productos', { error: err });
      return { success: false, message: err, data:[] };
    }
  };
  
  export default fetchProductos;
