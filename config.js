//Datos globale centralizados
//base de datos
//url de la api
//puerto

const port = process.env.PORT || 3700;

const config = {
    port,
    url: `http://192.168.0.4:${port}/`,
    dataBase: "mongodb+srv://default-user:default-user@portfoliodb-luwjq.gcp.mongodb.net/portfoliodb?retryWrites=true&w=majority"  //'mongodb://localhost:27017/portafolio'
} 

module.exports = config;