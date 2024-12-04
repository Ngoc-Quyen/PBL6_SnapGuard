from flaskr.errors.custom_api import CustomAPIError
from http import HTTPStatus

class ForbiddenError(CustomAPIError):
    def __init__(self, message):
        super().__init__(message)
        self.status_code = HTTPStatus.FORBIDDEN