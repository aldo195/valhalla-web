import sys

from flask import Flask
from flask_cors import CORS
import logbook

from valhallaweb import config
from valhallaweb.gunicorn_conf import host, port
from valhallaweb.api.v1.user import user_api
from valhallaweb.views import app_views
from valhallaweb.redirect_views import redirect_views
from valhallaweb.core.models import db, bcrypt

app = Flask(__name__.split('.')[0], static_folder=None)
app.config.from_object(config.FlaskConfig)
app.debug = config.DEBUG

db.init_app(app)
bcrypt.init_app(app)

if config.REDIRECT_TO_NODE_DEV_SERVER:
    app.register_blueprint(redirect_views)
    CORS(app)
else:
    app.register_blueprint(app_views)

app.register_blueprint(user_api, url_prefix='/api/v1/user')


if __name__ == '__main__':
    logbook.StreamHandler(sys.stdout).push_application()
    app.run(host, port)
