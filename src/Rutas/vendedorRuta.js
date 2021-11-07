var express = require('express');
var router = express.Router();

var vendedorModel = require('../modelo/vendedorModelo');

module.exports = function()
{
    router.get("/", function(req, res)
    {
        vendedorModel.getVendedores(function(error, data)
        {
            res.status(200).json(data);
        });
    });
    
   //---------------------------------------------------------------
    //Muestra el método CRUL read(leer), que muestra el vendedor solicitado
    router.get("/:id", function (req, res)
    {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id))
        {
            vendedorModel.getVendedor(id, function (error, data)
            {
                //si el vendedor existe lo mostramos en formato json
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
        //creamos un objeto Json con los datos del vendedor
        var vendedorData =
            {
                id_vendedor: null,
                nom1_vendedor: req.body.nom1_vendedor,
                nom2_vendedor: req.body.nom2_vendedor,
                ape1_vendedor: req.body.ape1_vendedor,
                ape2_vendedor: req.body.ape2_vendedor,
                desc_vendedor: req.body.desc_vendedor,

            };


        //usamos la funcion para insertar
        vendedorModel.insertVendedor(vendedorData, function (error, data)
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
        var vendedorData =
            {
                id_vendedor: req.body.id_vendedor,
                nom1_vendedor: req.body.nom1_vendedor,
                nom2_vendedor: req.body.nom2_vendedor,
                ape1_vendedor: req.body.ape1_vendedor,
                ape2_vendedor: req.body.ape2_vendedor,
                desc_vendedor: req.body.desc_vendedor,
            };


        //usamos la funcion para actualizar
        vendedorModel.updateVendedor(vendedorData, function (error, data)
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
