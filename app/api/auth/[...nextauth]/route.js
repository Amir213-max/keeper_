// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { graphqlClient } from "../../../lib/graphqlClient";
// import { gql } from "graphql-request";

// const SIGNIN_MUTATION = gql`
//   mutation Signin($email: String!, $password: String!) {
//     signin(input: { email: $email, password: $password }) {
//       token
//       user {
//         id
//         name
//         email
//       }
//     }
//   }
// `;

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const { signin } = await graphqlClient.request(SIGNIN_MUTATION, {
//             email: credentials.email,
//             password: credentials.password,
//           });

//           if (signin?.token) {
//             return {
//               id: signin.user.id,
//               name: signin.user.name,
//               email: signin.user.email,
//               token: signin.token,
//             };
//           }

//           return null;
//         } catch (err) {
//           console.error("Login Error:", err);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.accessToken = user.token;
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.token = token.accessToken;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login", // صفحة اللوجين بتاعتك
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
