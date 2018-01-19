import logbook
from flask import Blueprint, redirect

redirect_views = Blueprint('redirect_views', __name__)

logger = logbook.Logger(__name__)


@redirect_views.route('/<path:path>')
@redirect_views.route('/')
def redirect_all(path=''):
    return redirect(location="http://localhost:3000/" + path)
