#!/usr/bin/env python
# encoding: utf-8

import wsgiref.handlers

from google.appengine.ext import db
# TODO: Validar el formato de la base de datos, el registro de Actividad

class registroDeUsuario(db.Model):
    #info del usuario:
    usuario = db.UserProperty()
    nombre = db.StringProperty()
    edad = db.StringProperty()
    #info del ultimo juego:
    tipoDePreguntas = db.IntegerProperty()
    datos = db.StringProperty()
    img1 = db.IntegerProperty()
    img2 = db.IntegerProperty()
    img3 = db.IntegerProperty()
    

class registroDeActividad(db.Model):
    usuario = db.UserProperty()
    fecha = db.DateProperty()
    aciertos = db.IntegerProperty(required=True, default=0)
    preguntas = db.IntegerProperty(required=True, default=0)
