#!/usr/bin/env python
# encoding: utf-8
"""
games.py

Created by Salvador Gonzalez on 2008-10-06.
Copyright (c) 2008 __MyCompanyName__. All rights reserved.
"""

import wsgiref.handlers
import os

from google.appengine.api import users
from google.appengine.ext.webapp import template
from google.appengine.ext import webapp
from google.appengine.ext import db
from userModel import registroDeUsuario

class GamesMenu(webapp.RequestHandler):
    """
    Clase que genera y manda el menu con los 3 juegos disponibles.
    """
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect('/')
            return
    
        registro = db.GqlQuery("SELECT * FROM registroDeUsuario WHERE usuario = :1", user).get()
    
        template_values = {
            'nombre': registro.nombre,
            'return_url': '/menu',
            'sudoku_url': '/games/sudoku',
            'memorama_url': '/games/memorama',
            'crucigrama_url': '/games/crucigrama'
        }
        path = os.path.join(os.path.dirname(__file__), 'Paginas/juegos.html')
        self.response.out.write(template.render(path, template_values))

class Juegos(webapp.RequestHandler):
    """
    Clase que genera y manda el juego que el usuario seleccione:
            - Sudoku, Memorama o Crucigrama.
    La clase carga el template del juego y le pone la variable de 
    javascript 'hacerPreguntas' igual a 'false'.
    """
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect('/')
            return

        registro = db.GqlQuery("SELECT * FROM registroDeUsuario WHERE usuario = :1", user).get()

        template_values = {
            'nombre': registro.nombre,
            'return_url': '/games',
            'titulo': 'Error',
            'redirect_url': '/games',
            'mensaje': 'El juego no pudo ser cargado',
            'hacerPreguntas': 'false',
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
    application = webapp.WSGIApplication([('/games/.*', Juegos),
                                            ('/games', GamesMenu)], debug=True)
    wsgiref.handlers.CGIHandler().run(application)

if __name__ == '__main__':
    main()
