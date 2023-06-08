const {validarArticulo} = require('../helpers/validar')
const Articulo = require('../models/Articulo');
const fs = require('fs');
const path = require('path')
const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una accion de prueba en mi controlador de articulos"
    })
}

const curso = (req, res) => {
    console.log('se ha ejecutado el endPoint probando');
    // return res.status(200).send(`
    // <div>
    //     <h1>Probando ruta nodeJs</h1>
    //     <p>Creando API res con Node</p>
    //     <ul>
    //         <li>Master en REACT</li>
    //         <li>Master en PHP</li>
    //     </ul>
    // </div>`)
    return res.status(200).json([{
        curso: "Aprendiendo NodeJs",
        estudiante: "Juan David Jamioy",
        url: "jamioy.com"
    },
    {
        curso: "Aprendiendo NodeJs",
        estudiante: "Juan David Jamioy",
        url: "jamioy.com"
    },


    ])
}



const crear = (req,res)=>{
    // recoger parametros por post a guardar
    let parametros = req.body;

    // validar los datos
    try {
        validarArticulo(parametros);
        
    } catch (error) {
        return res.status(400).json({
            status:'error',
            mensaje:'Faltan datos por enviar'
        })
        
    }
   
    

    // crear el objeto a guardar
    // guardar de manera automatica los parametros 
    const articulo = new Articulo(parametros); 

    // asignar valores a objeto basado en el modelo(manual o automatico)
    // articulo.titulo = parametros.titulo;

    // Guardar articulo en la base de datos
    articulo.save().
    then((articuloGuardado) => {
        if(!articuloGuardado){
            return res.status(400).json({
                status:'error',
                mensaje:'No se ha guardado el articulo'
            })
        }
        // Devolver resultado
        return res.status(200).json({
            status:'success',
            articulo: articuloGuardado,
            mensaje:'Se ha guardado el articulo con exito'
        })
        })}
    
    
    
const listar = async (req, res) => {
    let consulta = Articulo.find({});
    if (req.params.ultimos) {
        consulta.limit(3)
    }

    try {
        const articulos = await consulta.sort({ fecha: -1 }).exec();
        if (!articulos) {
            return res.status(404).json({
                status: 'error',
                mensaje: 'No se han encontrado articulos'
            })
        }
        return res.status(200).send({
            status: 'success',
            parametro: req.params.ultimos,
            contador: articulos.length,
            articulos
        });
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            mensaje: 'No se han encontrado articulos'
        })
    }
};

const uno = (req,res)=>{
    // recoger id con el url
    let id = req.params.id;
    // buscar el articulo
    try {
        Articulo.findById(id).then((articulo)=>{
            if(!articulo){
                return res.status(404).json({
                    status:'error',
                    mensaje:'No se ha encontrado el articulo'
                })
            }
            return res.status(200).json({
                status:'success',
                articulo
            })
        })
        
    } catch (error) {
        return res.status(400).json({
            status:'error'
        })
        
    }
 

    // Si no existe devolver error

    // Si existe devolver resultado
}

const borrar = (req,res)=>{
    let articulo_id = req.params.id;
    try {
        Articulo.findOneAndDelete({ _id: articulo_id }).then((articulo) => {

            if (!articulo) {
                return res.status(404).json({
                    status: 'error',
                    mensaje: 'no se ha encontrado el articulo'
                })
            }
            return res.status(200).json({
                status: 'success',
                articulo,
                mensaje: 'Se ha borrado el articulo'
            })
        }) 
        
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            mensaje: 'Error al borrar el articulo'
        
    })
    

}}

const editar = (req,res)=>{
    // recoger id
    let articulo_id = req.params.id;
    // recoger datos de body
    let parametros = req.body;

    // validar datos
    try {
        validarArticulo(parametros);

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'Faltan datos por enviar'
        })

    }

    // buscar y actualizar articulo

    try {
        Articulo.findOneAndUpdate({_id:articulo_id},parametros,{new:true}).then((articuloActualizado)=>{
        // devolver respuesta
        if (!articuloActualizado){
            return res.status(400).json({
                status: 'error',
                mensaje:'Error al actualizar'
            })
        }
        return res.status(200).json({
            status:'success',
            articulo: articuloActualizado
        })

        })
    
    }catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'Error al actualizar'
        
    })}}

const subirImagen = (req,res)=>{
    // configurar multer

    // recoger fichero de imagen de subida
    console.log(req.file);
    if(!req.file && !req.files){
        return res.status(404).json({
            status:'error',
            mensaje:'peticion invalida'
        })
    }

    // Nombre del archivo
    let archivo = req.file.originalname;

    // Extension del archivo
    let archivo_split = archivo.split('\.');
    let extension = archivo_split[1];

    // Comprobar extension correcta

    if(extension != 'png' && extension != 'jpg' && extension != 'jpeg' && extension != 'gif'){
        // borrar archivo y dar respuesta
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                status: 'error',
                mensaje: 'extension invalida'
            })
        })
    } else {
        // copia del editar xd

        // recoger id
        let articulo_id = req.params.id;

        // buscar y actualizar articulo

        try {
            Articulo.findOneAndUpdate({ _id: articulo_id }, {imagen: req.file.filename}, { new: true }).then((articuloActualizado) => {
                // devolver respuesta
                if (!articuloActualizado) {
                    return res.status(400).json({
                        status: 'error',
                        mensaje: 'Error al actualizar'
                    })
                }
                return res.status(200).json({
                    status: 'success',
                    articulo: articuloActualizado,
                    fichero: req.file
                })

            })

        } catch (error) {
            return res.status(400).json({
                status: 'error',
                mensaje: 'Error al actualizar'

            })
        }
        // return res.status(200).json({
        //     status: 'success',
        //     archivo_split,
        //     file: req.file
        // })
}

}

const imagen = (req, res) => {
    let fichero = req.params.fichero;
    let ruta_fisica = './img/articulos/' + fichero;

    fs.stat(ruta_fisica,(error,existe)=>{
        if(existe){
            return res.sendFile(path.resolve(ruta_fisica))
        }else{
            return res.status(404).json({
                status:'error',
                mensaje:'La imagen no existe'
            })
        }
    })

}

const buscar = (req,res)=>{
    // Sacar el string de busqueda
    let busqueda = req.params.busqueda;
    
    // Find OR
    try {
        Articulo.find({
            '$or': [
                { 'titulo': { '$regex': busqueda, '$options': 'i' } },
                { 'contenido': { '$regex': busqueda, '$options': 'i' } }
            ]
        }).sort({ fecha: -1 }).then((articulosEncontrados)=>{


            if(articulosEncontrados.length<=0){
                return res.status(404).json({
                    status:'error',
                    mensaje:'No se han encontrado articulos'
                })
            }

            return res.status(200).json({
                status: 'success',
                articulos: articulosEncontrados

            })
        })
            
        } catch (error) {


            return res.status(404).json({
                status: 'error',
                mensaje: 'Articulo no encontrado'
            })}
        
    }


    ;

    // Aplicar orden
    


    // Devolver resultado



 
module.exports = {
    prueba,
    curso,
    crear,
    listar,
    uno,
    borrar,
    editar,
    subirImagen,
    imagen,
    buscar,
}