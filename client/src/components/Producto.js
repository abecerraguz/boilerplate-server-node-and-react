// Usamos rfc para crear el componente
import React,{useState,useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import fetchProductoPorId from '../actions/fetchProductoPorId';
// import Like from './Like';

const Producto = (props) => {
    
    const [productoProps,setProductoProps] = useState(null);
    const [existe,setExiste] = useState(true)
    const {productID} = useParams();


    // Nos muestra el productId que le mandamos desde nuestra APP.js
    console.log('{props,productID}--->',{props,productID})
    console.log('productoProps--->',productoProps)

    /*
    Usamos useEffect para mostrar nuestro producto.
    Usamos useState.
    Creamos la platilla del producto.
    Validamos si no hay producto espera.
    Si hay producto muestra
    Traemos nustro producto de la BD con un "actions":
        fetchProductoPorId.js
    */

    useEffect(() => {

        fetchProductoPorId(productID).then((res)=>{
            const {success} = res;
            console.log('res.data-->',res.data)
            if(success) setProductoProps(res.data)
            
            else setExiste(false)
        })

    },[productID])

    /*
    Se condiciona si no hay producto Espera... si no
    Muestra Producto.
    */

    if(!productoProps && existe) return <h1>Espera....</h1>
    else if(!existe) return <h1>No existe</h1>
    else 
    return (
            <div className="container">
                <div className="card text-white">

                <div className="card-body">
                    <h5 className="card-title">{productoProps.Titulo}</h5>
                    <h6 className="border-bottom">Descripción</h6>
                    <p className="card-text my-3">{productoProps.Descripcion}</p>
                    <p className="font-weight-bold">Precio: {productoProps.Precio}</p>
                </div>
                <ul className="list-group list-group-flush">
                    {productoProps.colores.map((colores,index)=><li className="list-group-item" key={index}>{colores}</li>)}
                </ul>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <Link className="contentForm__btn-editarDetalle" to={`/${productoProps._id}/edit`}><i className="far fa-edit"></i> Editar</Link>
                        {/* <Like/> */}
                    </div>
              
                </div>
                </div>
            </div>
    )

   

}

export default Producto;
