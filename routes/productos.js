const express = require("express");
const { reset } = require("nodemon");
const Contenedor = require("../claseContenedor.js");
var path = require('path');

const app = express();
const { Router } = express;
const router = new Router();

let productos = new Contenedor("productos.txt");


//GET TODOS LOS PRODUCTOS
router.get("/", (req, res) => {

  async function getTodos(){
    try{
      let aux = await productos.getAll();
      res.send(aux);
      /* res.render("products", {data:aux}); */
    }
    catch(error){
      throw Error("Error en todos los productos")
    }  
  }    
  getTodos();

});

//GET PRODUCTO POR ID
router.get("/:id", (req, res) =>{
  async function getxId(){
    try{
      let ptoId = await productos.getById(parseInt(req.params.id));
      //ME FIJO SI EXISTE EL PTO CON EL ID SOLICITADO
      if (Object.keys(ptoId).length === 0) {
        res.send({ error : 'producto no encontrado' });
      }
      //PTO CON ID SOLICITADO ENCONTRADO
      else{
        res.send(ptoId);
      }
    }
    catch(error){
      throw Error("Error en pto random");
    }
    
  };
  getxId();
});

//POST CON PTO NUEVO ENVIADO POR FORMULARIO HTML
router.post("/", (req, res) => {
  /* console.log(req.body); */
  let { titulo, precio, thumbail } = req.body;
  let newObj = {
    titulo,
    precio,
    thumbail,
  };

  async function savePto(){
    try {
      await productos.save(newObj);
      let aux = await productos.getAll();
      res.statusCode = 301;
      res.setHeader("Location", "http://localhost:8080/");
      res.end();
      /* res.render("products", {data:aux}); */
      
    } catch (error) {
      throw Error("Error en post productos");
    }
  }
  savePto();
});

//PUT MODIFICANDO SEGUN ID
router.put("/:id", (req, res) =>{
  let { titulo, precio, thumbail } = req.body;

  async function modfPto(){
    try {
      //BUSCO EL PRODUCTO SEGUN ID Y LE ASIGNO LOS NUEVOS VALORES
      let ptoMod = await productos.getById(parseInt(req.params.id));
      //ME FIJO SI EXISTE EL PTO CON EL ID SOLICITADO
      if (Object.keys(ptoMod).length === 0) {
        res.send({ error : 'producto no encontrado' });
      }
      //PTO CON ID SOLICITADO ENCONTRADO
      else{
        ptoMod = {
        titulo,
        precio,
        thumbail,
        id : parseInt(req.params.id)
      }
        //ARMO UN ARRAY DE TODOS LOS PRODUCTOS
        let todosPtos = await productos.read();
        todosPtos = (JSON.parse(todosPtos, null, 2));
        //MODIFICO EL ARRAY CON EL PTO MODIFICADO
        let auxId = parseInt(req.params.id) - 1;
        todosPtos.splice(auxId, 1, ptoMod);
        //ESCRIBO NUEVAMENTE EL ARCHIVO
        await productos.write(todosPtos, "Producto modificado correctamente");
        //ENVIO RESPUESTA
        res.send(todosPtos);
      }
    } catch (error) {
      throw Error("Error en put modificacion productos");
    }
  }
  modfPto();

})

//DELETE SEGUN ID
router.delete("/:id", (req,res) =>{
  async function deletexId(){
    try {
      //ME FIJO SI EXISTE EL PTO CON EL ID SOLICITADO
      let flag = await productos.getById(parseInt(req.params.id));
      if (Object.keys(flag).length === 0) {
        res.send({ error : 'producto no encontrado' });
      }
      //PTO CON ID SOLICITADO ENCONTRADO
      else{
        await productos.deleteById(parseInt(req.params.id));
        res.send(await productos.getAll());
      }
    } catch (error) {
      throw Error ("Error en el delete por id");
    }
  }
  deletexId();
})

//EXPORT MODULO ROUTER
module.exports = router;