//subir imagen desde index y descargarla a carpeta "bucket"

/*
import cors from "cors";
import multer from "multer"; //permite leer los archivos que pasamos
import MethodOverride from "method-override";
import {v4 as uuid} from "uuid"; //V4 = es la version y va cambiando
import express from "express";
import dayjs from "dayjs";    //agregamos la libreria para la fecha
*/

const cors = require("cors");
const multer = require("multer");
const  MethodOverride = require("method-override");
const {v4 as uuid} = require("uuid");
const express = require("express");
const dayjs = require("dayjs");


const server = express();
const log = console.log;

let port = process.env.PORT || 3000;

server.use(cors()) //activamos cors por si tenemos form
server.use(express.json());

//configuracion (tiene dos propiedades (destination, filename))

const multerConfig = multer.diskStorage({ //configuraciond e multer (si quiero guardar imagen en discoduro)
    destination: function (req, file, cb) {
        cb(null, "./bucket"); //donde lo ubicamos  //cb = callback
    },
    filename: function (req, file, cb) {
        let idImage = uuid().split("-")[0];

        //si queremos agregar fecha al archivo()
        let day = dayjs().format("DD-MM-YYYY")
        cb(null, `${day}.${idImage}.${file.originalname}`); //original name = nombre del archivo en la pc          
    },
});

const multerMiddle = multer({storage: multerConfig}); //lo llamo nuevamente (le metemos una fuincion que acepta obnjeto)

server.post("/upload", multerMiddle.single("imagefile"), (req, res) => {
    if (req.file) { //verificar si estamos mandando imagen
        res.send("imagen guardada...");
    } else {
        res.send("error al cargar la imagen / posiblemente no fue recibida");
    }
});

///
server.get("/", (req, res) => { //endpoint  (prueba)
    res.sendFile("start endpoint");
});

server.listen(3000, () => { //levantar el servicio (puerto)
    log("start server");
}).on("error", () => { //por si tiene error
    log("error server");
});