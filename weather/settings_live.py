from .settings import *
import django_heroku
import dj_database_url


django_heroku.settings(locals())

DATABASES['default'] = dj_database_url.config(default=os.environ.get('DATABASE_URL'))
