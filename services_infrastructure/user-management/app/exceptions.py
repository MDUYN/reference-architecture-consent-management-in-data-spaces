class ApiException(Exception):

    def __init__(self, message: str = None, status_code: int = 400):
        super(ApiException, self).__init__()
        self._message = message
        self._status_code = status_code

    @property
    def error_message(self):

        if self._message is None:
            return "An error occurred"

        return self._message

    @property
    def status_code(self):

        if self._status_code is None:
            return 500

        return self._status_code


class OperationalException(Exception):

    def __init__(self, message: str = None):
        super(OperationalException, self).__init__()
        self._message = message
