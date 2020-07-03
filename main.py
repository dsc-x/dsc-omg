import webapp2

class SlashRedirect(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    self.redirect('//' + self.request.host + '/io/')

class Ioxkl19(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'dscomg20'):
        self.redirect('#')
    else:
        self.redirect('//' + self.request.host + '/io/' + '/'.join(path[2:]))

class Io19extended(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'dscomg20'):
        self.redirect('#')
    else:
        self.redirect('//' + self.request.host + '/io/' + '/'.join(path[2:]))

class Io2019(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'dscomg20'):
        self.redirect('#')
    else:
        self.redirect('//' + self.request.host + '/io/' + '/'.join(path[2:]))

class Io19(webapp2.RequestHandler):
  def get(self, *args, **kwargs):
    path = self.request.path_qs.split('/')
    if (path[1] != 'dscomg20'):
        self.redirect('#')
    else:
        self.redirect('#')

