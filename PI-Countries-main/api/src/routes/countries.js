const { Router } = require('express');
const router = Router();
const getAllCountries = require("../controllers/getAllCountries.js");
const getCountryById = require("../controllers/getCountryById.js");
const getCountryByName = require("../controllers/getCountryByName.js");

//en esta ruta en particular voy a devolver todos los paises a mi cliente o bien,
//los paises cuyo nombre tengan en su haber lo pasado por queries. (countries?name="..." -----> Queries)
router.get("/", async function (req,res){
    //console.log(req.query)  //{ name: 'Argentina' }
    const { name } = req.query;
    
    if (name){
        try{
            const respuesta = await getCountryByName(name);
            //console.log(respuesta)
            res.send(respuesta);
        }catch(unError){
            res.status(400).send(unError.message);
        }  
    }
    else{
        try {
            const respuesta = await getAllCountries();
            res.send(respuesta);
        }catch(unError){
            res.status(400).send(unError.message);
        }   
    }
    
});     

//countries/{idPais} -----> Obtengo el detalle de un país en particular pasado por Params...
router.get("/:idPais", async function (req,res){
    //console.log(req.params) //{ idPais: 'argentina' }
    const {idPais} = req.params;
    try {
        const respuesta = await getCountryById(idPais);
        res.send(respuesta)
    }catch(unError){
        res.status(400).send(unError.message)
    }
});


module.exports = router;