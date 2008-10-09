
var preguntasHechas = 0;
var tipoDePregunta = 0; // 1 Para color, 2 para forma
var aciertos = 0;
var preguntaColor = "De qué color es la figura número ";
var preguntaForma = "Qué forma tiene la figura número ";
var colores = new Array ("red", "blue", "yellow");

function makeDivPregunta(){
    tipoDePregunta = Math.floor(Math.random()*2 + 1);
    pregunta = "";
    if ( tipoDePregunta == 1 ){
        pregunta = preguntaColor;
    } else {
        pregunta = preguntaForma;
    }
    num = Math.floor( Math.random()*3 + 1 );
    return "<div id=\"pregunta" + (++preguntasHechas) +
                            "\">¿" + pregunta + num + "?<br>" +
                            makeDivRespuesta(tipoDePregunta, num) + "</div>";
}

function makeDivRespuesta(tipoDePregunta, num){
    respuestas = ""
    for (i = 1; i<= 3; i++){
        respuestas += "<div id=\"pregunta" + preguntasHechas + "respuesta" + i + "\" title=\"";
        respuestas += colores[i]  +"\">" + " </div>";
    }
    return respuestas;
}

function formatDivPregunta(elemento){
    elemento.css("position", "absolute")
            .css("visibility", "visible")
            .css("z-index", "100")
            .css("width", "400px")
            .css("height", "200px")
            .css("background", "white")
            .css("top", "40%")
            .css("left", "20%")
            .css("border-style", "solid")
            .css("border-width", "1px")
            .css("border-color", "black")
            .css("text-shadow", "2px 2px 3px blue")
            .css("text-align", "center")
            .css("font-weight", "bold")
            .css("font-size", "40px")
            .css("font-family", "Helvetica, Verdana, Arial, sans-serif");
}

function formatDivRespuestas(){
    for (i = 1; i <= 3; i++){
        elemento = $("#pregunta" + preguntasHechas + "respuesta" + i);
        elemento.css("visibility", "visible")
                .css("width", "50px")
                .css("height", "50px")
                .css("background-color", colores[i-1]+"")
                .css("position", "absolute")
                .css("left", (i*80+20)+"px")
                .css("border-style", "solid")
                .css("border-width", "1px")
                .css("top", "100px");
    }
}

function mostrarPregunta(){
    div = makeDivPregunta();
    $("body").append(div);
    formatDivPregunta($("#pregunta" + preguntasHechas));
    formatDivRespuestas();
    $("#pregunta"+preguntasHechas).click( function() {
        $(this).css("visibility", "hidden");
        $(this).contents().each( function(){
           $(this).css("visibility", "hidden"); 
        });
        if (preguntasHechas < preguntasTotales){
            setTimeout( mostrarPregunta, 10000 );
        }
    });
}

function startPreguntas(){
    setTimeout( mostrarPregunta, 10000 );
}