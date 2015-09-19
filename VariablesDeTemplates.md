# Introducción #

Se usa en los htmls variables que llena el servidor, para que se pasen datos al programa al momento de generar el html. Para recuperar el contenido de una variable en el template se escribe doble llave '{{' y el nombre de la variable y luego se cierran las dos llaves '}}'.


# Variables #

## Variables generales a todas las páginas ##
  * _nombre_: El nombre que se tiene registrado del usuario. Si el usuario no tiene registrado su nombre la variable va a ser evaluada como vacío.
  * return\_url: Url para regresar a la página anterior, de donde viene el usuario.

## Variables en los juegos ##
  * _hacerPreguntas_: El contenido de esto se evalua en un string que puede ser 'true' o 'false'. Representa si se quiere invocar al módulo de hacer preguntas o no.
  * _tipoDePregunta_: Declara qué tipo de preguntas se están haciendo. Puede evaluarse en '1' o en '2'. Un uno simboliza que las preguntas van a ser de tipo **recordar imágenes**, y un dos simboliza que las preguntas van a ser de tipo **recordar dato**. Si _hacerPreguntas_ está en 'false', el contenido de esta variable puede ser cualquier cosa y debe ser ignorado.
  * _img **X**_: (Sin espacio entre la X y 'img') Cuando se están haciendo preguntas de tipo **recordar imágenes**, estas variables son evaluadas como un número del 1 al 15, que representa la imagen que fue mostrada, de acuerdo al arreglo de las imagenes '#m.jpg'. La **X** representa un número del 1 al 3 con la posición de la imágen. Ej img1 -> la primer imagen. Si el contenido de la variable _hacerPreguntas_ es 'false', o el contenido de _tipoDePregunta_ no es '1' el contenido de esta variable puede ser cualquier cosa y debe ser ignorado.
  * _datos_: Esta variable de template escribe un arreglo de 2 dimensiones con los contenidos de los datos. En la primer dimención arreglo[X](X.md), están multiples arreglos que tienen 2 contenidos, el dato y la palabra clave. La forma en que se podría ver este arrelgo sería [["Cristobal Colon descubrio America", "Colon](.md), ["El tec fue fundado por Eugenio Garza Sada", "tec] ]. Pese a que sigue el formato de javascript, no pone el punto y coma al final. Si el contenido de la variable _hacerPreguntas_ es 'false', o el contenido de _tipoDePregunta_ no es '2' el contenido de esta variable puede ser cualquier cosa y debe ser ignorado.
  * siguente\_url: Url para avanzar en el juego. Si es una Actividad de entretenimiento, siguiente\_url apunta al menu de Actividades de entretenimiento, si es parte del programa de memoria apunta a la fase final del programa.

### Variables de las alertas ###
  * _titulo_: Titulo del mensaje.
  * _mensaje_: Contenido del mensaje.
  * redirect\_url: Url a donde debe de ser redireccionado el usuario después de leer el mensaje.