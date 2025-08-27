from django.test import TestCase, Client

class TransactionApiTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.url = '/transactions/fetch-transactions/'
        self.account_name = 'surafelaraya'  # Use a valid test account

    def test_fetch_transactions_status_and_fields(self):
        response = self.client.get(self.url, {'account_name': self.account_name})
        self.assertEqual(response.status_code, 200)
        data = response.json()
        # Check YaYa API keys
        for key in ['transactions', 'lastPage', 'total', 'perPage', 'incomingSum', 'outgoingSum']:
            self.assertIn(key, data)
        transactions = data['transactions']
        if transactions:
            tx = transactions[0]
            required_fields = [
                'id', 'sender', 'receiver', 'amount_with_currency', 'amount',
                'amount_in_base_currency', 'fee', 'currency', 'cause',
                'sender_caption', 'receiver_caption', 'created_at_time',
                'is_topup', 'is_outgoing_transfer', 'fee_vat', 'fee_before_vat'
            ]
            for field in required_fields:
                self.assertIn(field, tx)

BASE_URL = "http://localhost:8000/transactions/fetch-transactions/"

def test_fetch_transactions(account_name, page=1, query=None):
    params = {"account_name": account_name, "p": page}
    if query:
        params["query"] = query
    response = requests.get(BASE_URL, params=params)
    print(f"Status Code: {response.status_code}")
    try:
        data = response.json()
        print("Response JSON:")
        print(data)
    except Exception as e:
        print("Failed to parse JSON:", e)
        print("Raw Response:", response.text)

if __name__ == "__main__":
    # Example usage
    test_fetch_transactions("surafelaraya")
    test_fetch_transactions("surafelaraya", page=1, query="Pay")
    test_fetch_transactions("nonexistentuser")  