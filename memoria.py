#!/usr/bin/env python
# encoding: utf-8
"""
games.py

Created by Salvador Gonzalez on 2008-10-06.
Copyright (c) 2008 __MyCompanyName__. All rights reserved.
"""

import wsgiref.handlers
import os
import random
import datetime

from google.appengine.api import users
from google.appengine.ext.webapp import template
from google.appengine.ext import webapp
from google.appengine.ext import db
from userModel import registroDeUsuario
from userModel import registroDeActividad

    
class Start(webapp.RequestHandler):
    """
    Muestra las figuras o datos al usuario para memorizar y les permite escoger el juego
    """
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect('/')
            return

        registro = db.GqlQuery("SELECT * FROM registroDeUsuario WHERE usuario = :1", user).get()
    
        random.seed()
        stringDato = u"""
        [
        ["Cristobal Colon descubrió America","Cristobal ______ descubrio America", "Colon", "alternativa1", "alternativa2"],
		["El tec fue fundado por Eugenio Garza Sada","El ____ fue fundado por Eugenio Garza Sada", "tec", "alternativa1","alternativa2"]
		]
		"""
        registro.tipoDePreguntas = random.randint(1,2)
        registro.datos = stringDato
        registro.img1 = random.randint(1,15)
        registro.img2 = random.randint(1,15)
        registro.img3 = random.randint(1,15)
    
        registro.put()
    
        template_values = {
            'nombre': registro.nombre,
            'return_url': '/menu',
            'sudoku_url': '/memoria/juegos/sudoku',
            'memorama_url': '/memoria/juegos/memorama',
            'crucigrama_url': '/memoria/juegos/crucigrama',
            'tipoDePreguntas': registro.tipoDePreguntas,
            'datos': registro.datos,
            'img1': registro.img1,
            'img2': registro.img2,
            'img3': registro.img3
        }
        path = os.path.join(os.path.dirname(__file__), 'Paginas/inicio.html')
        self.response.out.write(template.render(path, template_values))


class Juegos(webapp.RequestHandler):
    """
    Carga un juego, genera el html de forma que si se hagan preguntas al usuario
    de acuerdo a como se generaron en el menu pricipal y se guardaron en la base
    de datos.
    """
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect('/')
            return

        registro = db.GqlQuery("SELECT * FROM registroDeUsuario WHERE usuario = :1", user).get()

        template_values = {
            'nombre': registro.nombre,
            'return_url': '/memoria',
            'siguiente_url': '/memoria/end',
            'titulo': 'Error',
            'redirect_url': '/memoria',
            'mensaje': 'El juego no pudo ser cargado',
            'hacerPreguntas': 'true',
            'tipoDePreguntas': registro.tipoDePreguntas,
            'datos': registro.datos,
            'img1': registro.img1,
            'img2': registro.img2,
            'img3': registro.img3
        }
    
        template_url = 'Paginas/mensaje.html'
    
        if self.request.uri.endswith("memorama"):
            template_url = 'Paginas/memorama.html'
        if self.request.uri.endswith("crucigrama"):
            template_url = 'Paginas/crucigrama.html'
        if self.request.uri.endswith("sudoku"):
            template_url = 'Paginas/sudoku.html'
    
        path = os.path.join(os.path.dirname(__file__), template_url)
        self.response.out.write(template.render(path, template_values))



def main():
    application = webapp.WSGIApplication([('/memoria/juegos.*', Juegos),
                                            ('/memoria', Start)], debug=True)
    wsgiref.handlers.CGIHandler().run(application)

if __name__ == '__main__':
    main()
