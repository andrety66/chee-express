import React, { Component } from "react";
import NoticiaDataService from "../services/noticia.service";

export default class Noticia extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeSubtitulo = this.onChangeSubtitulo.bind(this);
    this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
    this.getNoticia = this.getNoticia.bind(this);
    
    this.updateNoticia = this.updateNoticia.bind(this);
    this.deleteNoticia = this.deleteNoticia.bind(this);

    this.updatePublished = this.updatePublished.bind(this);

    this.state = {
      currentNoticia: {
        id: null,
        titulo: "",
        subtitulo:"",
        descripcion: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getNoticia(this.props.match.params.id);
  }

  onChangeTitulo(e) {
    const titulo = e.target.value;

    this.setState(function(prevState) {
      return {
        currentNoticia: {
          ...prevState.currentNoticia,
          titulo: titulo
        }
      };
    });
  }

  onChangeSubtitulo(e){
    const subtitulo = e.target.value;

    this.setState(function(prevState){
      return{
        currentNoticia:{
          ...prevState.currentNoticia,
          subtitulo:subtitulo
        }
      };
    });

  }

  onChangeDescripcion(e) {
    const descripcion = e.target.value;
    
    this.setState(prevState => ({
      currentNoticia: {
        ...prevState.currentNoticia,
        descripcion: descripcion
      }
    }));
  }

  getNoticia(id) {
    NoticiaDataService.get(id)
      .then(response => {
        this.setState({
          currentNoticia: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentNoticia.id,
      titulo: this.state.currentNoticia.titulo,
      subtitulo: this.state.currentNoticia.subtitulo,
      descripcion: this.state.currentNoticia.descripcion,
      published: status
    };

    NoticiaDataService.update(this.state.currentNoticia.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentNoticia: {
            ...prevState.currentNoticia,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateNoticia() {
    NoticiaDataService.update(
      this.state.currentNoticia.id,
      this.state.currentNoticia
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "La noticia fue modificada satisfactoriamente!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteNoticia() {    
    NoticiaDataService.delete(this.state.currentNoticia.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/noticias')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentNoticia } = this.state;

    return (
      <div>
        {currentNoticia ? (
          <div className="edit-form">
            <h4>Noticia</h4>
            <form>
              <div className="form-group">
                <label htmlFor="titulo">Titulo</label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  value={currentNoticia.titulo}
                  onChange={this.onChangeTitulo}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subtitulo">Subtitulo</label>
                <input
                  type="text"
                  className="form-control"
                  id="subtitulo"
                  value={currentNoticia.subtitulo}
                  onChange={this.onChangeSubtitulo}
                  />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripcion</label>
                <input
                  type="text"
                  className="form-control"
                  id="descripcion"
                  value={currentNoticia.descripcion}
                  onChange={this.onChangeDescripcion}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentNoticia.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentNoticia.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteNoticia}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateNoticia}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor Link para listar total</p>
          </div>
        )}
      </div>
    );
  }
}
