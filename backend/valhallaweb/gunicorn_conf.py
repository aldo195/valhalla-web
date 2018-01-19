import logging
import logging.handlers
import sys

import logbook
from valhallaweb import config

logger = logbook.Logger(__name__)

host = 'localhost'
port = 8000

bind = '{}:{}'.format(host, port)
backlog = 2048
workers = 1
timeout = 600
# Using eventlet workers (for websocket support), see: http://docs.gunicorn.org/en/stable/design.html
worker_class = 'eventlet'
pidfile = '/tmp/gunicorn.pid'


def post_fork(server, worker):
    server.log.info('Worker spawned (pid: %s)', worker.pid)

    logging_rotating_file_handler = logging.handlers.RotatingFileHandler(
        config.LOG_FILE_PATH.replace('.log', f'.{worker.pid}.flask.log'),
        maxBytes=5 * 1024 * 1024, backupCount=5)

    root_logger = logging.getLogger()
    root_logger.addHandler(logging_rotating_file_handler)
    root_logger.setLevel(logging.CRITICAL)

    logger_setup = logbook.NestedSetup([
        logbook.StreamHandler(sys.stdout, level=logbook.INFO, bubble=True),
        logbook.RotatingFileHandler(config.LOG_FILE_PATH.replace('.log', f'.{worker.pid}.log'),
                                    level=logbook.INFO, max_size=5 * 1024 * 1024, bubble=True)
    ])
    logger_setup.push_application()
