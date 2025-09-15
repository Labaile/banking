# Banking App Setup Guide

This guide will help you set up the real Appwrite, Plaid, and Dwolla services for the banking application.

## Prerequisites

- Node.js 18+ installed
- Git installed
- A code editor (VS Code recommended)

## 1. Appwrite Setup

### Step 1: Create Appwrite Account
1. Go to [Appwrite Cloud](https://cloud.appwrite.io/)
2. Sign up for a free account
3. Create a new project

### Step 2: Get Project Credentials
1. In your Appwrite dashboard, go to **Settings** → **API Keys**
2. Copy your **Project ID** and **API Endpoint**
3. Create a new API key with **Full Access** scope
4. Copy the API key

### Step 3: Create Database and Collections
1. Go to **Databases** in your Appwrite dashboard
2. Create a new database
3. Create the following collections:

#### Users Collection
- **Collection ID**: `users`
- **Attributes**:
  - `userId` (String, 255 chars, required)
  - `firstName` (String, 255 chars, required)
  - `lastName` (String, 255 chars, required)
  - `email` (String, 255 chars, required)
  - `address1` (String, 255 chars, required)
  - `city` (String, 255 chars, required)
  - `state` (String, 2 chars, required)
  - `postalCode` (String, 10 chars, required)
  - `dateOfBirth` (String, 10 chars, required)
  - `ssn` (String, 20 chars, required)
  - `dwollaCustomerId` (String, 255 chars, required)
  - `dwollaCustomerUrl` (String, 500 chars, required)

#### Banks Collection
- **Collection ID**: `banks`
- **Attributes**:
  - `userId` (String, 255 chars, required)
  - `bankId` (String, 255 chars, required)
  - `accountId` (String, 255 chars, required)
  - `accessToken` (String, 500 chars, required)
  - `fundingSourceUrl` (String, 500 chars, required)
  - `shareableId` (String, 255 chars, required)

#### Transactions Collection
- **Collection ID**: `transactions`
- **Attributes**:
  - `name` (String, 255 chars, required)
  - `amount` (String, 20 chars, required)
  - `senderId` (String, 255 chars, required)
  - `senderBankId` (String, 255 chars, required)
  - `receiverId` (String, 255 chars, required)
  - `receiverBankId` (String, 255 chars, required)
  - `email` (String, 255 chars, required)
  - `channel` (String, 50 chars, required)
  - `category` (String, 100 chars, required)

## 2. Plaid Setup

### Step 1: Create Plaid Account
1. Go to [Plaid Dashboard](https://dashboard.plaid.com/)
2. Sign up for a free account
3. Complete the onboarding process

### Step 2: Get Sandbox Credentials
1. In your Plaid dashboard, go to **Team Settings** → **Keys**
2. Copy your **Client ID** and **Secret** for the **Sandbox** environment
3. Note: Use Sandbox for development, Production for live apps

### Step 3: Configure Products
- The app uses: `auth`, `transactions`, `identity`
- These are enabled by default in sandbox

## 3. Dwolla Setup

### Step 1: Create Dwolla Account
1. Go to [Dwolla Developer Portal](https://developers.dwolla.com/)
2. Sign up for a free account
3. Complete the verification process

### Step 2: Get Sandbox Credentials
1. In your Dwolla dashboard, go to **Settings** → **API Keys**
2. Create a new API key for **Sandbox** environment
3. Copy the **Key** and **Secret**

### Step 3: Configure Webhook (Optional)
- Set up webhook endpoint for transaction notifications
- Use ngrok for local development

## 4. Environment Configuration

Create a `.env` file in your project root with the following structure:

```env
# NEXT
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your-project-id
NEXT_APPWRITE_KEY=your-api-key
APPWRITE_DATABASE_ID=your-database-id
APPWRITE_USER_COLLECTION_ID=users
APPWRITE_BANK_COLLECTION_ID=banks
APPWRITE_TRANSACTION_COLLECTION_ID=transactions

# PLAID
PLAID_CLIENT_ID=your-plaid-client-id
PLAID_SECRET=your-plaid-secret
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions,identity
PLAID_COUNTRY_CODES=US,CA

# DWOLLA
DWOLLA_KEY=your-dwolla-key
DWOLLA_SECRET=your-dwolla-secret
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox
```

## 5. Testing the Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Test Authentication
1. Go to `http://localhost:3000`
2. You should be redirected to `/sign-in`
3. Try to sign up with a new account
4. Check your Appwrite dashboard to see if the user was created

### Step 4: Test Bank Connection
1. After signing up, you should see a "Link Account" button
2. Click it to test Plaid Link integration
3. Use Plaid's test credentials to connect a bank

### Step 5: Test Money Transfer
1. Create two test accounts
2. Try transferring money between them
3. Check Dwolla dashboard for transaction records

## 6. Common Issues

### Appwrite Issues
- **Error**: "Project not found" → Check your project ID
- **Error**: "Insufficient permissions" → Check your API key permissions
- **Error**: "Collection not found" → Verify collection IDs match exactly

### Plaid Issues
- **Error**: "Invalid client_id" → Check your Plaid credentials
- **Error**: "Invalid products" → Ensure products are enabled in dashboard
- **Error**: "Invalid country_codes" → Use US,CA for testing

### Dwolla Issues
- **Error**: "Invalid credentials" → Check your Dwolla key/secret
- **Error**: "Customer not found" → Ensure user has dwollaCustomerId

## 7. Production Deployment

### Before Going Live
1. Switch to production credentials for all services
2. Update `PLAID_ENV` to `production`
3. Update `DWOLLA_ENV` to `production`
4. Update `DWOLLA_BASE_URL` to `https://api.dwolla.com`
5. Complete Dwolla's production verification process
6. Complete Plaid's production approval process

### Security Considerations
- Never commit `.env` files to version control
- Use environment variables in production
- Implement proper error handling
- Add rate limiting
- Use HTTPS in production

## 8. Support

- **Appwrite**: [Documentation](https://appwrite.io/docs)
- **Plaid**: [Documentation](https://plaid.com/docs/)
- **Dwolla**: [Documentation](https://developers.dwolla.com/)

## 9. Cost Information

### Appwrite
- Free tier: 25,000 requests/month
- Paid plans start at $9/month

### Plaid
- Free tier: 100 live items
- Paid plans start at $0.50 per item

### Dwolla
- Free tier: 1,000 transactions/month
- Paid plans start at $0.25 per transaction

---

**Note**: This is a development setup. For production, ensure you complete all verification processes and follow security best practices.
