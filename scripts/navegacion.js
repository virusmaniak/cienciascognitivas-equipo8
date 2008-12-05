var botonesRegistrados = new Array();

function hacerBoton(url, objeto){
    // Crear un boton..
    
    // 1) Darle un fondo cuando el mouse pasa encima de él
    if(objeto.attr("id")=="botones") {
        objeto.css("background-image", "url(../imagenes/mouseOver.png)");
    }
    
    // Agregarlo a una lista de botones registrados para no
    // darle comportamientos de mouseDown y mouseOut muchas veces
    for (i = 0; i < botonesRegistrados.length; i++) {
        if ( botonesRegistrados[i].html() == objeto.html()){
            return;
        }
    }
    botonesRegistrados.push (objeto);
    
    
    // Comportamiento de mouseDown: Cambiar el color del boton
    objeto.mousedown( function(){
        if (objeto.attr("id") == "botones"){
            objeto.css("background-image", "url(../imagenes/botonPressed.png)");
        }
    });
    
    // Comportamiento de mouseOut: Regresar el boton a su estado normal
    objeto.mouseout( function(){
        if (objeto.attr("id") == "botones"){
            objeto.css("background-image", "url(../imagenes/boton2.png)");
        }
    });
    
    // Comportamiento de mouseUp: ir a la url que le corresponde al boton
    objeto.mouseup( function() {
        window.location = url;
    });
}