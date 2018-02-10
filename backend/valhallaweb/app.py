import sys

from flask import Flask, request
from flask_cors import CORS
import logbook

from valhallaweb import config
from valhallaweb.gunicorn_conf import host, port
from valhallaweb.api.v1.user import user_api
from valhallaweb.api.v1.organization import organization_api
from valhallaweb.api.v1.rule import rule_api
from valhallaweb.views import app_views
from valhallaweb.redirect_views import redirect_views
from valhallaweb.common import db, bcrypt

logger = logbook.Logger(__name__)

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
app.register_blueprint(organization_api, url_prefix='/api/v1/organization')
app.register_blueprint(rule_api, url_prefix='/api/v1/rule')

with app.app_context():
    db.create_all()


@app.errorhandler(Exception)
def error_handler(ex):
    logger.exception('An error has occurred! ({} {} {} {})'.format(
        request.remote_addr, request.method, request.scheme, request.full_path))
    return 'Internal Server Error', 500


def main():
    logbook.StreamHandler(sys.stdout).push_application()
    app.run(host, port)


if __name__ == '__main__':
    main()
