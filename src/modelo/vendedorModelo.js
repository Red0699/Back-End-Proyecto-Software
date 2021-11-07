var connection = require('../conexion/index');

var vendedorModel = {};

vendedorModel.getVendedores = function(callback)
{

    if (connection)
    {
        var sql = "SELECT id_vendedor "
                        +", nom1_vendedor "
                        +", nom2_vendedor "
                        +", ape1_vendedor "
                        +", ape2_vendedor "
                        +", desc_vendedor "
                        +" FROM vendedor  "
                        +" ORDER BY id_vendedor"
                        

        connection.query(sql, function(error, rows)
        {
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, rows);
            }
        } );
    }

}

//---------------------------------------------------------------
//obtenemos un vendedor por su id
vendedorModel.getVendedor = function (id, callback)
{
    
    if (connection)
    {
        var sql = "SELECT id_vendedor "
                        +", nom1_vendedor "
                        +", nom2_vendedor "
                        +", ape1_vendedor "
                        +", ape2_vendedor "
                        +", desc_vendedor "
                        +" FROM vendedor  "
                        +" WHERE id_vendedor  = " 
                        + connection.escape(id) + ";";

        //console.log(id);
        //console.log(" 31  tal  " );
        connection.query(sql, function (error, row)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
}

//---------------------------------------------------------------
//añadir un nuevo vendedor
vendedorModel.insertVendedor = function (vendedorData, callback)
{
    if (connection)
    {
        //console.log(vendedorData)
        var sql = "INSERT INTO vendedor SET ?";
        //console.log("  tal  " + sql);

        connection.query(sql, vendedorData, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Registro Insertado"});
            }
        });
    }
}


//---------------------------------------------------------------
//actualizar un vendedor
vendedorModel.updateVendedor = function (vendedorData, callback)
 {
    //console.log(" 32  tal  ");

    if (connection)
    {
        var sql = "UPDATE vendedor SET "
                    + " nom1_vendedor = " + connection.escape(vendedorData.nom1_vendedor)
                    + ", nom2_vendedor = " + connection.escape(vendedorData.nom2_vendedor)
                    + ", ape1_vendedor = " + connection.escape(vendedorData.ape1_vendedor)
                    + ", ape2_vendedor = " + connection.escape(vendedorData.ape2_vendedor)
                    + ", desc_vendedor = " + connection.escape(vendedorData.desc_vendedor)
                    + " WHERE  id_vendedor  =  " + connection.escape(vendedorData.id_vendedor) + ";";
        
        ///console.log(" 37  tal  " + sql);

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Registro Actualizado"});
            }
        });
    }
}

module.exports = vendedorModel;