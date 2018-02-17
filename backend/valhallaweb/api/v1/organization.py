import datetime as dt

from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
import logbook

from ...common import db
from ...orm.user import UserRole
from ...orm.organization import Organization
from ...utils.auth import requires_auth

logger = logbook.Logger(__name__)

organization_api = Blueprint('organization', __name__)


@organization_api.route('', methods=['GET'])
def get_organizations():
    logger.info('Fetching organizations...')
    return jsonify(organizations=[o.to_dict() for o in Organization.query.all()])


@organization_api.route('', methods=['POST'])
@requires_auth([UserRole.ADMIN])
def create_organization(current_user):
    incoming = request.get_json()
    title = incoming['title']

    # Add the organization.
    organization = Organization(title=title, owner_id=current_user.user_id, creation_time=dt.datetime.utcnow())
    db.session.add(organization)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify({
            'error': {
                'title': 'Organization Creation Failed',
                'details': 'An organization with that title already exists'
            }
        }), 409

    logger.info(f'Created a new organization: {title}')

    return jsonify(organization_id=organization.organization_id)
