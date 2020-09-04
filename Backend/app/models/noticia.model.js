module.exports = (sequelize, Sequelize) => {

    const Noticia = sequelize.define("noticia", {
    
    titulo: {
        type: Sequelize.STRING
    },
    subtitulo: {
        type: Sequelize.STRING
    },
    descripcion:{
        type: Sequelize.STRING
    },
    published: {
        type: Sequelize.BOOLEAN
    }
    });
    return Noticia;
};