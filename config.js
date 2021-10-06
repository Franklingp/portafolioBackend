//Datos globale centralizados
//base de datos
//url de la api
//puerto

const port = process.env.PORT || 3700;

const config = {
    port,
    // url: `http://192.168.0.4:${port}/`,
    url: `http://localhost:${port}/`,
    dataBase: 'mongodb://localhost:27017/portafolio'
}

module.exports = config;