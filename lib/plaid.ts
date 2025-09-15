import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

// Validate environment variables
if (!process.env.PLAID_CLIENT_ID) {
  throw new Error('PLAID_CLIENT_ID environment variable is required');
}
if (!process.env.PLAID_SECRET) {
  throw new Error('PLAID_SECRET environment variable is required');
}

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
      'Content-Type': 'application/json',
    }
  }
})

export const plaidClient = new PlaidApi(configuration);