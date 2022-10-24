//Consumo mi modelo de BBDD. Solo necesito Country en este caso
const { Country } = require('../db');

//voy a definir una funcion
const getAllCountries = async function () {
    
  //Uso tanto await aca como en la ruta solo a los efectos de poder hacer un console.log aca...
  try{
    const resp = await Country.findAll()
    //console.log(resp)
    return resp;
  }catch{
    throw new Error("Error al intentar traer paises de la base local!")
  }    
    
  }
    
//Por ultimo, voy a exportar mi funcion para consumirla luego desde la ruta
module.exports = getAllCountries;
