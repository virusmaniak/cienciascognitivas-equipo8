var botonesRegistrados = new Array();

function hacerBoton(url, objeto){

    for (i = 0; i < botonesRegistrados.length; i++) {
        if ( botonesRegistrados[i].html() == objeto.html()){
            return;
        }
    }
    
    botonesRegistrados.push (objeto);
    
    objeto.mousedown( function(){
        objeto.css("background-color", "#660000");
    });
    objeto.mouseout( function(){
        objeto.css("background-color", "#999999");
    })
    objeto.mouseup( function() {
        window.location = url;
    });
}