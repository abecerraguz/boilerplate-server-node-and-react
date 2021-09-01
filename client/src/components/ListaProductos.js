import React,{useEffect,useState} from 'react';
import fetchProductos from '../actions/fetchProductos';
import { Link } from "react-router-dom";

const ListaProductos = (props) => {
    const [lista,setLista]=useState([]);
    useEffect(() => {
        fetchProductos().then(({data})=>{
            const elementos = data
            .map(({Titulo,_id},index)=>
      
            <tr key={_id}>
            <th scope="row" className="text-white">{index}</th>
            <td>{Titulo}</td>
            <td>
                {/* <Link className="contentForm__btn-editar" to={`/${_id}/edit`}><i class="far fa-edit"></i> Editar</Link> */}
            </td>
            <td>
                {/* <Link
                    className="contentForm__btn-eliminar" 
                     onClick={async () => {

                        await eliminarMascota(_id); 
                        onActualizar();

                    }}
                >
                    <i class="far fa-trash-alt"></i> Eliminar
                </Link> */}
            </td>

            <td>
                <Link className="contentForm__btn-ver" to={`/${_id}`}><i className="fas fa-search"></i> Ver</Link> 
            </td>
            </tr>
      
            )
            setLista(elementos) 
        })
    }, [])
    return (
        <div>
            <h2 className="listaProducto">Lista de Productos</h2>
            {/* <ul>{lista}</ul> */}
            {/* <div className="bgTable"> */}
                <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col" className="text-white">#</th>
                    <th scope="col" className="text-white">Nombre Producto</th>
                    <th scope="col" className="text-white" ></th>
                    <th scope="col" className="text-white"></th>
                    <th scope="col" className="text-white">Ver</th>
                    </tr>
                </thead>
                <tbody>
                    {lista}
                </tbody>
                </table>
        </div>
    );
}

export default ListaProductos;

