import React from 'react';
import ListaProductos from '../components/ListaProductos';
import Userform from '../components/Userform';

const Home = () => {
    return (
        <>
            <Userform></Userform>
            <ListaProductos></ListaProductos>
        </>
    );
}

export default Home;
