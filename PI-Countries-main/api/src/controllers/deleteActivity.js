//Veamos si en principio me alcanza solo con Activity...
const { Activity } = require('../db');

const deleteActivity = async function (Id) {
    //console.log(Id)
    try{  
      //primero me la voy a traer con findByPk y luego la rompo a la miercoles...si si si.
      const toDeleteActivity = await Activity.findByPk(Id);
      //console.log(toDeleteActivity)
      if (toDeleteActivity){
        const deleteActivity =  await toDeleteActivity.destroy();
        //return `Activity deleted successfully (Id:${Id})`;
        return Id;
      }
      else return "Id to be deleted not found!"; 

    }
    catch(unError){
      throw new Error(unError.message)
    }
    
  }
    
//Por ultimo, voy a exportar mi funcion para consumirla luego desde la ruta
module.exports = deleteActivity;
