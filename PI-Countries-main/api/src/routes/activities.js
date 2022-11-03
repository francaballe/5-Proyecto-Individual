const { Router } = require('express');
const router = Router();
const createActivity = require("../controllers/createActivity.js");
const getActivities = require("../controllers/getActivities.js");
const deleteActivity = require("../controllers/deleteActivity");
const { Country, Activity } = require('../db');

router.post("/", async function (req,res){
    //console.log(req.body)
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
  
router.put("/put/:Id", async (req, res) => {
    //console.log(req.body)
    //console.log(req.params)
    const { Id } = req.params;
    const { name } = req.body;
    console.log("ID: " + Id + " name: " + name)
    try{
        let resp = await Activity.findByPk(Id)
        resp.update({name : name})
        //resp.save()

        console.log("respuesta:", resp)
    }catch(unError){
        console.log(unError)
    }
    
    /*
    try{
        let resp = await Country.findByPk(data.countries[i])
        if (!resp) throw new Error(`El País ${data.countries[i]} no fue encontrado en la base local!`)
      }
      catch(unError){
        throw new Error(unError.message)
      }
    }
    */
    res.send ("estoy haciendo un put")
})

module.exports = router;