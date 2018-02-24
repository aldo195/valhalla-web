from flask import Blueprint, jsonify
import logbook

from ...orm.user import UserRole
from ...utils.auth import requires_auth

logger = logbook.Logger(__name__)

notification_api = Blueprint('notification', __name__)


@notification_api.route('', methods=['GET'])
@requires_auth([UserRole.USER, UserRole.ADMIN])
def get_notifications(current_user):
    logger.info(f'Fetching notifications for user: {current_user.email}...')
    return jsonify(notifications=[{'title': 'Test', 'description': 'Test notification'}])


@notification_api.route('', methods=['DELETE'])
@requires_auth([UserRole.USER, UserRole.ADMIN])
def clear_notifications(current_user):
    logger.info(f'Cleared notifications for user: {current_user.email} ')
    return jsonify(success=True)
