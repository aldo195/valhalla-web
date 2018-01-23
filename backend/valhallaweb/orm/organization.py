from ..common import db


class Organization(db.Model):
    organization_id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(255), unique=True)
    creation_time = db.Column(db.DateTime)

    owner_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    owner = db.relationship('User', backref='rules', lazy=True)
