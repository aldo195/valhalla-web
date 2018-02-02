import datetime as dt

from flask import Blueprint, request, jsonify
import pendulum
import logbook

from ...common import db
from ...orm.rule import Rule, RuleStatus
from ...utils.auth import requires_auth

logger = logbook.Logger(__name__)

rule_api = Blueprint('rule', __name__)


@rule_api.route('/get', methods=['GET'])
@requires_auth
def get_rules(current_user):
    logger.info('Fetching rules...')
    rules = RuleStatus.query().\
        join(RuleStatus.rule).\
        filter(RuleStatus.organization_id == current_user.organization_id).\
        all()
    return jsonify(rules=rules)


@rule_api.route('/create', methods=['POST'])
@requires_auth
def create(current_user):
    incoming = request.get_json()
    title = incoming['title']

    # Add the rule.
    rule = Rule(title=title, description=incoming['description'], test_logic=incoming['testLogic'],
                system=incoming['system'], csf=incoming['csf'], creation_time=dt.datetime.utcnow(),
                owner_id=current_user.user_id)
    db.session.add(rule)
    db.session.commit()

    logger.info(f'Created a new rule: "{title}" by user: {current_user.user_id} ')

    return jsonify(rule_id=rule.rule_id)


@rule_api.route('/status', methods=['POST'])
@requires_auth
def set_status(current_user):
    incoming = request.get_json()

    status = incoming['status']
    rule_id = incoming['rule_id']
    organization_id = incoming['organization_id']

    # Parse given test time and make sure it's saved in UTC.
    test_time = pendulum.parse(incoming['testTime']).to('utc')

    # Add the rule status.
    rule_status = RuleStatus(status=status, reason=incoming['reason'], test_time=test_time,
                             creation_time=dt.datetime.utcnow(), rule_id=rule_id, organization_id=organization_id,
                             tester_id=current_user.user_id)
    db.session.add(rule_status)
    db.session.commit()

    logger.info(f'Set status of rule {rule_id} in organization {organization_id} to: {status} '
                f'by user: {current_user.user_id}')

    return jsonify(rule_status_id=rule_status.rule_status_id)
