var botonesRegistrados = new Array();

function hacerBoton(url, objeto){
    if(objeto.attr("id")=="botones") {
        objeto.css("background-image", "url(../imagenes/mouseOver.png)");
    }
    
    for (i = 0; i < botonesRegistrados.length; i++) {
        if ( botonesRegistrados[i].html() == objeto.html()){
            return;
        }
    }
    
    botonesRegistrados.push (objeto);
    
    objeto.mousedown( function(){
        if (objeto.attr("id") == "botones"){
            objeto.css("background-image", "url(../imagenes/botonPressed.png)");
        }
    });
    objeto.mouseout( function(){
        if (objeto.attr("id") == "botones"){
            objeto.css("background-image", "url(../imagenes/boton2.png)");
        }
    })
    objeto.mouseup( function() {
        window.location = url;
    });
}