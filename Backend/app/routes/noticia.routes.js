module.exports = app => {

    const noticias = require("../controllers/noticia.controller.js");
    var router = require("express").Router();
  
    // Creacion de una nueva noticia
    router.post("/", noticias.create);
  
    // Recupera Todas Las Noticias
    router.get("/", noticias.findAll);
  
    // Recupera todos los published
    router.get("/published", noticias.findAllPublished);
  
    // Recupera una noticia buscada por el id
    router.get("/:id", noticias.findOne);
  
    // Actualizar una noticia por el id
    router.put("/:id", noticias.update);
  
    // Eliminacion de una noticia por el id
    router.delete("/:id", noticias.delete);
  
    // Eliminacion Total
    router.delete("/", noticias.deleteAll);
  
  
    app.use('/api/noticias', router);
  };
  