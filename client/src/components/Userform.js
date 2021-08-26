import React, { Fragment, useReducer} from  'react';
import crearNuevoProducto from "../actions/crearNuevoProducto";



/*
useReducer es un Hook que maneja el estado de nuestro componente.
Trabaja con una función que esta encaragada de manejar el estado, modificarlo , obtenerlo etc.
Con el Hook vamos a poder decirle con que funcion estanos trabajando o inicializando. 
Luego el estado lo vamos a poder utilizar en cualquier parte de nuestro componente.
*/
   
const Userform = (props) => {
    // const {onIngresar} = props
    /*
        COMO FUNCIONA USEREDUCERR
        Primero obtenemos dos cosas primero el estado (state) en el que se encuentran las variables del componente,
        Segundo una función dispatch en la cual va a poder lanzar accciones que van a repercutir en el useReducer que creemos.
    */

    // 
     const initialState = {

         IngreseUsuario : 'Ingrese datos del producto',
         Titulo: '',
         Precio : '',
         Descripcion : '',
        //  Password : '',
        //  ConfirmPassword : '',

         validationErrs: {
            Titulo : '',
            Precio : '',
            Descripcion : '',
            // Password : '',
            // ConfirmPassword : '',
            EnviadoOkey: 'Se han enviado los datos correctamente'
         },
         isSubmiting: true
     }   

    /*
        Se crea una funcion reducer, esta es una función pura que no debe modificar el
        estado original si no debe cambiar a un NUEVO ESTADO. Para esto tendremos dos parametros;
        STATE (Estado actual), ACTION ( La acción que estamos enviando ) esta la envia el DISPATCH().
    */

    const reducer = ( state, action ) =>{

        // Este log recibe la data de dispatch({type:'CH_NOMBRE', value:event.target.value}) 
        console.log('Valor de action-->', state);
  
        /*
        Podemos eveluar el type (Tipo de acción ) con un switch o sea evaluamos
        que dato esta llegando (O sea evalua que tipo de dispatch esta llegando)
        */

        switch (action.type) {
                // Si pasa la accion nombre que es el que deseo hacer
                case 'CH_TITULO' : {
                 // Aqui retornamos un objeto que represente todo el estado que ya tenemos
                 /*
                 Esto es diferente al useState aqui el estado 
                 se machaca entero 
                 */
                 return {
                     // Para asegurarnos que el estado se mantenga inmutable usamos un spred operator que tomo todo 
                     // El estado anterior y lo guarda
                     ...state,
                     // Luego modificamos sólo el campo que nos interesa que es nombre
                     Titulo:action.value,
                 }
                }
               

                case 'CH_PRICE' : {
                    return{
                        ...state,
                        Precio:action.value
                    }
                }

                case 'CH_DESCRIPTION' : {
                    return{
                        ...state,
                        Descripcion:action.value
                    }
                }

                // case 'CH_PASSWORD' : {
                //     return{
                //         ...state,
                //         Password:action.value
                //     }
                // }

                // case 'CH_CONFIRMPASSWORD' : {
                //     return{
                //         ...state,
                //         ConfirmPassword:action.value
                //     }
                // }

                case "SUBMIT_VALIDATE":
                    return {
                      ...state,
                      validationErrs: {
                        Titulo : '',
                        Precio : '',
                        Descripcion : '',
                        // Password : '',
                        // ConfirmPassword : '',
                        ...validateOnSubmit(state),
                        isSubmiting: false,
                      }, 
                }

                case 'RESET' : {
                    return initialState
                }

                case 'SBM_CLEAR' : {
                    return {
                        ...state,
                        Titulo:action.value ='',
                        Precio:action.value ='',
                        Descripcion:action.value ='',
                        // Password:action.value ='',
                        // ConfirmPassword:action.value ='',
                        IngreseUsuario:action = 'Los Datos fueron ingresados' 
                    }
                }

                default:
                    console.log('default desde el switch');
        }
        return state;
    }

    // El useReducer va a contener una funcíon que contendra el estado inicial del componente y la accion que se ejecute en reducer
    const [state, dispatch] = useReducer(reducer, initialState); 

    // Validation functions con el cambio del estado
    function validateOnSubmit(state) {

        // Desestructuramos el estado
        const { Titulo, Precio, Descripcion, /*Password, ConfirmPassword*/ } = state;

        let validationErrs = {};
    
        // Validacion Titulo
        if (!Titulo) {
            validationErrs.Titulo = "Se requiere el Titulo";
        }else if(Titulo.length > 3){
            validationErrs.Titulo = "";
        }else if(Titulo.length < 3){
            validationErrs.Titulo = "El nombre debe tener al menos 3 caracteres";
        }

   
        // Validacion Precio
        if (!Precio) {
            validationErrs.Precio = "Se requiere el Precio";
        }else if(Precio.length > 3 && Precio > 0){
            validationErrs.Precio = "";
        }else if(Precio.length < 3 && Precio < 0){
            validationErrs.Precio= "El precio debe tener al menos 2 cifras y mayor que cero";
        }

        // Validacion Descripcion
        if (!Descripcion) {
            validationErrs.Descripcion = "El producto requiere descripción";
        }else if(Descripcion.length > 3 && Descripcion > 0){
            validationErrs.Descripcion = "";
        }else if(Descripcion.length < 3 && Descripcion < 0){
            validationErrs.Descripcion= "El producto debe tener al menos 3 caracteres";
        }
       
        // Validacion de Password
        // if (!Password) {
        //     validationErrs.Password = "Se requiere contraseña";
        // }else if (Password.length < 4){
        //     validationErrs.Password = "La contraseña debe tener al menos 4 caracteres";
        // }

        // // Validacion de Password
        // if (!ConfirmPassword) {
        //     validationErrs.ConfirmPassword = "Se requiere contraseña";
        // }else if (ConfirmPassword.length < 4){
        //     validationErrs.ConfirmPassword = "La contraseña debe tener al menos 4 caracteres";
        // }

        return validationErrs;
    }

    // Envio de data
    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const obj = {};
        for (const [campo, val] of formData.entries()) obj[campo] = val;
     
        const { success, message } = await crearNuevoProducto(obj);
        
      
        if (success) {
            form
                .querySelectorAll(`input:not([type="submit"])`)
                .forEach((input) => (input.value = ""));
            window.alert("Se ingresó el producto exitosamente");
            // Se llama la fusnción del <Home/> , que llego por props desde 
            // <Home/>
            // onIngresar();
            } else {
            window.alert(`No se ingresó. ${message}`);
            }
        dispatch({type:'SBM_CLEAR'}) 
      };


    return(
         <Fragment>

             {state.isSubmiting ? 
                <h1 dangerouslySetInnerHTML={{ __html:state.IngreseUsuario}}></h1>
              :
                null
             }

            <form className="contentForm" onSubmit={onSubmit}>
                <div className="contentForm__group">
                    <label>Titulo</label>
                    <input 
                     type="text"
                     placeholder="Ingrese el título" 
                     className="form-control" 
                     name="Titulo" 
                     value={state.Titulo}
                     id="Titulo"
                     
                     /*
                        onChage toma el valor cuando va cambiando, pero en useReducer
                        el cambio de valor ya no pasa por el onChange pasa por el dispatch 
                        y este pase la accion al reducer para esto llamamos a la funcion 
                        dispatch() esta tiene un objeto con dos valores:
                        type:'' (Tipo de accion),
                        value:event.target.value

                        El dispatch mando este objeto y lo manda a reducer en action
                     */
                     
             

                     onChange={(event) => {
                         dispatch({type:'CH_TITULO', value:event.target.value})
                         dispatch({type:'SUBMIT_VALIDATE'}) 
                     }}
                     />
                </div>
                {state.validationErrs.Titulo ?
                    <span className="validation-errors" dangerouslySetInnerHTML={{ __html:state.validationErrs.Titulo}}></span>
                    :
                    null
                }
  
                <div className="contentForm__group">
                    <label>Precio</label>
                    <input type="number"
                        placeholder="Ingrese el precio"
                        className="form-control"
                        name="Precio" 
                        value={state.Precio}
                        onChange={(event) => {
                            dispatch({type:'CH_PRICE', value:event.target.value})
                            dispatch({type:'SUBMIT_VALIDATE'})  
                        }}
                        id="Precio"
                     />
                </div>

                {state.validationErrs.Precio?
                    <span className="validation-errors" dangerouslySetInnerHTML={{ __html: state.validationErrs.Precio}}></span>
                :
                null
                }
               
    
                <div className="contentForm__group">
                    <label>Descripción</label>
                    <textarea
                        type="text"
                        placeholder="Descripción"
                        className="form-control"
                        name="Descripcion"
                        value={state.Descripcion}
                        onChange={(event) => {
                            dispatch({type:'CH_DESCRIPTION', value:event.target.value})
                            dispatch({type:'SUBMIT_VALIDATE'}) 
                        }}
                        id="Descripcion"
                    />
                </div>
                {state.validationErrs.Descripcion?
                    <span className="validation-errors" dangerouslySetInnerHTML={{ __html:state.validationErrs.Descripcion}}></span>
                :
                null
                }
 
                {/* <div className="contentForm__group">
                    <label>Password</label>
                    <input 
                      type="password"
                      placeholder="Password"
                      className="form-control"
                      name="Password" 
                      value={state.Password}
                      onChange={(event) => {
                        dispatch({type:'CH_PASSWORD', value:event.target.value})
                        dispatch({type:'SUBMIT_VALIDATE'})  
                      }}
                      id="Password"
                    />
                </div>

                {state.validationErrs.Password?
                    <span className="validation-errors" dangerouslySetInnerHTML={{ __html:state.validationErrs.Password}}></span>
                :
                null
                }


                <div className="contentForm__group">
                    <label>Confirm Password</label>
                    <input 
                     type="password"
                     placeholder="Confirm Password"
                     className="form-control"
                     name="ConfirmPassword"
                     value={state.ConfirmPassword}
                     onChange={(event) => {
                        dispatch({type:'CH_CONFIRMPASSWORD', value:event.target.value})
                        dispatch({type:'SUBMIT_VALIDATE'})  
                     }}
                     id="ConfirmPassword"
                     />
                </div>
                {state.validationErrs.ConfirmPassword?
                    <span className="validation-errors" dangerouslySetInnerHTML={{ __html:state.validationErrs.ConfirmPassword}}></span>
                :
                null
                } */}
       
                <button type="submit" 
                    onClick={ ()=>dispatch({type:'SUBMIT_VALIDATE'}) }  
                    className="contentForm__btn">
                    Crear producto
                </button>
            </form>
        </Fragment>
    );
};
    
export default Userform;

   