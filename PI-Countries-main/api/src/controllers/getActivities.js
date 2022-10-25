//Consumo mi modelo de BBDD. Solo necesito Activity en este caso
const { Activity,Country } = require('../db');

const getActivities = async function () {
    
  //Uso tanto await aca como en la ruta solo a los efectos de poder hacer un console.log aca...
  try{
    
    const resp = await Activity.findAll({include:Country})    

    /* const resp = await Activity.findAll()
    for (let i=0;i<resp.length;i++){
      resp[i].dataValues.countries = [];  //con estoy estoy creando una nueva property, es como un virtual field
    }

    for (let i=0;i<resp.length;i++){
      let paisesDelaActividad = await resp[i].getCountries();
      let sizeArrayDePaisesDeUnaActividad = paisesDelaActividad.length;//HERMOSO el nombre de mi variable jajajaj
      for (let j=0;j<sizeArrayDePaisesDeUnaActividad;j++){
        resp[i].dataValues.countries.push(
          {
            Id: paisesDelaActividad[j].Id,
            name: paisesDelaActividad[j].name
          }
          )}  
    } */

    return resp;
  }catch{
    throw new Error("Error al intentar traer actividades de la base local!")
  }    
    
  }
    
//Por ultimo, voy a exportar mi funcion para consumirla luego desde la ruta
module.exports = getActivities;
