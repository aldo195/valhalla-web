from flask import Blueprint, request, jsonify, g
from sqlalchemy.exc import IntegrityError
import logbook

from ...core.models import db, User
from ...utils.auth import generate_token, verify_token, requires_auth

logger = logbook.Logger(__name__)

user_api = Blueprint('user', __name__)


@user_api.route('/get', methods=['GET'])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)


@user_api.route('/register', methods=['POST'])
def register():
    incoming = request.get_json()

    # Find server & token.
    email = incoming['email']
    password = incoming['password']

    # Add the user.
    user = User(name=incoming['name'], email=email, password=password)
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify({
            'error': {
                'title': 'User Registration Failed',
                'details': 'A user with that email already exists'
            }
        }), 409

    new_user = User.query.filter_by(email=email).first()
    logger.info(f'Created new user: {email}')

    return jsonify(token=generate_token(new_user, remember=False))


@user_api.route('/login', methods=['POST'])
def login():
    incoming = request.get_json()
    email = incoming['email']
    user = User.get_user_with_email_and_password(email, incoming['password'])
    if user:
        logger.debug(f'User {email} logged in')
        return jsonify(token=generate_token(user, remember=incoming['remember']))

    return jsonify({
        'error': {
            'title': 'Authentication Error',
            'details': 'Invalid email or password'
        }
    }), 403


@user_api.route('/validate', methods=['POST'])
def validate_token():
    incoming = request.get_json()
    is_valid = verify_token(incoming['token'])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify({
            'error': {
                'title': 'Authentication Error',
                'details': 'Invalid token'
            }
        }), 403
