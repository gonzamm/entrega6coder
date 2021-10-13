const express = require("express");
const { reset } = require("nodemon");
var path = require('path');

const app = express();
const { Router } = express;
const router = new Router();



//GET CHAT Y PTOS
router.get("/", (req, res) => {
    res.render("ptochat", {});
    /* res.send("HOLA") */
});

//EXPORT MODULO ROUTER
module.exports = router;