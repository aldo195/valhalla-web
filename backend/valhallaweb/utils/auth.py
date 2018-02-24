from functools import wraps

from flask import request, jsonify
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, SignatureExpired, BadSignature

from .. import config
from ..orm.user import User


def generate_token(user, remember=False):
    expiration = config.USER_EXPIRATION_SECONDS if remember else None
    s = Serializer(config.APP_SECRET_KEY, expires_in=expiration)
    token = s.dumps({
        'email': user.email,
        'role': user.role.value
    }).decode('utf8')
    return token


def verify_token(token):
    s = Serializer(config.APP_SECRET_KEY)
    try:
        data = s.loads(token)
    except (BadSignature, SignatureExpired):
        return None
    return data


def requires_auth(roles_list):
    """
    A role validation decorator.
    First, login token will be validated and the user fetched.
    Then, the user role will be validated against the given roles list.
    """

    def auth_decorator(f):
        
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.headers.get('Authorization')
            if token:
                string_token = token.encode('ascii', 'ignore')
                user = verify_token(string_token)
                if user:
                    # Fetch actual user object from the DB.
                    user_object = User.query.filter_by(email=user['email']).first()
                    if user_object.role in roles_list:
                        return f(*args, current_user=user_object, **kwargs)

            return jsonify({
                'error': {
                    'title': 'Unauthorized Access',
                    'details': 'Authentication is required to access this resource'
                }
            }), 401

        return decorated

    return auth_decorator
