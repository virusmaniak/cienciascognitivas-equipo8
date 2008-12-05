//DEFINICIONES
var timeOut = 6000;
var botonesRegistrados = new Array();

var preguntasHechas = 0;
var aciertos = 0;
var pregunta2 = "¿Qué figura no te pedimos recordar?";
var pregunta1 = "¿Qué figura te pedimos recordar? ";
var unoodos;
var lugar;
var datoNum;

function makeDivPregunta(){
    // Crear el recuadro con la pregunta
    if ( tipoDePreguntas == 1 ) {
        // Pregunta de tipo imagen
	    pregunta = "";
		respuestas="";
		lugar=Math.ceil(Math.random()*3);
        if(Math.random()>0.5){
            // Preguntar que figura no se pide recordar
			pregunta=pregunta1;
			unoodos=1;
			usado1=0;
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
					} while (img1 == x || img2 == x || img3 == x || x==usado1);
					usado1=x;
				}
				respuestas+="<img alt='" + i + "' src='/imagenes/" + x + "m.jpg'>";
			}
		} else {
		    // Preguntar que figura si esta en la lista de imagenes a recordar
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
					} while(imagenres==usado);
					if(imagenres==1){
						x = img1;
						usado=1;
						}
					if(imagenres==2){
						x = img2;
						usado=2;
						}
					if(imagenres==3){
						x = img3;
						usado=3;
						}
				}
				respuestas+="<img alt='" + i + "' src='/imagenes/" + x + "m.jpg'>";
			}
			
		}
		return "<div id=\"pregunta" + (++preguntasHechas) +
                            "\">" + pregunta + "<br>" +
                            respuestas + "</div>";
    } else {
        // Pregunta de tipo dato
        datoNum = Math.floor(Math.random() * preguntaDatos.length);
        respuesta = "<div id=\"pregunta" + (++preguntasHechas) + "\">";
        respuesta += preguntaDatos[datoNum][1] + "<br>";
        
        
        ordenDeBotones = new Array (preguntaDatos[datoNum].length - 2);
        for (i = 0; i < ordenDeBotones.length; i++){
            pos = 0;
            do {
                encontro = false;
                pos = Math.floor(Math.random()*ordenDeBotones.length);
                for (j = 0; j < i; j++){
                    if (ordenDeBotones[j] == pos)
                        encontro = true;
                }
            } while (encontro);
            ordenDeBotones[i] = pos;
            respuesta += "<div id='botonesJuego'>" + preguntaDatos[datoNum][ordenDeBotones[i]+2] + "</div>";
        }
        
        respuesta += "</div>";
        return respuesta;
    }
    
}

function formatDivPregunta(elemento){
    // Darle formato CSS al recuadro con la pregunta
    elemento.css("position", "absolute")
            .css("visibility", "visible")
            .css("z-index", "100")
            .css("width", "450px")
            .css("padding", "10px")
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

function recibirClickImagen(){
    // Recibir un click del boton en una imagen,
    // mostrar si el usuario acerto o no y guardar
    //el evento en el marcador
    
    $("#pregunta"+preguntasHechas).html("")
                                  .css("visibility", "hidden");
                                  
    caption = "";
    if ($(this).attr("alt") == ("" + lugar)){
        caption = "Correcto";
        aciertos++;
    } else {
        caption = "Incorrecto";
    }
    
    htmlResponse  = "<div id='responder" + preguntasHechas + "'>";
    htmlResponse += caption + "<br><img src='/imagenes/" + img1 +"m.jpg'>";
    htmlResponse += "<img src='/imagenes/" + img2 + "m.jpg'>";
    htmlResponse += "<img src='/imagenes/" + img3 + "m.jpg'></div>";
    $("body").append(htmlResponse);
    formatDivPregunta($("#responder"+ preguntasHechas));
    $("#responder"+preguntasHechas).click ( function (){
                                      $(this).css("visibility", "hidden");
                                      setTimeout( mostrarPregunta, timeOut );
                                  });
                                  
}

function prepararBotones (pregunta){
    // Darles comportamiento de boton a los datos,
    // que cambien su imagen segun su estado respecto al mouse
    pregunta.children().mousedown( function(){
        $(this).css("background-image", "url(/imagenes/botonPressed.png)");
    });
    pregunta.children().mouseout( function(){
        $(this).css("background-image", "url(/imagenes/boton2.png)");
    });
    pregunta.children().mouseover( function(){
        $(this).css("background-image", "url(/imagenes/mouseOver.png)");
    });
    
    // Mandar llamar al metodo de procesar los clicks
    pregunta.children().mouseup( recibirClickBotones );
}

function recibirClickBotones(){
    // Recibir un click del boton en un dato,
    // mostrar si el usuario acerto o no y guardar
    //el evento en el marcador
    $("#pregunta"+preguntasHechas).html("")
                                  .css("visibility", "hidden");
                                  
    caption = "";
    
    if ($(this).html() == preguntaDatos[datoNum][2]){
        caption = "Correcto";
        aciertos++;
    } else {
        caption = "Incorrecto";
    }
    
    htmlResponse  = "<div id='responder" + preguntasHechas + "'>";
    htmlResponse += caption + "<br>";
    htmlResponse += preguntaDatos[datoNum][0] + "</div>";
    $("body").append(htmlResponse);
    formatDivPregunta($("#responder"+ preguntasHechas));
    
    $("#responder"+preguntasHechas).click ( function (){
                                      $(this).css("visibility", "hidden");
                                      setTimeout( mostrarPregunta, timeOut );
                                  });
}

function mostrarPregunta(){
    // Crear un div con las preguntas y mostrarlo
    if (!hacerPreguntas){
        return;
    }
    div = makeDivPregunta();
    $("body").append(div);
    formatDivPregunta($("#pregunta" + preguntasHechas));
    if (tipoDePreguntas == 1){
        $("#pregunta" + preguntasHechas).children().click( recibirClickImagen );
    } else {
        prepararBotones($("#pregunta"+preguntasHechas));
    }
}

function startPreguntas(){
    // Crear un timer para empezar las preguntas
    setTimeout( mostrarPregunta, timeOut );
}