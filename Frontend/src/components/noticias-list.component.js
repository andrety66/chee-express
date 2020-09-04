import React, { Component } from "react";
import NoticiaDataService from "../services/noticia.service";
import { Link } from "react-router-dom";

export default class NoticiasList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitulo = this.onChangeSearchTitulo.bind(this);
    this.retrieveNoticias = this.retrieveNoticias.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveNoticia = this.setActiveNoticia.bind(this);
    this.removeAllNoticias = this.removeAllNoticias.bind(this);
    this.searchTitulo = this.searchTitulo.bind(this);

    this.state = {
      noticias: [],
      currentNoticia: null,
      currentIndex: -1,
      searchTitulo: ""
    };
  }

  componentDidMount() {
    this.retrieveNoticias();
  }

  onChangeSearchTitulo(e) {
    const searchTitulo = e.target.value;

    this.setState({
      searchTitulo: searchTitulo
    });
  }

  retrieveNoticias() {
    NoticiaDataService.getAll()
      .then(response => {
        this.setState({
          noticias: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveNoticias();
    this.setState({
      currentNoticia: null,
      currentIndex: -1
    });
  }

  setActiveNoticia(noticia, index) {
    this.setState({
      currentNoticia: noticia,
      currentIndex: index
    });
  }

  removeAllNoticias() {
    NoticiaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitulo() {
    NoticiaDataService.findByTitle(this.state.searchTitulo)
      .then(response => {
        this.setState({
          noticias: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitulo, noticias, currentNoticia, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar Por Titulo"
              value={searchTitulo}
              onChange={this.onChangeSearchTitulo}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitulo}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista De Noticias</h4>

          <ul className="list-group">
            {noticias &&
              noticias.map((noticia, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveNoticia(noticia, index)}
                  key={index}
                >
                  {noticia.titulo}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remover Todo
          </button>
        </div>
        <div className="col-md-6">
          {currentNoticia ? (
            <div>
              <h4>Noticia</h4>
              <div>
                <label>
                  <strong>Titulo:</strong>
                </label>{" "}
                {currentNoticia.titulo}
              </div>
              <div>
                <label>
                  <strong>Descripcion:</strong>
                </label>{" "}
                {currentNoticia.descripcion}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentNoticia.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/noticias/" + currentNoticia.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Por Favor Clickea En la Noticia...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
