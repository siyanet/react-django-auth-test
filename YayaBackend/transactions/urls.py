from django.urls import path
from .views import fetch_transactions

urlpatterns = [
    path('fetch-transactions/', fetch_transactions, name='fetch_transactions'),
]
