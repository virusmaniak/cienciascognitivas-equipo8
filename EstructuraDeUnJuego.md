# Introducción #
Cuando se va a desarrollar un juego, se puede tomar todas las libertades que el desarrollador quiera para usar el HTML y javascript. Lo único importante es que se respete un mínimo de estructura, de forma tal que se pueda correr dentro de los juegos el módulo de preguntas.


# Esqueleto del HTML #
```
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title> Nombre del juego </title>
    <script type="text/javascript" src="/scripts/jquery.js"></script>
    <script type="text/javascript" src="/scripts/navegacion.js"></script>
    <script type="text/javascript">
        var hacerPreguntas = {{ hacerPreguntas }};
        var img1 = {{ img1 }};
        var img2 = {{ img2 }};
        var img3 = {{ img3 }};
	var preguntaDatos= {{ datos}};
	var tipoDePreguntas= {{ tipoDePreguntas }};
    </script>
    <script type="text/javascript" src="/scripts/preguntas.js"></script>
    <style type="text/css">
	<!--
		@import url("/style/web.css");

	-->
    </style>
</head>
<body>

</body>
</html>
```

# Observaciones #
  * El div con las variables 'hacerPreguntas, img1, img2, img3, preguntaDatos, tipoDePreguntas' se va a llenar por el servidor de acuerdo y son variables que necesita el script 'preguntas.js'. Para el significado de estas variables checar la Guía general del Sistema, donde se explican las variables de templates y lo que cada una representa.
  * Es importante asegurarse de importar los scripts en orden. Primero se debe de importar el script 'jquery.js', seguido por 'navegacion.js', en tercer lugar se pone el script con las variables para hacer preguntas y finalmente se pone el script 'preguntas.js'