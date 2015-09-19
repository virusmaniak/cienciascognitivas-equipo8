## Guia del Sistema ##
  * Introducción a la estructura del sistema.
  * Detalle de los módulos contenidos en el scripting del servidor.
  * Scripts disponibles para el diseño de las páginas del programa.
  * Direcciones HTML a las que las paginas deben llamar para que el sistema interprete las llamadas correctamente.

## Introducción ##

El programa está estructurado por módulos, cada uno con una función especifica. Por ejemplo el módulo del programa de memoria, contiene todo lo relacionado a desplegar las páginas que tienen que ver con la sección de ejercicios de memoria del programa. Cada módulo está representado en el código por un archivo .py. Los módulos contienen clases, donde cada clase es responsable de servir un tipo de página en el sitio, excepto en el módulo 'userModel.py', donde cada clase representa una tabla en la base de usuarios del programa.

Los directorios de 'imagenes', 'scripts' y 'Style', contienen elementos para el navegador que se mandan al navegador directamente sin procesar. En el directorio de 'Paginas' están los templates de los distintos tipos de páginas que se muestran. Los templates no son la página que se muestra en sí, sino que son procesadas primero por una clase dentro de un módulo. Más de una clase pueden utilizar un mismo template, si lo van a procesar distinto.

## Detalles de los módulos ##

### Main.py ###
Este módulo es responsable del funcionamiento general del programa. No tiene una tarea en específico relacionada al programa de memoria y de los juegos, sino que su tarea es de soporte. Valida a los usuarios, despliega la página inicial, los menús, permite al usuario configurar su nombre y edad, despliega el historial de resultados.

### Games.py ###
Este módulo permite al usuario a acceder a los juegos del programa sin tener que estar contestando preguntas de memoria.

### Memoria.py ###
Este módulo les da a los usuarios una serie de datos a memorizar, luego inicia unos juegos durante los cuales se les hacen preguntas a los usuarios.  Al final, se les pregunta por ultima vez los datos y se guarda la retención de los datos que se les enseñó.

### userModel.py ###
Este módulo tiene las clases que representan las tablas en la base de datos

## Scripts ##
Cada juego tiene sus propios scripts. Existen 3 scripts diseñados para ser accesados desde los 3 juegos. Los scripts son:

### navegacion.js ###
Este script contiene un método para convertir links en las páginas del sitio a botones con las imagenes de botones estandarizadas a lo largo del sitio y con comportamiento de botones al momento de interactuar con los botones. Se pide que se utilice este script para permitir una mayor estandarización y centralizar los puntos en los que se tendría que hacer un cambio si se quiere modificar el diseño de los botones.

### preguntas.js ###
Este script es especial para los juegos del programa, y se utiliza cuando se entra a los juegos através del módulo de Memoria. Es importante que todos los juegos llamen a este Script de manera que el servidor pueda decidir si se van a mostrar las preguntas o no y de esta forma reutilizar el código de los juegos para los módulos de memoria y actividades de entretenimiento.


## Direcciones HTML ##
Dado a que el programa en python procesa todas las peticiones utilizando el sistema de módulos, las direcciones de los directorios del proyecto no son un match directo con las direcciones que el programa aparenta tener en el navegador. La estructura de los directorios desde HTML tiene la siguiente forma:
  * /style/   <- En este directorio están todas las hojas CSS que están en la carpeta 'Style' del directorio del código.
  * /scripts/ <- En este directorio están todos los javascripts que están en la carpeta 'scripts' del directorio del código.
  * /games/ <- En este directorio están las páginas generadas por el módulo 'games.py'
  * /memoria/ <- En este directorio están las páginas generadas por el módulo 'memoria.py'