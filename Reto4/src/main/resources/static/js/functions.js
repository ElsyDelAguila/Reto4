
var serverURL = "http://129.151.113.230:8080/api/"
var estado = ""

//*****************************************************//
//                      CATEGORIA                      //
//*****************************************************//

function VarCategoria(respuesta) {
    $("#relacion-categoria").empty();
    let $varCat = $("#relacion-categoria");
    $.each(respuesta, function (id, catnom) {
        $varCat.append('<option value=' + catnom.id + '>' + catnom.name + '</option>');
    });

}

function TraerInformacionCategoria() {
    $.ajax({
        url: serverURL + "Category/all",
        headers: { 'Access-Control-Allow-Origin': '*' },
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#ResultadoCategoria").empty();
            VarCategoria(respuesta)
            MostrarRespuestaCategoria(respuesta);
        }
    });
}

function MostrarRespuestaCategoria(respuesta) {
    let tabla = "<table class='table thead-dark'> <thead>";
    tabla += "<tr scope='row'>";
    tabla += "<th scope='row'>" + "<center>COD</center>" + "</th>";
    tabla += "<th scope='row' style='width:300px'>" + "<center>NOMBRE</center>" +  "</th>";
    tabla += "<th scope='row' style='width:300px'>" + "<center>DESCRIPCIÓN</center>" + "</th>";
    tabla += "<th scope='row'>" + "</th>";
    tabla += "<th scope='row'>" + "</th>";
    tabla += "</tr>";

    for (i = 0; i < respuesta.length; i++) {
        tabla += "<tr>";
        tabla += "<td scope='row'><center>" + respuesta[i].id + "</center></td>";
        tabla += "<td scope='row'>" + respuesta[i].name + "</td>";
        tabla += "<td scope='row'>" + respuesta[i].description + "</td>";
        tabla += "<td scope='row'><button class='btn btn-link btn-sm' onclick='BorrarRegistroCategoria(" + respuesta[i].id + ")'><img src='./images/delete.png' width='20px' height='20px'></td>";
        tabla += "<td scope='row'><button class='btn btn-link btn-sm' onclick='ModificarRegistroCategoria(" + respuesta[i].id + "," + '"' + respuesta[i].name + '"' + "," + '"' + respuesta[i].description + '"' + ")'><img src='./images/edit.png' width='20px' height='20px'></button></td>"
        tabla += "</tr>";
    }
    tabla += "</thead> </table> ";
    $("#ResultadoCategoria").append(tabla);
}

function CrearInformacionCategoria() {
    let datos = {
        name: $("#NombreCategoria").val(),
        description: $("#DescripcionCategoria").val(),
    };

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: serverURL + "Category/save",
        success: function (respuesta) {
            $("#ResultadoCategoria").empty();
            $("#idCategoria").val("");
            $("#NombreCategoria").val("");
            $("#DescripcionCategoria").val("");
            TraerInformacionCategoria();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
        }
    });
}

function ActualizarInformacionCategoria() {
    let datos = {
        id: $("#idCategoria").val(),
        name: $("#NombreCategoria").val(),
        description: $("#DescripcionCategoria").val(),
    };

    $.ajax({
        type: "PUT",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: serverURL + "Category/update",
        success: function (respuesta) {
            $("#ResultadoCategoria").empty();
            $("#idCategoria").val("");
            $("#NombreCategoriagoria").val("");
            $("#DescripcionCategoria").val("");
            TraerInformacionCategoria();
        }
    });
}

function BorrarRegistroCategoria(idElemento) {
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: serverURL + "Category/" + idElemento,
        success: function (respuesta) {
            $("#ResultadoCategoria").empty();
            $("#idCategoria").val("");
            TraerInformacionCategoria();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
        }
    });
}

function ModificarRegistroCategoria(idg, nom, des) {
    $("#idCategoria").val(idg);
    $("#NombreCategoria").val(nom);
    $("#DescripcionCategoria").val(des);
}

function LimpiarFormularioCategoria() {
    $("#idCategoria").val("");
    $("#NombreCategoria").val("");
    $("#DescripcionCategoria").val("");
}

//*****************************************************//
//                       RESERVAS                      //
//*****************************************************//

function traerInformacionReserva() {
    $.ajax({
        url: serverURL + "Reservation/all",
        headers: { 'Access-Control-Allow-Origin': '*' },
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado5").empty();
            traerInformacionCliente();
            traerInformacionLib();
            mostrarRespuestaReserva(respuesta);
        }
    });
    limpiarElementoReserva();
}

function mostrarRespuestaReserva(respuesta) {
    let tabla = "<table class='table'> <thead>";
    tabla += "<tr>";
    tabla += "<th scope='row'>" + "COD" + "</th>";
    tabla += "<th scope='row'>" + "ENTREGA" + "</th>";
    tabla += "<th scope='row'>" + "DEVOLUCIÓN" + "</th>";
    tabla += "<th scope='row'>" + "ESTADO" + "</th>";
    tabla += "<th scope='row'>" + "CLIENTE" + "</th>";
    tabla += "<th scope='row'>" + "LIBRO" + "</th>";
    tabla += "<th scope='row'>" + "CATEGORÍA" + "</th>";
    tabla += "<th scope='row'>" + "</th>";
    tabla += "<th scope='row'>" + "</th>";
    tabla += "</tr>";

    for (i = 0; i < respuesta.length; i++) {
        tabla += "<tr>";
        tabla += "<td scope='row'>" + respuesta[i].idReservation + "</td>";
        tabla += "<td scope='row'>" + cnvFecha(respuesta[i].startDate) + "</td>";
        tabla += "<td scope='row'>" + cnvFecha(respuesta[i].devolutionDate) + "</td>";
        tabla += "<td scope='row'>" + respuesta[i].status + "</td>";
        tabla += "<td scope='row'>" + verificarResClie(respuesta[i].client) + "</td>";
        tabla += "<td scope='row'>" + verificarResCudri(respuesta[i].lib) + "</td>";
        tabla += "<td scope='row'>" + verificarResCudCat(respuesta[i].lib) + "</td>";
        tabla += "<td scope='row'><button class='btn btn-link btn-sm' onclick='borrarElementoReserva(" + respuesta[i].idReservation + ")'><img src='./images/delete.png' width='20px' height='20px'></td>";
        tabla += "<td scope='row'><button class='btn btn-link btn-sm' onclick='modificarElementoReserva(" + respuesta[i].idReservation + "," + '"' + cnvFecha(respuesta[i].startDate) + '"' + "," + '"' + cnvFecha(respuesta[i].devolutionDate) + '"' + "," + '"' + respuesta[i].client.idClient + '"' + "," + '"' + respuesta[i].lib.id + '"' + ")'><img src='./images/edit.png' width='20px' height='20px'></button></td>"
        tabla += "</tr>";
    }
    tabla += "</thead> </table> ";
    $("#resultado5").append(tabla);
}

function cnvFecha(fecha) {
    return fecha.substring(0, 10);
}

function verificarResClie(respuesta) {
    if (!respuesta) {
        estado = "--"
    }
    else estado = respuesta.name
    return estado;
}

function verificarResCudri(respuesta) {
    if (!respuesta) {
        estado = "--"
    }
    else estado = respuesta.name
    return estado;
}

function verificarResCudCat(respuesta) {
    if (!respuesta) {
        estado = "--"
    }
    else estado = respuesta.category.name
    return estado;
}

function guardarInformacionReserva() {
    let datos = {
        idReservation: $("#idReservacion").val(),
        startDate: $("#fechaInico").val(),
        devolutionDate: $("#fechaDevo").val(),
        status: "created",
        client: { idClient: +$("#relacion-cliente").val() },
        lib: { id: +$("#relacion-libro").val() },
    };
    
    $.ajax({
        type: "POST",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: serverURL + "Reservation/save",
        success: function (respuesta) {
            $("#fechaInico").val("");
            $("#fechaDevo").val("");
            traerInformacionReserva();
            limpiarElementoReserva();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
        }
    });
}

function editarInformacionReserva() {
    let datos = {
        idReservation: $("#idReservacion").val(),
        startDate: $("#fechaInico").val(),
        devolutionDate: $("#fechaDevo").val(),
        status: "created",
        client: { idClient: +$("#relacion-cliente").val() },
        lib: { id: +$("#relacion-libro").val() },
    };

    $.ajax({
        type: "PUT",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: serverURL + "Reservation/update",
        success: function (respuesta) {
            traerInformacionReserva();
            limpiarElementoReserva();
        },
    });
}

function borrarElementoReserva(idElemento) {
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: serverURL + "Reservation/" + idElemento,
        success: function (respuesta) {
            $("#resultado5").empty();
            traerInformacionLib();
            traerInformacionReserva();
        }
    });
    limpiarElementoReserva()
}

function modificarElementoReserva(idRes, fIni, fEnt, reCli, reLib) {
    $("#idReservacion").val(idRes);
    $("#fechaInico").val(fIni);
    $("#fechaDevo").val(fEnt);
    $("#relacion-cliente").val(reLib);
    $("#relacion-libro").val(reLib);
}

function limpiarElementoReserva() {
    $("#idReservacion").val("");
    $("#fechaInico").val("");
    $("#fechaDevo").val("");
    $("#relacion-cliente").val("");
    $("#relacion-libro").val("");
}

function verificarEstado(respuesta) {
    if (!respuesta) {
        estado = "No"
    }
    else estado = "Si"
    return estado;
}

//*****************************************************//
//                      CLIENTES                       //
//*****************************************************//

function variableCliente(respuesta) {
    $("#relacion-cliente").empty();
    let $varCli = $("#relacion-cliente");
    $.each(respuesta, function (id, cliente) {
        $varCli.append('<option value=' + cliente.idClient + '>' + cliente.name + '</option>');
    });
}

function traerInformacionCliente() {
    $.ajax({
        url: serverURL + "Client/all",
        headers: { 'Access-Control-Allow-Origin': '*' },
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado3").empty();
            variableCliente(respuesta);
            mostrarRespuestaCliente(respuesta);
        }
    });
}

function mostrarRespuestaCliente(respuesta) {
    let tabla = "<table class='table'> <thead>";
    tabla += "<tr>";
    tabla += "<th scope='row'>" + "COD" + "</th>";
    tabla += "<th scope='row'>" + "NOMBRE" + "</th>";
    tabla += "<th scope='row'>" + "CORREO" + "</th>";
    tabla += "<th scope='row'>" + "CLAVE" + "</th>";
    tabla += "<th scope='row'>" + "EDAD" + "</th>";
    tabla += "<th scope='row'>" + "RESERVACIÓN" + "</th>";
    tabla += "<th scope='row'>" + "MENSAJE" + "</th>";
    tabla += "<th scope='row'>" + "</th>";
    tabla += "<th scope='row'>" + "</th>";
    tabla += "</tr>";

    for (i = 0; i < respuesta.length; i++) {
        tabla += "<tr>";
        tabla += "<td scope='row'>" + respuesta[i].idClient + "</td>";
        tabla += "<td scope='row'>" + respuesta[i].name + "</td>";
        tabla += "<td scope='row'>" + respuesta[i].email + "</td>";
        tabla += "<td scope='row'>" + respuesta[i].password + "</td>";
        tabla += "<td scope='row'>" + respuesta[i].age + "</td>";
        tabla += "<td scope='row'>" + verificarEstado(respuesta[i].reservations) + "</td>"; //reservacion
        tabla += "<td scope='row'>" + verificarMensaje(respuesta[i].reservations[i]) + "</td>";//mensaje
        tabla += "<td scope='row'> <button class='btn btn-link btn-sm' onclick='borrarElementoCliente(" + respuesta[i].idClient + ")'><img src='./images/delete.png' width='20px' height='20px'></td>";
        tabla += "<td scope='row'> <button class='btn btn-link btn-sm'  onclick='modificarElementoCliente(" + respuesta[i].idClient + "," + '"' + respuesta[i].name + '"' + "," + '"' + respuesta[i].email + '"' + "," + '"' + respuesta[i].password + '"' + "," + '"' + respuesta[i].age + '"' + ")'><img src='./images/edit.png' width='20px' height='20px'></button></td>"
        tabla += "</tr>";
    }

    tabla += "</table> ";
    $("#resultado3").append(tabla);
}

function verificarReCudri(respuesta) {
    if (!respuesta) {
        estado = "--"
    }
    else estado = respuesta.lib.name
    return estado;
}

function verificarMensaje(respuesta) {
    if (!respuesta) {
        estado = "--"
    }
    else estado = respuesta.messageText
    return estado;
}

function guardarInformacionCliente() {
    let datos = {
        name: $("#nombre").val(),
        email: $("#correo").val(),
        password: $("#clave").val(),
        age: $("#edad").val()
    };

    $.ajax({
        type: "POST",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: serverURL + "Client/save",
        success: function (respuesta) {
            $("#nombre").val("");
            $("#correo").val("");
            $("#clave").val("");
            $("#edad").val("");
            traerInformacionCliente();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
        }
    });
}

function editarInformacionCliente() {
    let datos = {
        idClient: $("#idCliente").val(),
        name: $("#nombre").val(),
        email: $("#correo").val(),
        password: $("#clave").val(),
        age: $("#edad").val(),
    };

    $.ajax({
        type: "PUT",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: serverURL + "Client/update",
        success: function (respuesta) {
            $("#idCliente").val("");
            $("#nombre").val("");
            $("#correo").val("");
            $("#clave").val("");
            $("#edad").val("");
            traerInformacionCliente();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
        }
    });
}

function borrarElementoCliente(idElemento) {
    $.ajax({
        type: "DELETE",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        url: serverURL + "Client/" + idElemento,
        success: function (respuesta) {
            $("#resultado3").empty();
            traerInformacionCliente();
        }
    });
}

function modificarElementoCliente(idt, not, cor, cla, eda) {
    $("#idCliente").val(idt);
    $("#nombre").val(not);
    $("#correo").val(cor);
    $("#clave").val(cla);
    $("#edad").val(eda);
}

function limpiarElementoCliente() {
    $("#idCliente").val("");
    $("#nombre").val("");
    $("#correo").val("");
    $("#clave").val("");
    $("#edad").val("");
}

//*****************************************************//
//                      MENSAJES                       //
//*****************************************************//

function traerInformacionMensaje() {
    $.ajax({
        url: serverURL + "Message/all",
        headers: { 'Access-Control-Allow-Origin': '*' },
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado4").empty();
            traerInformacionCliente();
            traerInformacionLib();
            mostrarRespuestaMensaje(respuesta);
            limpiarElementoMensaje();
        }
    });
}

function mostrarRespuestaMensaje(respuesta) {
    let tabla = "<table class='table'> <thead>";
    tabla += "<tr>";
    tabla += "<th scope='row'>" + "COD" + "</th>";
    tabla += "<th scope='row'>" + "MENSAJE" + "</th>";
    tabla += "<th scope='row'>" + "CLIENTE" + "</th>";
    tabla += "<th scope='row'>" + "LIBRO" + "</th>";
    tabla += "<th scope='row'>" + "</th>";
    tabla += "<th scope='row'>" + "</th>";
    tabla += "</tr>";

    for (i = 0; i < respuesta.length; i++) {
        tabla += "<tr>";
        tabla += "<td scope='row'>" + respuesta[i].idMessage + "</td>";
        tabla += "<td scope='row'>" + respuesta[i].messageText + "</td>";
        tabla += "<td scope='row'>" + verificarMenClie(respuesta[i].client) + "</td>";
        tabla += "<td scope='row'>" + verificarMenCudri(respuesta[i].lib) + "</td>";
        tabla += "<td scope='row'> <button class='btn btn-link btn-sm' onclick='borrarElementoMensaje(" + respuesta[i].idMessage + ")'><img src='./images/delete.png' width='20px' height='20px'></td>";
        tabla += "<td scope='row'> <button class='btn btn-link btn-sm' onclick='modificarElementoMensaje(" + respuesta[i].idMessage + "," + '"' + respuesta[i].messageText + '"' + "," + '"' + respuesta[i].client.idClient + '"' + "," + '"' + respuesta[i].lib.id + '"' + ")'><img src='./images/edit.png' width='20px' height='20px'></button></td>"
        tabla += "</tr>";
    }
    tabla += "</thead> </table> ";
    $("#resultado4").append(tabla);
}

function verificarMenClie(respuesta) {
    if (!respuesta) {
        estado = "--"
    }
    else estado = respuesta.name
    return estado;
}

function verificarMenCudri(respuesta) {
    if (!respuesta) {
        estado = "--"
    }
    else estado = respuesta.name
    return estado;
}

function guardarInformacionMensaje() {
    let datos = {
        idMessage: $("#idMensajes").val(),
        messageText: $("#texMensaje").val(),
        client: { idClient: +$("#relacion-cliente").val() },
        lib: { id: +$("#relacion-libro").val() },
    };

    $.ajax({
        type: "POST",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: serverURL + "Message/save",
        success: function (respuesta) {
            $("#idMensajes").val("");
            $("#texMensaje").val("");
            traerInformacionMensaje();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
        }
    });
}

function editarInformacionMensaje() {
    let datos = {
        idMessage: $("#idMensajes").val(),
        messageText: $("#texMensaje").val(),
        client: { idClient: +$("#relacion-cliente").val() },
        lib: { id: +$("#relacion-libro").val() },
    };

    $.ajax({
        type: "PUT",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: serverURL + "Message/update",
        success: function (respuesta) {
            $("#idMensajes").val("");
            $("#texMensaje").val("");
            traerInformacionMensaje();
        }
    });
}

function borrarElementoMensaje(idElemento) {
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: serverURL + "Message/" + idElemento,
        success: function (respuesta) {
            $("#resultado4").empty();
            traerInformacionMensaje();
        }
    });
}

function modificarElementoMensaje(idMen, men, idCli, idLib) {
    $("#idMensajes").val(idMen);
    $("#texMensaje").val(men);
    $("#relacion-cliente").val(idCli);
    $("#relacion-libro").val(idLib)

}

function limpiarElementoMensaje() {
    $("#idMensajes").val("");
    $("#texMensaje").val("");
    $("#nomCliente").val("");
    $("#nomLibro").val("");
    $("#idCliente").val("");
    $("#idLib").val("");
    $("#relacion-cliente").val("");
    $("#relacion-libro").val("");
}

//*****************************************************//
//                     LIBROS                    //
//*****************************************************//

function variableLib(respuesta) {
    $("#relacion-libro").empty();
    let $varLib = $("#relacion-libro");
    $.each(respuesta, function (id, lib) {
        $varLib.append('<option value=' + lib.id + '>' + lib.name + '</option>');
    });
}

function traerInformacionLib() {
    $.ajax({
        url: serverURL + "Lib/all",
        headers: { 'Access-Control-Allow-Origin': '*' },
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            $("#resultado2").empty();
            mostrarRespuestaLib(respuesta);
            TraerInformacionCategoria();
            variableLib(respuesta);
            limpiarElementoCuadri();
        }
    });
}

function mostrarRespuestaLib(respuesta) {
    let tabla = "<table class='table'> <thead>";
    tabla += "<tr>";
    tabla += "<th scope='row'>" + "COD" + "</th>";
    tabla += "<th scope='row'>" + "NOMBRE" + "</th>";
    tabla += "<th scope='row'>" + "OBJETIVO" + "</th>";
    tabla += "<th scope='row'>" + "CAPACIDAD" + "</th>";
    tabla += "<th scope='row'>" + "DESCRIPCIÓN" + "</th>";
    tabla += "</tr>";

    for (i = 0; i < respuesta.length; i++) {
        tabla += "<tr>";
        tabla += "<td scope='row'>" + respuesta[i].id + "</td>";
        tabla += "<td scope='row'>" + respuesta[i].name + "</td>";
        tabla += "<td scope='row'>" + respuesta[i].name + "</td>";
        tabla += "<td scope='row'>" + respuesta[i].year + "</td>";
        tabla += "<td scope='row'>" + respuesta[i].description + "</td>";
        tabla += "<td scope='row'>" + respuesta[i].category.name + "</td>";
        tabla += "<td scope='row'>" + verificarEstado(respuesta[i].reservations) + "</td>";
        tabla += "<td scope='row'> <button class='btn btn-link btn-sm' onclick='borrarElementoCuadri(" + respuesta[i].id + ")'><img src='./images/delete.png' width='20px' height='20px'></td>";
        tabla += "<td scope='row'> <button class='btn btn-link btn-sm' onclick='modificarElementoCuadri(" + respuesta[i].id + "," + '"' + respuesta[i].name + '"' + "," + '"' + respuesta[i].brand + '"' + "," + '"' + respuesta[i].year + '"' + "," + '"' + respuesta[i].description + '"' + "," + '"' + respuesta[i].category.id + '"' + ")'><img src='./images/edit.png' width='20px' height='20px'></button></td>"
        tabla += "</tr>";
    }
    tabla += "</thead> </table> ";
    $("#resultado3").append(tabla);
}

function guardarInformacionCuadri() {
    let datos = {
        id: $("#idLib").val(),
        name: $("#nombre").val(),
        brand: $("#objetivo").val(),
        year: $("#capacidad").val(),
        description: $("#descripcion").val(),
        category: { id: +$("#relacion-categoria").val() },
    };

    $.ajax({
        type: "POST",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: serverURL + "Lib/save",
        success: function (respuesta) {
            $("#idLib").val("");
            $("#nombre").val("");
            $("#objetivo").val("");
            $("#capacidad").val("");
            $("#descripcion").val("");
            traerInformacionLib();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
        }
    });
}

function editarInformacionCuadri() {
    let datos = {
        id: $("#idLib").val(),
        name: $("#nombre").val(),
        target: $("#objetivo").val(),
        capacity: $("#capacidad").val(),
        description: $("#descripcion").val(),
        category: { id: +$("#relacion-categoria").val() },
    };

    $.ajax({
        type: "PUT",
        contentType: "application/JSON; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(datos),
        url: serverURL + "Lib/update",
        success: function (respuesta) {
            $("#idLib").val("");
            $("#nombre").val("");
            $("#objetivo").val("");
            $("#capacidad").val("");
            $("#descripcion").val("");
            $("#relacion-categoria").val("");
            traerInformacionLib();
        }
    });
}

function borrarElementoCuadri(idElemento) {
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: serverURL + "Lib/" + idElemento,
        success: function (respuesta) {
            $("#resultado2").empty();
            traerInformacionLib();
        }
    });
}

function modificarElementoCuadri(idc, nom, mar, ano, dec, catid) {
    $("#idLib").val(idc);
    $("#nombre").val(nom);
    $("#objetivo").val(mar);
    $("#capacidad").val(ano);
    $("#descripcion").val(dec);
    $("#relacion-categoria").val(catid);
}

function limpiarElementoCuadri() {
    $("#idLib").val("");
    $("#nombre").val("");
    $("#objetivo").val("");
    $("#capacidad").val("");
    $("#descripcion").val("");
    $("#relacion-categoria").val("");
}





























































































