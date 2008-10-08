#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#




import wsgiref.handlers
import os

from google.appengine.api import users
from google.appengine.ext.webapp import template
from google.appengine.ext import webapp
from google.appengine.ext import db
from userModel import registroDeUsuario

class MainHandler(webapp.RequestHandler):

    def get(self):
        if users.get_current_user():
            self.redirect('/menu')
            return
            
        template_values = {
            'login_url': users.create_login_url(self.request.uri)
        }
        path = os.path.join(os.path.dirname(__file__), 'Paginas/index.html')
        self.response.out.write(template.render(path, template_values))

class MainMenu(webapp.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect('/')
            return
        
        if db.GqlQuery("SELECT * FROM registroDeUsuario WHERE usuario = :1", user).count() <= 0:
            registro = registroDeUsuario()
            registro.usuario = user
            registro.nombre = ''
            registro.put()
        
        registro = db.GqlQuery("SELECT * FROM registroDeUsuario WHERE usuario = :1", user).get()
        
        template_values = {
            'nombre': registro.nombre,
            'logout_url': users.create_logout_url(self.request.uri),
            'programa_memoria_url': '/memoria',
            'actividades_url': '/games',
            'marcador_url': '/resultados',
            'userInfo_url': '/usuario'
        }
        
        path = os.path.join(os.path.dirname(__file__), 'Paginas/main_menu.html')
        self.response.out.write(template.render(path, template_values))

class UserInfo(webapp.RequestHandler):
    post = False
    def post(self):
        user = users.get_current_user()
        registro = db.GqlQuery("SELECT * FROM registroDeUsuario WHERE usuario = :1", user).get()
        registro.nombre = self.request.get("nombre")
        registro.edad = self.request.get("edad")
        registro.put()
        template_values = {
            'titulo': 'Cambios realizados',
            'mensaje': 'Los cambios han sido realizados.',
            'redirect_url': '/menu'
        }
        
        path = os.path.join(os.path.dirname(__file__), 'Paginas/mensaje.html')
        self.response.out.write(template.render(path, template_values))
    
    def get(self):
        if self.post:
            mensaje = 'Cambios realizados'
            self.post = False
            
        user = users.get_current_user()
        registro = db.GqlQuery("SELECT * FROM registroDeUsuario WHERE usuario = :1", user).get()
        template_values = {
            'nombre': registro.nombre,
            'edad': registro.edad,
            'return_url': '/menu'
        }
        
        path = os.path.join(os.path.dirname(__file__), 'Paginas/userInfo.html')
        self.response.out.write(template.render(path, template_values))
        
def main():
  application = webapp.WSGIApplication([('/', MainHandler), ('/menu', MainMenu),
                                    ('/usuario', UserInfo)], debug=True)
  wsgiref.handlers.CGIHandler().run(application)


if __name__ == '__main__':
  main()
