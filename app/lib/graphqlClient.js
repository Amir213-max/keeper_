// lib/graphqlClient.js
import { GraphQLClient } from 'graphql-request';

// API endpoint
const endpoint = 'https://backend.keepersport.at/sa/graphql';

// Use your real credentials
const username = 'aalzuwayed';
const password = 'Wa:i16m:3y9\\'; // ← escaped backslash

// Encode Basic Auth header: base64("username:password")
const auth = Buffer.from(`${username}:${password}`).toString('base64');

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${auth}`,
  },
});




