import os
from pathlib import Path

DEBUG = (os.getenv('VALHALLAWEB_DEBUG') or '1') == '1'

PROJECT_FOLDER = Path(__file__).parent.parent.parent
FRONTEND_FOLDER = PROJECT_FOLDER.joinpath('frontend')
BUILD_FOLDER = FRONTEND_FOLDER.joinpath('build')
STATIC_FOLDER = str(BUILD_FOLDER)

APP_SECRET_KEY = os.urandom(24)
USER_EXPIRATION_SECONDS = 1209600  # 2 weeks.

TEMP_FOLDER = os.getenv('VALHALLAWEB_TEMP_DIR') or '/tmp'
LOG_FILE_PATH = os.getenv('VALHALLAWEB_LOG_FILE_PATH') or 'valhallaweb.log'


# Flask settings.
class FlaskConfig(object):
    SECRET_KEY = APP_SECRET_KEY
    SQLALCHEMY_DATABASE_URI = os.getenv('DB_URL') or 'sqlite:///valhallaweb.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
