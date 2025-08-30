// lib/graphqlClient.js
import { GraphQLClient } from "graphql-request";

const endpoint = process.env.GRAPHQL_ENDPOINT || "https://keeper.in-brackets.online/graphql";

// لو الـ endpoint مش موجود في .env.local هيظهر Error
if (!endpoint) {
  throw new Error("GRAPHQL_ENDPOINT is not defined in .env.local");
}

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
    // لو هتضيف توكن أو Authorization حطها هنا
    // Authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

