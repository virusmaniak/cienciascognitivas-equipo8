#!/usr/bin/env python
# encoding: utf-8

import wsgiref.handlers

from google.appengine.ext import db


class registroDeUsuario(db.Model):
    usuario = db.UserProperty()
    nombre = db.StringProperty()
    edad = db.StringProperty()

class registroDeActividad(db.Model):
    usuario = db.UserProperty(required=True)
    #fecha
    aciertos = db.IntegerProperty(required=True, default=0)
    preguntas = db.IntegerProperty(required=True, default=0)
    
    