import React from "react";
import "./scss/main.scss";
import Home from './views/Home';
import { BrowserRouter as Router, Switch,Route,Link } from "react-router-dom";
import Producto from './components/Producto';

const App = () => {
  
  return (
    <div className="container">
      <Router>
        <nav className="nav">
          <Link to="/">
            Home
          </Link> 
        </nav>
        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/:productID">
            <Producto/>
          </Route>
        </Switch>
      </Router>
      {/* <span className="mensaje">
        <p>Mensaje del backend: <code>{JSON.stringify(msg)}</code></p>
      </span> */}
    </div>
  )
};

export default App;


