// require es igual a un import en JS, require se usa para importar dependencias 
const mongoose = require('mongoose');
const conexion = async()=>{
    try {
        // dos formas de solucionar 
        // await mongoose.connect("mongodb://127.0.0.1:27017/mi_blog");
        await mongoose.connect("mongodb://127.0.0.1:27017/mi_blog")
        // 127.0.0.1 = localhost
        // parametro dentro de objeto
        // useNewUrlParser: true
        // useUnifiedTopology:true
        // useCreateIndex: true
        console.log("conectado correctamente a la base de datos mi_blog!!");
    } catch(error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");
        
    }
} 
module.exports = {
    conexion
}