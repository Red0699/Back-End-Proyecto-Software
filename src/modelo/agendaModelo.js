const conexion = require('../conexion/index');
var connection = require('../conexion/index');

var agendaModel = {};

agendaModel.getAgendas = function (callback) {

    if (connection) {
        var sql = "SELECT id_agenda "
            + ", id_cliente "
            + ", id_vendedor "
            + ", comentarios "
            + ", fecha_hora "
            + ", id_propiedad "
            + " FROM agenda  "
            + " ORDER BY id_agenda"


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
agendaModel.getAgenda = function (id, callback) {

    if (connection) {
        var sql = "SELECT id_agenda "
            + ", id_cliente "
            + ", id_vendedor "
            + ", comentarios "
            + ", fecha_hora "
            + ", id_propiedad "
            + " FROM agenda  "
            + " WHERE id_agenda  = "
            + connection.escape(id) + ";";

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

agendaModel.getInformeProps = function (callback) {
    if (connection) {
        var sql = "SELECT id_propiedad AS 'Codigo propiedad',"
            + "desc_Neg AS 'Tipo de negocio',"
            + "idprop,"
            + "ciudad,"
            + "direccion,"
            + "precio ,"
            + "No_habitaciones AS 'Habitaciones',"
            + "No_banos AS 'Baños',"
            + "desc_Prop AS 'Descripcion',"
            + "desc_tipoProp AS 'Tipo de propiedad',"
            + "area_construida,"
            + "fecha_hora AS 'Fecha y hora' "
            + "FROM agenda "
            + "NATURAL JOIN propiedad  "
            + "NATURAL JOIN tipo_propiedad  "
            + "NATURAL JOIN tipo_negocio  "
            + "ORDER BY id_propiedad"


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

agendaModel.getInformeVends = function (callback) {
    if (connection) {
        var sql = "SELECT id_vendedor,"
            + "nom1_vendedor AS 'Nombre 1', "
            + "nom2_vendedor AS 'Nombre 2', "
            + "ape1_vendedor AS 'Apellido 1', "
            + "ape2_vendedor AS 'Apellido 2', "
            + " desc_vendedor AS 'Descripción',"
            + "fecha_hora AS 'Fecha y hora',"
            + "comentarios  "
            + "FROM agenda  "
            + "NATURAL JOIN vendedor  "
            + "ORDER BY id_vendedor"


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
agendaModel.getInformeProp = function (tit, a1, a2, callback) {

    if (connection) {
        var sql = "SELECT id_propiedad ,"
            + "desc_Neg ,"
            + "titulo,"
            + "ciudad,"
            + "direccion,"
            + "precio ,"
            + "No_habitaciones ,"
            + "No_banos ,"
            + "desc_Prop ,"
            + "desc_tipoProp ,"
            + "area_construida,"
            + "fecha_hora  "
            + "FROM agenda "
            + "NATURAL JOIN propiedad  "
            + "NATURAL JOIN tipo_propiedad  "
            + "NATURAL JOIN tipo_negocio  "
            + "WHERE id_propiedad = " + connection.escape(tit)
            + "  AND fecha_hora BETWEEN " + connection.escape(a1)
            + "  AND " + connection.escape(a2) + ";";

        console.log(tit);

        connection.query(sql, function (error, rows) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                //callback(null, JSON.stringify(rows));
                callback(null, rows);
            }
        });
    }
}
//---------------------------------------------------------------

agendaModel.getInformeVend = function (vend, f1, f2, callback) {

    if (connection) {
        var sql = "SELECT id_vendedor,"
            + "nom1_vendedor , "
            + "nom2_vendedor , "
            + "ape1_vendedor , "
            + "ape2_vendedor , "
            + " desc_vendedor ,"
            + "fecha_hora ,"
            + "comentarios  "
            + "FROM agenda  "
            + "NATURAL JOIN vendedor  "
            + "WHERE id_vendedor = " + connection.escape(vend)
            + " AND fecha_hora BETWEEN " + connection.escape(f1)
            + " AND " + connection.escape(f2)

        console.log(vend);

        connection.query(sql, function (error, row) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                //callback(null, JSON.stringify(row));
                callback(null, row);
            }
        });
    }
}

//---------------------------------------------------------------
agendaModel.insertAgenda = function (agendaData, callback) {
    if (connection) {
        //console.log(agendaData)
        var sql = "INSERT INTO agenda SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, agendaData, function (error, result) {
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
agendaModel.updateAgenda = function (agendaData, callback) {
    //console.log(" 32  tal  ");

    if (connection) {
        var sql = "UPDATE agenda SET "
            + " id_cliente = " + connection.escape(agendaData.id_cliente)
            + ", id_vendedor = " + connection.escape(agendaData.id_vendedor)
            + ", comentarios = " + connection.escape(agendaData.comentarios)
            + ", fecha_hora = " + connection.escape(agendaData.fecha_hora)
            + " WHERE  id_agenda  =  " + connection.escape(agendaData.id_agenda) + ";";

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

module.exports = agendaModel;