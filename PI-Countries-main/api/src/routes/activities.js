const { Router } = require('express');
const router = Router();
const createActivity = require("../controllers/createActivity.js");
const getActivities = require("../controllers/getActivities.js");
const deleteActivity = require("../controllers/deleteActivity");

router.post("/", async function (req,res){
    console.log(req.body)
    try{
        const respuesta = await createActivity(req.body);
        //res.send(respuesta);//no necesito realmente devolver nada, por mas que haya armado el controller con una devolucion de datos...
        res.send("Actividad creada satisfactoriamente!")
    }catch(unError){
        res.status(400).send(unError.message)
    }
    
});

router.get("/", async function (req, res){
    try{
        const respuesta = await getActivities();
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message)
    }
});

router.delete("/delete/:Id", async (req, res) => {
    try{
        //console.log(req.params.Id);
        const respuesta = await deleteActivity(req.params.Id);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message)
    }
  });
  
module.exports = router;