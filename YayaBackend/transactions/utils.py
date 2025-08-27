import base64
import hashlib
import hmac
import time
import os

# Load API credentials from environment variables
YAYA_API_KEY = os.getenv('YAYA_API_KEY')
YAYA_API_SECRET = os.getenv('YAYA_API_SECRET')


def get_timestamp_ms():
    """Return current UTC timestamp in milliseconds as string."""
    return str(int(time.time() * 1000))


def generate_signature(timestamp, method, endpoint, body, api_secret=None):
    """
    Generate YaYa Wallet API signature.
    Args:
        timestamp (str): Milliseconds since epoch (UTC)
        method (str): HTTP method (UPPERCASE)
        endpoint (str): API endpoint path (e.g. /api/en/transaction/find-by-user)
        body (str): JSON string or empty string for GET
        api_secret (str): API secret (optional, defaults to env)
    Returns:
        str: base64-encoded signature
    """
    if api_secret is None:
        api_secret = YAYA_API_SECRET
    prehash = f"{timestamp}{method.upper()}{endpoint}{body}"
    hmac_digest = hmac.new(api_secret.encode(), prehash.encode(), hashlib.sha256).digest()
    signature = base64.b64encode(hmac_digest).decode()
    return signature
