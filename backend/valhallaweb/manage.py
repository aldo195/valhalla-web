from flask_script import Manager

from valhallaweb.app import app, db

manager = Manager(app)


@manager.command
def create_db():
    """
    Creates the DB tables.
    """
    db.create_all()


if __name__ == '__main__':
    manager.run()
