var express = require('express');
var router = express.Router();

var contactoModel = require('../modelo/contactoModelo');

module.exports = function()
{
    router.get("/", function(req, res)
    {
        contactoModel.getContactos(function(error, data)
        {
            res.status(200).json(data);
        });
    });
    
   //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el contacto solicitado
    router.get("/:id", function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id))
        {
            contactoModel.getContacto(id, function (error, data)
            {
                //si el contacto existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0)
                {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else
                {
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

//---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res)
    {
        //creamos un objeto Json con los datos del contacto
        var contactoData =
            {
                id_contactoC: null,
                id_cliente: req.body.id_cliente,
                id_vendedor: req.body.id_vendedor,
                tel_contacto: req.body.tel_contacto,
                correo_contacto: req.body.correo_contacto,
                direccion_contacto: req.body.direccion_contacto,
            };


        //usamos la funcion para insertar
        contactoModel.insertContacto(contactoData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send({ error: "boo:(" });
            }
        });
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res)
    {
        //almacenamos los datos de la petición en un objeto
        //console.log(" 38");
        var contactoData =
            {
                id_contactoC: req.body.id_contactoC,
                id_cliente: req.body.id_cliente,
                id_vendedor: req.body.id_vendedor,
                tel_contacto: req.body.tel_contacto,
                correo_contacto: req.body.correo_contacto,
                direccion_contacto: req.body.direccion_contacto,
            };


        //usamos la funcion para actualizar
        contactoModel.updateContacto(contactoData, function (error, data)
        {
            //se muestra el mensaje correspondiente
            if (data && data.msg)
            {
                res.status(200).json(data);
            }
            else
            {
                res.status(500).send(
                { 
                    error: "boo:(" 
                });
            }
        });
    });


    return router;
}
