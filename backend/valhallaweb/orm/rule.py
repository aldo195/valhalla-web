from ..common import db


class Rule(db.Model):
    rule_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(1024))
    description = db.Column(db.Text)
    test_logic = db.Column(db.Text)
    system = db.Column(db.String(255))
    csf = db.Column(db.String(512))
    creation_time = db.Column(db.DateTime)

    owner_id = db.Column(db.Integer(), db.ForeignKey('user.user_id'), nullable=False)
    owner = db.relationship('User', backref='rules', lazy=True)


class RuleStatus(db.Model):
    rule_status_id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(255))
    reason = db.Column(db.Text)
    test_time = db.Column(db.DateTime)
    creation_time = db.Column(db.DateTime)

    rule_id = db.Column(db.Integer, db.ForeignKey('rule.rule_id'))
    rule = db.relationship('Rule', backref='rule_statuses')

    organization_id = db.Column(db.Integer, db.ForeignKey('organization.organization_id'))
    organization = db.relationship('Organization', backref='rule_statuses')

    tester_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    tester = db.relationship('User', backref='tested_rules')