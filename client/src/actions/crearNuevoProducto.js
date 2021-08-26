const crearNuevoProducto = async (payload) => {
    console.log('Payload-->', payload)
    try {
      const resultado = await fetch("/api/producto/nuevo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log('resultado-->', resultado)
  
      const obj = await resultado.json();
      if (!resultado.ok) throw new Error(obj.message);
  
      return { success: true };
      
    } catch (err) {
      console.log('Error crear nuevo producto', { error: err });
      return { success: false, message: err };
    }
  };
  
  export default crearNuevoProducto;