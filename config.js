//Datos globale centralizados
//base de datos
//url de la api
//puerto

const port = process.env.PORT || 3700;

const config = {
    port,
    url: `https://api-portfolio.herokuapp.com/`,
    dataBase: "mongodb+srv://default-user:default-user@portfoliodb-luwjq.gcp.mongodb.net/portfoliodb?retryWrites=true&w=majority"  //'mongodb://localhost:27017/portafolio'
} 

module.exports = config;