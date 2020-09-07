const db = require("../models");
const Noticia = db.noticias;
const Op = db.Sequelize.Op;

// Creacion y Guardado de una noticia
exports.create = (req, res) => {
  //validacion del requerimiento
  if(!req.body.titulo){
    res.status(400).send({
      message:"No puede estar vacio"
    });
    return;
  }
   //Creacion de la noticia
    const noticia={
        titulo:req.body.titulo,
        subtitulo: req.body.subtitulo,
        descripcion:req.body.descripcion,
        published: req.body.published ? req.body.published : false
    };
    // Guardar noticia en la base de datos
    Noticia.create(noticia)
    .then(data=>{
        res.send(data);
        res.message  || "Exitosa el acceso de la informacion a la base de datos"
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Sucedio Un Error Mientras Ingresaba La Informacion"
        });
    });
};

// Recupera todas las noticias 
exports.findAll = (req, res) => {
    const titulo = req.query.titulo;
    var condition = titulo ? {titulo: {[Op.like]: '%$[titulo]%'}}:  null;
    Noticia.findAll({where:condition})
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
                err.message || "Sucedio algun error mientras recuperabamos la informacion"
        });
    });
};

// Buscar una noticia con el id
exports.findOne = (req, res) => {

    const id= req.params.id;

    Noticia.findByPk(id)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error al recuperar una noticia con el id="+id
            });
        });
};

// Actualizar una noticia
exports.update = (req, res) => {
  const id = req.params.id;
    Noticia.update(req.body,{
        where:{id: id}
    })
        .then(num=>{
            if(num==1){
                res.send({
                    message:"Tutorial actualizado, Satisfactoriamente"
                });
            }else{
                res.send({
                    message: 'No se pudo actualizar los valores con el id=${id}. quizas no se encontro la noticia o el req.body se encuentra vacio!'
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message: "Error actualizando Informacion al id=" + id
            });
        });
};

// Eliminar una noticia con el id
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.destroy({
      where: { id: id }
    })
      .then(num => {if (num == 1) {res.send({ message: "Tutorial eliminado con exito!!!::___:::"  });
        } else {
          res.send({
            message: `No se puede eliminar la noticia identificada con el=${id}. Noticia no encontrada!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "No se pudo borrar la noticia, hubo un error!!!. Comuniquese con el administrador mas cercano del sistema=" + id
        });
      });
  };

// ELiminar todas las noticias de las bases de datos DB.
exports.deleteAll = (req, res) => {
      Noticia.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Noticias Eliminadas Satisfactoriamente!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algun error sucedio mientras se removia la eliminacion."
        });
      });
  };

// Buscar Noticias por El published
exports.findAllPublished = (req, res) => {
    Noticia.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Sucedio algun error al recuperar todas las busquedas de los published"
        });
      });
  };