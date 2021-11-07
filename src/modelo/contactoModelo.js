var connection = require('../conexion/index');

var contactoModel = {};

contactoModel.getContactos = function (callback) {

    if (connection) {
        var sql = "SELECT id_contactoC "
            + ", id_cliente "
            + ", id_vendedor "
            + ", tel_contacto "
            + ", correo_contacto "
            + ", direccion_contacto "
            + " FROM contacto  "
            + " ORDER BY id_contactoC"


        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }

}

//---------------------------------------------------------------
//obtenemos un contacto por su id
contactoModel.getContacto = function (id, callback) {

    if (connection) {
        var sql = "SELECT id_contactoC "
            + ", id_cliente "
            + ", id_vendedor "
            + ", tel_contacto "
            + ", correo_contacto "
            + ", direccion_contacto "
            + " FROM contacto  "
            + " WHERE id_contactoC  = " + connection.escape(id) + ";";

        //console.log(id);
        //console.log(" 31  tal  " );
        connection.query(sql, function (error, row) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                callback(null, row);
            }
        });
    }
}

//---------------------------------------------------------------
//añadir un nuevo contacto
contactoModel.insertContacto = function (contactoData, callback) {
    if (connection) {
        //console.log(contactoData)
        var sql = "INSERT INTO contacto SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, contactoData, function (error, result) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Insertado" });
            }
        });
    }
}


//---------------------------------------------------------------
//actualizar un contacto
contactoModel.updateContacto = function (contactoData, callback) {
    //console.log(" 32  tal  ");

    if (connection) {
        var sql = "UPDATE contacto SET "
            + " id_cliente = " + connection.escape(contactoData.id_cliente)
            + ", id_vendedor = " + connection.escape(contactoData.id_vendedor)
            + ", tel_contacto = " + connection.escape(contactoData.tel_contacto)
            + ", correo_contacto = " + connection.escape(contactoData.correo_contacto)
            + ", direccion_contacto = " + connection.escape(contactoData.direccion_contacto)
            + " WHERE  id_contactoC  =  " + connection.escape(contactoData.id_contactoC) + ";";

        ///console.log(" 37  tal  " + sql);

        connection.query(sql, function (error, result) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Actualizado" });
            }
        });
    }
}

module.exports = contactoModel;