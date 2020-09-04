import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddNoticia from "./components/add-noticia.component";
import Noticia from "./components/noticia.component";
import NoticiasList from "./components/noticias-list.component";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-custom bg-custom">
            <a href="/noticias" className="navbar-brand">
               Hormiguero
            </a>
            <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Inicio
                </Link>
              </li>
                       

              <li className="nav-item">
                <Link to={"/noticias"} className="nav-link">
                  Noticias
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/noticias"]} component={NoticiasList} />
              <Route exact path="/add" component={AddNoticia} />
              <Route path="/noticias/:id" component={Noticia} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
