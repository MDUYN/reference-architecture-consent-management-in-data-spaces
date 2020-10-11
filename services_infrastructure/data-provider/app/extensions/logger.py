import logging.config


def setup_logging():
    logging_config = {
        'version': 1,
        'disable_existing_loggers': True,
        'formatters': {
            'standard': {
                'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
            },
        },
        'handlers': {
            'console': {
                'level': 'INFO',
                'formatter': 'standard',
                'class': 'logging.StreamHandler',
                'stream': 'ext://sys.stdout',  # Default is stderr
            },
        },
        'loggers': {
            '': {  # root logger
                'handlers': ['console'],
                'level': 'WARNING',
                'propagate': False
            },
            'app': {
                'handlers': ['console'],
                'level': 'INFO',
                'propagate': False
            },
        }
    }

    logging.config.dictConfig(logging_config)
