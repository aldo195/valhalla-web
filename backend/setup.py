from setuptools import setup, find_packages


setup(
    name="valhallaweb",
    version='1.0',
    packages=find_packages(),
    install_requires=['logbook', 'ujson', 'flask', 'flask-script', 'flask-sqlalchemy', 'flask-bcrypt',
                      'flask-cors', 'mysqlclient', 'gunicorn', 'requests', 'itsdangerous']
)
