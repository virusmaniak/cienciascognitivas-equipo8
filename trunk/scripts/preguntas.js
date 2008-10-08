
var preguntasHechas = 0;
var aciertos = 0;
var preguntaColor = "De qué color es la figura número ";
var preguntaForma = "Qué forma tiene la figura número ";

function makeDivPregunta(){
    pregunta = "";
    if ( Math.random() > .5 ){
        pregunta = preguntaColor;
    } else {
        pregunta = preguntaForma;
    }
    num = Math.floor( Math.random()*3 + 1 );
    return "<div id=\"pregunta" + (++preguntasHechas) +
                            "\">¿" + pregunta + num + "?</div>";
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
            .css("font-size", "60px")
            .css("font-family", "Helvetica, Verdana, Arial, sans-serif");
}

function mostrarPregunta(){
    div = makeDivPregunta();
    $("body").append(div);
    formatDivPregunta($("#pregunta" + preguntasHechas));
    $("#pregunta"+preguntasHechas).click( function() {
        $(this).css("visibility", "hidden");
        if (preguntasHechas < preguntasTotales){
            setTimeout( mostrarPregunta, 10000 );
        }
    });
}

function startPreguntas(){
    setTimeout( mostrarPregunta, 10000 );
}