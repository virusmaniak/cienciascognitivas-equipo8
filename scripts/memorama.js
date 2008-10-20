var countOpen = 0;
var pairsLeft;
var open1;
var open2;
var cols;
var rows;
var arrayV;

function hide(elemento){
    elemento.css("background", "blue")
            .css("color", "blue")
            .find("img").css("visibility", "hidden");
}

function show(elemento){
    elemento.css("background", "white")
            .css("color", "black")
            .find("img").css("visibility", "visible");
}

function doneElement(elemento){
    elemento.css("background", "white")
            .css("visibility", "hidden")
            .css("color", "white")
            .css("border-style", "none")
            .find("img").css("visibility", "hidden");
}

function matchFormat(elemento){
    elemento.css("border-color", "red")
            .css("background-color", "white")
            .css("border-width", "2px")
            .css("color", "black")
            .find("img").css("visibility", "visible");
}

function openCard() {
    countOpen++;
    if (countOpen == 1){
        open1 = $(this);
    } else if (countOpen == 2) {
        if (open1.attr("id") == $(this).attr("id")){
            countOpen--;
            return;
        }
        open2 = $(this);
        
        if (open1.find("img").attr("src") == $(this).find("img").attr("src")){
            matchFormat(open1);
            matchFormat(open2);
            setTimeout(function(){
               doneElement(open1);
               doneElement(open2);
               countOpen = 0;
               if(--pairsLeft <= 0){
                   finishedMemorama();
               }
            }, 1000);
            return;
        }
        
        setTimeout(function(){
            hide(open1);
            hide(open2);
            countOpen = 0;
            }, 2000);
    }
    if (countOpen <= 2){
        show($(this));
    }
}

function finishedMemorama(){
    hacerPreguntas = false;
    $("#memorama").css("visibility", "hidden");
    $("#finishScreen").css("visibility", "visible");
}

function makeDiv(col, row){
    //alert("col" +col + "row"+ row);
    return "<div id=\"elem" + col + row + "\">" + 
            "<img src=\"/imagenes/" + arrayV[col-1][row-1] + "m.jpg\"></div>";
}

function formatCell(col, row){
    cell = $(("#elem" + col + "" + row));
    top = (row-1) * 100;
    left = (col-1) * 100;
    cell.css("width", "80px")
        .css("height", "80px")
        .css("position", "absolute")
        .css("margin", "10px")
        .css("top", (top + "px"))
        .css("left", (left + "px"))
        .css("border-style", "solid")
        .css("border-width", "1px")
        .css("border-color", "black")
        .css("text-shadow", "2px 2px 3px blue")
        .css("text-align", "center")
        .css("font-weight", "bold")
        .css("font-size", "60px")
        .css("font-family", "Helvetica, Verdana, Arial, sans-serif");
    cell.find("img").attr("width", "80")
                    .attr("height", "80")
                    .css("visibility", "hidden");
        
}

function loadMemorama(){
    if ( hacerPreguntas ){
        startPreguntas();
    }
    
    $("#ventana").css("visibility", "hidden");
    $("#memorama").html("");
    $("#memorama").css("visibility", "visible")
                  .css("position", "absolute")
                  .css("border-style", "solid")
                  .css("border-width", "3px")
                  .css("width", ((cols * 100 + 5)+"px"))
                  .css("height", ((rows * 100 + 5)+"px"))
                  .css("top", "5%");
    
    $("#bienvenida").css("visibility", "hidden");
    
    arrayV = new Array (cols);
    for (i = 0; i < cols; i++){
        arrayV[i] = new Array (rows);
        for (j = 0; j<rows; j++) arrayV[i][j] = 0;
    }
    
    cont = 1;
    pair = 0;
    loop = 0;
    pairsLeft = cols*rows/2;
    while (cont <= pairsLeft){
        if (loop++ > 300){
            alert("help! to much loops"); break; //DEBUG
        }
        x = Math.floor(Math.random()*cols);
        y = Math.floor(Math.random()*rows);
        if (arrayV[x][y] == 0){
            arrayV[x][y] = cont;
            pair++;
            if (pair >= 2){
                cont++;
                pair = 0;
            }
        }
    }
    
    for (i = 1; i<= cols; i++){
        for (j = 1; j<=rows; j++){
            $("#memorama").append( makeDiv(i,j) );
            formatCell(i,j);
            //alert("created " +i+j);
            hide($(("#elem" + i + "" + j)));
            $(("#elem" + i + "" + j)).click( openCard );
        }
    }
}

function startPage(){
    $("#memorama").css("visibility", "hidden");
    $("#finishScreen").css("visibility", "hidden");
    $("#bienvenida").css("position", "absolute")
                    .css("width", "300px")
                    .css("height", "200px")
                    .css("border-style", "solid")
                    .css("border-width", "1px");
                    
    $("#facil").click( function(){
        cols = 4; rows = 3;
        loadMemorama();
    } );
    $("#medio").click( function(){
        cols = 5; rows = 4;
        loadMemorama();
    } );
    $("#dificil").click( function(){
        cols = 6; rows = 5;
        loadMemorama();
    } );

}

$(document).ready( startPage );