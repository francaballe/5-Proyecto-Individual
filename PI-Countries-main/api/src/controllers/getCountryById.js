//Consumo mi modelo de BBDD. Al final sólo necesité Country acá...
const { Country } = require('../db');

//voy a definir una funcion
const getCountryById = async function (countryId) {
    
  //Uso tanto await aca como en la ruta solo a los efectos de poder hacer un console.log aca...
  try{
    const resp = await Country.findByPk(countryId.toUpperCase());
    if (!resp) throw new Error("Ningún País coincide con el Id informado...")
    const allActivities = await resp.getActivities();//cuando después de una semana no tocás el back
    //....y te olvidás que el propio sequelize te crea métodos....que los parió. Me volví loco 
    //revisando donde estaba el import o declaración de este método jaja.
    
    //console.log(allActivities.length) //esto esta perfecto, devuelve la cantidad de actividades por Pais
    
    resp.dataValues.activities = [];
    if (allActivities.length){
      for (let i=0;i<allActivities.length;i++){
        resp.dataValues.activities.push({
        "Id":allActivities[i].getDataValue("Id"),
        "name":allActivities[i].getDataValue("name"),
        "season":allActivities[i].getDataValue("season")})
      }
    }
    
    //Comentamos este console.log para que Jorgito despues no diga que nuestras aplicaciones son un arbolito de navidad jaja
    //console.log(resp.dataValues)

    return resp;
  }catch(unError){
    throw new Error(unError.message)
  }    
    
  }
    
//Por ultimo, voy a exportar mi funcion para consumirla luego desde la ruta
module.exports = getCountryById;
