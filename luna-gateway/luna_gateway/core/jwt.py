import copy

from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.utils import jwt_payload_handler

from accounts.models import Account


def get_token(user):
    payload_handler = api_settings.JWT_PAYLOAD_HANDLER
    jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
    payload = payload_handler(user)
    return jwt_encode_handler(payload)


def get_authorization_header(token):
    return {'HTTP_AUTHORIZATION': 'JWT {}'.format(token)}


def luna_jwt_payload_handler(user):
    try:
        account = Account.objects.get(user=user)
    except Account.DoesNotExist:
        return jwt_payload_handler(user)

    payload = copy.deepcopy(jwt_payload_handler(user))
    payload['account'] = {'facebook_id': account['facebook_id']}
    payload['full_name'] = '{0} {1}'.format(user.first_name, user.last_name)
    return payload
