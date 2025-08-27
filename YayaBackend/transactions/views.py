from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
from .utils import generate_signature, get_timestamp_ms, YAYA_API_KEY, YAYA_API_SECRET
import os

YAYA_BASE_URL = os.getenv('YAYA_BASE_URL', 'https://sandbox.yayawallet.com')

# @csrf_exempt
# def fetch_transactions(request):
# 	"""
# 	Django view to fetch transactions for a given account from YaYa Wallet API.
# 	Expects 'account_name' as a GET or POST parameter.
# 	"""
# 	account_name = request.GET.get('account_name') or request.POST.get('account_name')
# 	if not account_name:
# 		return JsonResponse({'error': 'Missing account_name'}, status=400)

# 	endpoint = '/api/en/transaction/find-by-user'
# 	method = 'GET'
# 	body = ''
# 	timestamp = get_timestamp_ms()
# 	signature = generate_signature(timestamp, method, endpoint, body)

# 	headers = {
# 		'Content-Type': 'application/json',
# 		'YAYA-API-KEY': YAYA_API_KEY,
# 		'YAYA-API-TIMESTAMP': timestamp,
# 		'YAYA-API-SIGN': signature,
# 	}

# 	url = f"{YAYA_BASE_URL}{endpoint}?account_name={account_name}"
# 	try:
# 		response = requests.get(url, headers=headers)
# 		response.raise_for_status()
# 		data = response.json()
# 		return JsonResponse(data)
# 	except requests.RequestException as e:
# 		return JsonResponse({'error': str(e)}, status=500)




# @csrf_exempt
# def fetch_transactions(request):
#     """
#     Django view to fetch transactions for a given account from YaYa Wallet API.
#     Supports both GET (query param) and POST (JSON body).
#     """
#     account_name = request.GET.get('account_name') or request.POST.get('account_name')
#     if not account_name:
#         return JsonResponse({'error': 'Missing account_name'}, status=400)

#     endpoint = '/api/en/transaction/find-by-user'
#     method = request.method.upper()
#     body = json.dumps({"account_name": account_name}) if method == "POST" else ""

#     timestamp = get_timestamp_ms()
#     signature = generate_signature(timestamp, method, endpoint, body)

#     headers = {
#         'Content-Type': 'application/json',
#         'YAYA-API-KEY': YAYA_API_KEY,
#         'YAYA-API-TIMESTAMP': timestamp,
#         'YAYA-API-SIGN': signature,
#     }

#     url = f"{YAYA_BASE_URL}{endpoint}"
#     try:
#         if method == "POST":
#             response = requests.post(url, headers=headers, data=body)
#         else:  # GET
#             response = requests.get(f"{url}?account_name={account_name}", headers=headers)

#         response.raise_for_status()
#         data = response.json()

#         return JsonResponse({
#             "status": "success",
#             "transactions": data.get("transactions", []),
#             "raw_response": data
#         })
#     except requests.RequestException as e:
#         return JsonResponse({'error': str(e)}, status=500)







# @csrf_exempt
# def fetch_transactions(request):
#     """
#     Fetch transactions from YaYa Wallet.
#     Supports:
#     - Pagination (p query param)
#     - Search (query param)
#     """
#     account_name = request.GET.get('account_name') or request.POST.get('account_name')
#     page = request.GET.get('p', '1')
#     query = request.GET.get('query') or request.POST.get('query')

#     headers = {
#         'Content-Type': 'application/json',
#         'YAYA-API-KEY': YAYA_API_KEY,
#         'YAYA-API-TIMESTAMP': get_timestamp_ms(),
#     }

#     if query:
#         # Use search endpoint
#         endpoint = '/api/en/transaction/search'
#         method = 'POST'
#         body = {"query": query}
#         if account_name:
#             body["account_name"] = account_name
#         body_str = json.dumps(body)
#         headers['YAYA-API-SIGN'] = generate_signature(get_timestamp_ms(), method, endpoint, body_str)
#         url = f"{YAYA_BASE_URL}{endpoint}"
#         try:
#             response = requests.post(url, headers=headers, json=body)
#             response.raise_for_status()
#             data = response.json()
#             return JsonResponse(data)
#         except requests.RequestException as e:
#             return JsonResponse({'error': str(e)}, status=500)

#     else:
#         # Use find-by-user endpoint with pagination
#         endpoint = '/api/en/transaction/find-by-user'
#         method = 'GET'
#         body_str = ''
#         headers['YAYA-API-SIGN'] = generate_signature(get_timestamp_ms(), method, endpoint, body_str)
#         params = {}
#         if account_name:
#             params['account_name'] = account_name
#         params['p'] = page
#         url = f"{YAYA_BASE_URL}{endpoint}"
#         try:
#             response = requests.get(url, headers=headers, params=params)
#             response.raise_for_status()
#             data = response.json()
#             return JsonResponse(data)
#         except requests.RequestException as e:
#             return JsonResponse({'error': str(e)}, status=500)

















































from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import json
from .utils import generate_signature, get_timestamp_ms, YAYA_API_KEY, YAYA_API_SECRET
import os
import math

YAYA_BASE_URL = os.getenv('YAYA_BASE_URL', 'https://sandbox.yayawallet.com')
PER_PAGE = 10  # items per page

@csrf_exempt
def fetch_transactions(request):
    """
    Fetch transactions from YaYa Wallet.
    Supports:
    - Pagination (p query param, default per_page=10)
    - Search (query param)
    """
    account_name = request.GET.get('account_name') or request.POST.get('account_name')
    page = int(request.GET.get('p', '1'))
    query = request.GET.get('query') or request.POST.get('query')

    headers = {
        'Content-Type': 'application/json',
        'YAYA-API-KEY': YAYA_API_KEY,
        'YAYA-API-TIMESTAMP': get_timestamp_ms(),
    }

    if query:
        # Search endpoint
        endpoint = '/api/en/transaction/search'
        method = 'POST'
        body = {"query": query, "per_page": PER_PAGE, "page": page}
        if account_name:
            body["account_name"] = account_name
        body_str = json.dumps(body)
        headers['YAYA-API-SIGN'] = generate_signature(get_timestamp_ms(), method, endpoint, body_str)
        url = f"{YAYA_BASE_URL}{endpoint}"
        try:
            response = requests.post(url, headers=headers, json=body)
            response.raise_for_status()
            data = response.json()
            total_records = data.get('total', len(data.get('data', [])))
            total_pages = math.ceil(total_records / PER_PAGE)
            return JsonResponse({
                'transactions': data.get('data', []),
                'totalPages': total_pages,
                'perPage': PER_PAGE
            })
        except requests.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        # Find-by-user endpoint with pagination
        endpoint = '/api/en/transaction/find-by-user'
        method = 'GET'
        body_str = ''
        headers['YAYA-API-SIGN'] = generate_signature(get_timestamp_ms(), method, endpoint, body_str)
        params = {'p': page, 'per_page': PER_PAGE}
        if account_name:
            params['account_name'] = account_name
        url = f"{YAYA_BASE_URL}{endpoint}"
        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
            total_records = data.get('total', len(data.get('data', [])))
            total_pages = math.ceil(total_records / PER_PAGE)
            return JsonResponse({
                'transactions': data.get('data', []),
                'totalPages': total_pages,
                'perPage': PER_PAGE
            })
        except requests.RequestException as e:
            return JsonResponse({'error': str(e)}, status=500)







# # views.py
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import requests
# import os
# from .utils import generate_signature, get_timestamp_ms, YAYA_API_KEY, YAYA_API_SECRET

# YAYA_BASE_URL = os.getenv('YAYA_BASE_URL', 'https://sandbox.yayawallet.com')


# # @csrf_exempt
# # def fetch_transactions(request):
# #     """
# #     Fetch transactions from YaYa Wallet.
# #     Supports:
# #     - Pagination (p query param)
# #     - Search (query param)
# #     """
# #     account_name = request.GET.get('account_name') or request.POST.get('account_name')
# #     if not account_name:
# #         return JsonResponse({'error': 'Missing account_name'}, status=400)

# #     page = request.GET.get('p', '1')
# #     query = request.GET.get('query') or request.POST.get('query')

# #     if query:
# #         # Use the search endpoint
# #         endpoint = '/api/en/transaction/search'
# #         method = 'POST'
# #         body = {"query": query}
# #         import json
# #         body_str = json.dumps(body)
# #     else:
# #         # Use find-by-user endpoint with pagination
# #         endpoint = f'/api/en/transaction/find-by-user?p={page}&account_name={account_name}'
# #         method = 'GET'
# #         body_str = ''

# #     timestamp = get_timestamp_ms()
# #     signature = generate_signature(timestamp, method, endpoint, body_str)

# #     headers = {
# #         'Content-Type': 'application/json',
# #         'YAYA-API-KEY': YAYA_API_KEY,
# #         'YAYA-API-TIMESTAMP': timestamp,
# #         'YAYA-API-SIGN': signature,
# #     }

# #     url = f"{YAYA_BASE_URL}{endpoint}"

# #     try:
# #         if method == 'GET':
# #             response = requests.get(url, headers=headers)
# #         else:  # POST
# #             response = requests.post(url, headers=headers, json=body)

# #         response.raise_for_status()
# #         data = response.json()

# #         # You can optionally normalize the response here
# #         # e.g., ensure "transactions" list is always returned
# #         return JsonResponse(data)
# #     except requests.RequestException as e:
# #         return JsonResponse({'error': str(e)}, status=500)


# @csrf_exempt
# def fetch_transactions(request):
#     """
#     Fetch transactions from YaYa Wallet.
#     Supports:
#     - Pagination (p query param)
#     - Search (query param)
#     - Optional account_name
#     """
#     account_name = request.GET.get('account_name') or request.POST.get('account_name')
#     page = request.GET.get('p', '1')
#     query = request.GET.get('query') or request.POST.get('query')

#     if query:
#         endpoint = '/api/en/transaction/search'
#         method = 'POST'
#         import json
#         body = {"query": query}
#         if account_name:
#             body["account_name"] = account_name
#         body_str = json.dumps(body)
#     else:
#         endpoint = f'/api/en/transaction/find-by-user/'
#         if account_name:
#             endpoint += f"&account_name={account_name}"
#         method = 'GET'
#         body_str = ''

#     timestamp = get_timestamp_ms()
#     signature = generate_signature(timestamp, method, endpoint, body_str)

#     headers = {
#         'Content-Type': 'application/json',
#         'YAYA-API-KEY': YAYA_API_KEY,
#         'YAYA-API-TIMESTAMP': timestamp,
#         'YAYA-API-SIGN': signature,
#     }

#     url = f"{YAYA_BASE_URL}{endpoint}"

#     try:
#         if method == 'GET':
#             response = requests.get(url, headers=headers)
#         else:
#             response = requests.post(url, headers=headers, json=body)

#         response.raise_for_status()
#         data = response.json()
#         return JsonResponse(data)
#     except requests.RequestException as e:
#         return JsonResponse({'error': str(e)}, status=500)
