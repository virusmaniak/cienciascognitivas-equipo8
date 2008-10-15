
var preguntasHechas = 0;
var aciertos = 0;
var pregunta2 = "Qué figura no te pedimos recordar";
var pregunta1 = "Qué figuras te pedimos recordar? ";
var unoodos;
var lugar;

function makeDivPregunta(){
    if ( tipoDePreguntas == 1 ){
	    pregunta = "";
		respuestas="";
		lugar=Math.ceil(Math.random()*3);
        if(Math.random()>0.5){
			pregunta=pregunta1;
			unoodos=1;		
			for(i=1;i<=3;i++){
				x = 0;
				if(i==lugar){
					imagenres=Math.ceil(Math.random()*3);
					if(imagenres=1)
						x = img1;
					if(imagenres=2)
						x = img2;
					if(imagenres=3)
						x = img3;
				} else {
					do {
						x=Math.ceil(Math.random()*15);
					} while (img1 == x || img2 == x || img3 == x);
				}
				respuestas+="<img src='/imagenes/" + x + "m.jpg'>";
			}
		} else {
			pregunta=pregunta2;
			unoodos=2;
			usado=0;
				for(i=1;i<=3;i++){
				x = 0;
				if(i==lugar){
				do {
						x=Math.ceil(Math.random()*15);
					} while (img1 == x || img2 == x || img3 == x);
					
				} else {
					do{
					imagenres=Math.ceil(Math.random()*3);
					alert(imagenres + "-" + usado);
					
					} while(imagenres==usado);
					if(imagenres==1){
						x = img1;
						usado=1;
						}
					if(imagenres==2)
						x = img2;{
						usado=2;
						}
					if(imagenres==3){
						x = img3;
						usado=3;
						}
				}
				respuestas+="<img src='/imagenes/" + x + "m.jpg'>";
			}
			
		}
		return "<div id=\"pregunta" + (++preguntasHechas) +
                            "\">" + pregunta + "<br>" +
                            respuestas + "</div>";
    } else {
      //códigoparadatos
    }
    
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
    setTimeout( mostrarPregunta, 1000 );
}