# YaYa Wallet Transactions Dashboard

## Overview

This project is a full-stack solution for the YaYa Wallet coding test. It provides a React.js dashboard and Django backend to display transactions for a given account, with search, pagination, and visual indicators for incoming/outgoing transactions.

## Features

- **Tabular List of Transactions**: Displays Transaction ID, Sender, Receiver, Amount, Currency, Cause, and Created At.
- **Pagination**: Supports page navigation using the `p` query parameter.
- **Search**: Filter transactions by sender, receiver, cause, or ID.
- **Incoming/Outgoing Indicators**: Visually marks transactions as incoming or outgoing based on the current user.
- **Responsive Design**: Adapts to different screen sizes for usability.
- **Secure API Authentication**: API keys and secrets are managed via environment variables and never exposed in frontend code.

## Solution Structure

- **Backend (Django)**
  - Handles API authentication and proxies requests to YaYa Wallet endpoints.
  - Provides `/transactions/fetch-transactions/` endpoint for frontend.
  - Uses HMAC signature for secure API calls.
  - Environment variables for API credentials (`.env.example` provided).
  - Includes Django tests for endpoint validation.

- **Frontend (React.js + Redux Toolkit)**
  - Fetches and displays transactions in a paginated, searchable table.
  - Highlights incoming/outgoing transactions.
  - Uses Redux for state management.
  - Responsive UI with Tailwind CSS.

## Setup Instructions

### Backend

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
2. Copy `.env.example` to `.env` and fill in your API credentials.
3. Run migrations:
   ```
   python manage.py migrate
   ```
4. Start the server:
   ```
   python manage.py runserver
   ```

### Frontend

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```

## Security

- API Key and Secret are stored in backend environment variables and never exposed to the frontend.
- All API requests from the frontend are routed through the backend, which handles authentication and signing.

## Testing

- **Backend**: Run Django tests with:
  ```
  python manage.py test transactions
  ```
- **Frontend**: Manual testing via the dashboard UI. All features (pagination, search, indicators) can be verified interactively.

## Assumptions

- The current user is hardcoded for demo purposes (no user management).
- The backend proxies all requests to YaYa Wallet and handles authentication.
- The frontend expects the backend to return pagination and summary fields as per YaYa API.

## Problem-Solving Approach

- Started with backend authentication and API integration.
- Built a secure proxy endpoint for the frontend.
- Developed a responsive React dashboard with all required features.
- Ensured API credentials are never exposed.
- Wrote backend tests to validate API responses and fields.

## How to Test

- Start both backend and frontend servers.
- Open the dashboard in your browser.
- Use search and pagination to explore transactions.
- Confirm visual indicators for incoming/outgoing transactions.
- Run backend tests to verify API correctness in the backend using  python manage.py test transactions.

## API Authentication & Signing (`transactions/utils.py`)

All API requests to YaYa Wallet are securely signed using helper functions in `transactions/utils.py`:

- **Environment Variable Loading**: API credentials (`YAYA_API_KEY`, `YAYA_API_SECRET`) are loaded from environment variables, keeping secrets out of source code.
- **Timestamp Generation**: `get_timestamp_ms()` provides the current UTC timestamp in milliseconds, required for request signing.
- **Signature Generation**: `generate_signature()` creates a secure HMAC SHA256 signature (base64-encoded) for each API request, following YaYa Wallet’s authentication requirements. It combines the timestamp, HTTP method, endpoint, and request body, then signs with the API secret.

This ensures all backend requests are securely authenticated and that sensitive credentials are never exposed to the frontend. The signing logic is fully contained in `transactions/utils.py` for clarity and security.

