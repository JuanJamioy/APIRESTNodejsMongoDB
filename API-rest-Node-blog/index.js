const{conexion} = require('./database/conexion');
const express = require('express')
// express es el framework para hacer peticiones http rutas etc

const cors = require('cors');
// Inicializar la APP
console.log('App de node arrancada');
// Conectar a la base de datos
conexion();
//  Crear servidor Node
const app = express();
const puerto = 3900;
// configurar corse
app.use(cors())
// convertir body a objeto js
app.use(express.json()); //convertir datos con conten-type app/json
app.use(express.urlencoded({extended:true}));//recibir datos form-urlencoded
// crear rutas
// RUTAS

const rutas_articulo =  require("./rutes/articulo");
// cargo las rutas
app.use("/api", rutas_articulo);
// Rutas pruebas hardcodeadas
app.get('/probando',(req,res)=>{
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
        url:"jamioy.com"
    },
    {
        curso: "Aprendiendo NodeJs",
        estudiante: "Juan David Jamioy",
        url:"jamioy.com"
    },


])
})
app.get('/',(req,res)=>{
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
    return res.status(200).send(`
    <h1>Empezamos a crear un api rest con NodeJs</h1>
    `)
})
// crear servidor
app.listen(puerto,()=>{
    console.log("Servidor corriendo en el puerto " + puerto);

})
