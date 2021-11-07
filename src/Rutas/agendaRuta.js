var express = require('express');
var router = express.Router();

var agendaModel = require('../modelo/agendaModelo');

module.exports = function () {
    router.get("/", function (req, res) {
        agendaModel.getAgendas(function (error, data) {
            res.status(200).json(data);
        });
    });

    //Filtro Informe completo propiedad
    router.get("/a", function (req, res) {
        agendaModel.getInformeProps(function (error, data) {
            res.status(200).json(data);
        });
    });

    //Filtro Informe completo vendedor
    router.get("/c", function (req, res) {
        agendaModel.getInformeVends(function (error, data) {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra la agenda solicitada
    router.get("/:id", function (req, res) {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id)) {
            agendaModel.getAgenda(id, function (error, data) {
                //si la agenda existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else {
                    res.json(404,
                        {
                            "msg": "Registro no Existe"
                        });
                }
            });
        }
        else //si hay algún error
        {
            res.status(500).json({ "msg": "No es un número" });
        }

    
    });

    //Obtener informe por propiedad y periodo de tiempo
    router.get("/:tit/:a1/:a2", function(req,res){
        var tit = req.params.tit;
        var a1 = req.params.a1;
        var a2 = req.params.a2;

        agendaModel.getInformeProp(tit,a1,a2, function(error, data){

            if(typeof data !== 'undefined' && data.length > 0){
                res.status(200).json(data);
            }else{
                res.json(404,
                    {
                        "msg": "Registro no Existe"
                    });
            }

        });

    });

    //Obtener informe por vendedor y periodo de tiempo
    router.get("/d/:vend/:f1/:f2", function(req,res){
        var vend = req.params.vend;
        var f1 = req.params.f1;
        var f2 = req.params.f2;

        agendaModel.getInformeVend(vend,f1,f2, function(error, data){

            if(typeof data !== 'undefined' && data.length > 0){
                res.status(200).json(data);
            }else{
                res.json(404,
                    {
                        "msg": "Registro no Existe"
                    });
            }

        });

    });

    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res) {
        //creamos un objeto Json con los datos de la agenda
        var agendaData =
        {
            id_agenda: null,
            id_cliente: req.body.id_cliente,
            id_vendedor: req.body.id_vendedor,
            comentarios: req.body.comentarios,
            fecha_hora: req.body.fecha_hora,
            id_propiedad: req.body.id_propiedad,

        };


        //usamos la funcion para insertar
        agendaModel.insertAgenda(agendaData, function (error, data) {
            //se muestra el mensaje correspondiente
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(500).send({ error: "boo:(" });
            }
        });
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res) {
        //almacenamos los datos de la petición en un objeto
        //console.log(" 38");
        var agendaData =
        {
            id_agenda: req.body.id_agenda,
            id_cliente: req.body.id_cliente,
            id_vendedor: req.body.id_vendedor,
            comentarios: req.body.comentarios,
            fecha_hora: req.body.fecha_hora,
            id_propiedad: req.body.id_propiedad,
        };


        //usamos la funcion para actualizar
        agendaModel.updateAgenda(agendaData, function (error, data) {
            //se muestra el mensaje correspondiente
            if (data && data.msg) {
                res.status(200).json(data);
            }
            else {
                res.status(500).send(
                    {
                        error: "boo:("
                    });
            }
        });
    });


    return router;
}
