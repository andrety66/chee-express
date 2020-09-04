import React, { Component } from "react";
import NoticiaDataService from "../services/noticia.service";

export default class AddNoticia extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeSubtitulo = this.onChangeSubtitulo.bind(this);
    this.onChangeDescripcion = this.onChangeDescripcion.bind(this);
    this.saveNoticia = this.saveNoticia.bind(this);
    this.newNoticia = this.newNoticia.bind(this);

    this.state = {
      id: null,
      titulo: "",
      subtitulo:"",
      descripcion: "", 
      published: false,

      submitted: false
    };
  }

  onChangeTitulo(e) {
    this.setState({
      titulo: e.target.value
    });
  }

  onChangeSubtitulo(e){
    this.setState({
      subtitulo: e.target.value
    });
  }

  onChangeDescripcion(e) {
    this.setState({
      descripcion: e.target.value
    });
  }

  saveNoticia() {
    var data = {
      titulo: this.state.titulo,
      subtitulo:  this.state.subtitulo,
      descripcion: this.state.descripcion
    };

    NoticiaDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          titulo: response.data.titulo,
          subtitulo: response.data.subtitulo,
          descripcion: response.data.descripcion,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newNoticia() {
    this.setState({
      id: null,
      titulo: "",
      subtitulo:"",
      descripcion: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>Fue Enviado Satisfactoriamente</h4>
              <button className="btn btn-success" onClick={this.newNoticia}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Titulo</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.titulo}
                  onChange={this.onChangeTitulo}
                  name="titulo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Subtitulo</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.subtitulo}
                  onChange={this.onChangeSubtitulo}
                  name="subtitulo"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="description">Descripcion</label>
                <input
                  type="text"
                  className="form-control"
                  id="descripcion"
                  required
                  value={this.state.descripcion}
                  onChange={this.onChangeDescripcion}
                  name="descripcion"
                />
              </div>
              
              <button onClick={this.saveNoticia} className="btn btn-success">
                Enviar
              </button>
            </div>
          )}
          
        </div>
        
      );
    
  }
}
