const express = require('express');
const router = express.Router();
const multer = require('multer');
const ArticuloControlador = require("../controllers/articulo");

const almacenamiento = multer.diskStorage({
    destination:function(req,file,cb){
        // el primer parametro de cb siempre es null y el segundo es la ruta de guardado de imagenes
        cb(null,'./img/articulos/');
    },
    filename:function(req,file,cb){
        // cambiar nombre de la imagen
        cb(null,'articulo' + Date.now() + file.originalname);

    }
});

const subidas = multer({storage:almacenamiento});


// Rutas de prueba
router.get("/ruta-de-prueba",ArticuloControlador.prueba);
router.get("/curso",ArticuloControlador.curso);
router.get("/articulos/:ultimos?",ArticuloControlador.listar);
router.get("/articulo/:id",ArticuloControlador.uno);
router.get("/imagen/:fichero",ArticuloControlador.imagen);
router.get("/buscar/:busqueda",ArticuloControlador.buscar);

// Ruta util
// post para guardar un recurso
// get para devolver un recurso en la base de datos
router.post("/crear",ArticuloControlador.crear);
router.post("/subir-imagen/:id",[subidas.single('file0')], ArticuloControlador.subirImagen);

router.delete("/articulo/:id", ArticuloControlador.borrar);
router.put("/articulo/:id", ArticuloControlador.editar);


module.exports = router;
