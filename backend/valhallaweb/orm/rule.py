from ..common import db


class Rule(db.Model):
    rule_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(1024))
    description = db.Column(db.Text)
    test_logic = db.Column(db.Text)
    system = db.Column(db.String(256))
    csf = db.Column(db.String(512))
    category = db.Column(db.String(256))
    creation_time = db.Column(db.DateTime)

    owner_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    owner = db.relationship('User', backref='rules', lazy=True)

    def to_dict(self):
        return {
            'rule_id': self.rule_id,
            'title': self.title,
            'description': self.description,
            'test_logic': self.test_logic,
            'system': self.system,
            'csf': self.csf,
            'category': self.category,
            'creation_time': self.creation_time,
            'owner_id': self.owner_id
        }


class RuleStatus(db.Model):
    rule_status_id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(256))
    reason = db.Column(db.Text)
    first_test_time = db.Column(db.DateTime)
    last_test_time = db.Column(db.DateTime)

    rule_id = db.Column(db.Integer, db.ForeignKey('rule.rule_id'))
    rule = db.relationship('Rule', backref='rule_statuses')

    organization_id = db.Column(db.Integer, db.ForeignKey('organization.organization_id'))
    organization = db.relationship('Organization', backref='rule_statuses')

    tester_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    tester = db.relationship('User', backref='tested_rules')

    def to_dict(self):
        rule = self.rule
        return {
            'rule_status_id': self.rule_status_id,
            'status': self.status,
            'reason': self.reason,
            'first_test_time': self.first_test_time,
            'last_test_time': self.last_test_time,
            'organization_id': self.organization_id,
            'tester_id': self.tester_id,
            # Derived from original rule.
            'rule_id': rule.rule_id,
            'title': rule.title,
            'description': rule.description,
            'test_logic': rule.test_logic,
            'system': rule.system,
            'csf': rule.csf,
            'category': rule.category,
            'creation_time': rule.creation_time,
            'owner_id': rule.owner_id
        }
