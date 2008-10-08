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

# TODO: Clase que reciba los scores del usuario y los guarde en la base de datos

class Menu(webapp.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect('/')
            return
        
        registro = db.GqlQuery("SELECT * FROM registroDeUsuario WHERE usuario = :1", user).get()
        
        template_values = {
            'nombre': registro.nombre,
            'menu_url': '/menu',
            'sudoku_url': '/memoria/juegos/sudoku',
            'memorama_url': '/memoria/juegos/memorama',
            'crucigrama_url': '/memoria/juegos/crucigrama'
        }
        path = os.path.join(os.path.dirname(__file__), 'Paginas/juegos.html')
        self.response.out.write(template.render(path, template_values))
        
class Start(webapp.RequestHandler):
    # TODO: Hacer pagina que muestre al usuario algunas figuras y deje escoger un juego
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect('/')
            return

        registro = db.GqlQuery("SELECT * FROM registroDeUsuario WHERE usuario = :1", user).get()

        template_values = {
            'nombre': registro.nombre,
            'menu_url': '/menu',
            'sudoku_url': '/memoria/juegos/sudoku',
            'memorama_url': '/memoria/juegos/memorama',
            'crucigrama_url': '/memoria/juegos/crucigrama'
        }
        path = os.path.join(os.path.dirname(__file__), 'Paginas/juegos.html')
        self.response.out.write(template.render(path, template_values))

class End(webapp.RequestHandler):
    # TODO: Hacer pagina que haga preguntas finales, y muestre resultados
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect('/')
            return

        registro = db.GqlQuery("SELECT * FROM registroDeUsuario WHERE usuario = :1", user).get()

        template_values = {
            'nombre': registro.nombre,
            'menu_url': '/menu',
            'sudoku_url': '/memoria/juegos/sudoku',
            'memorama_url': '/memoria/juegos/memorama',
            'crucigrama_url': '/memoria/juegos/crucigrama'
        }
        path = os.path.join(os.path.dirname(__file__), 'Paginas/juegos.html')
        self.response.out.write(template.render(path, template_values))

class Juegos(webapp.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect('/')
            return

        registro = db.GqlQuery("SELECT * FROM registroDeUsuario WHERE usuario = :1", user).get()

        template_values = {
            'nombre': registro.nombre,
            'hacerPreguntas': 'true',
            'return_url': '/games',
            'titulo': 'Error',
            'redirect_url': '/games',
            'mensaje': 'El juego no pudo ser cargado'
        }
        
        template_url = 'Paginas/mensaje.html'
        
        if self.request.uri.endswith("memorama"):
            template_url = 'Paginas/memorama.html'
        if self.request.uri.endswith("sudoku"):
            template_url = 'Paginas/sudoku.html'
        
        path = os.path.join(os.path.dirname(__file__), template_url)
        self.response.out.write(template.render(path, template_values))

def main():
    application = webapp.WSGIApplication([('/memoria/juegos.*', Juegos),
                                            ('/memoria/start', Start),
                                            ('/memoria/end', End),
                                            ('/memoria', Menu)], debug=True)
    wsgiref.handlers.CGIHandler().run(application)

if __name__ == '__main__':
    main()
