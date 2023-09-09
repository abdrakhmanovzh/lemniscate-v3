import { eq } from 'drizzle-orm';
import NextAuth from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { accounts, users } from '@/db/schema';
import { createUsername } from '@/shared';
import db from '@/db';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const foundUser = await db
          .select()
          .from(accounts)
          .where(eq(accounts.name, credentials!.username));

        if (foundUser.length === 0) return null;

        const user = foundUser[0];
        if (user.password !== credentials!.password) return null;

        return user;
      }
    })
  ],
  callbacks: {
    // async session({user}) {
    //   session.user.name = user.username;
    // },
    async signIn({ user }) {
      const foundAccount = await db
        .select()
        .from(accounts)
        .where(eq(accounts.id, user.id));

      if (foundAccount.length === 0) {
        try {
          await db.insert(accounts).values({
            id: user.id,
            name: createUsername(user.name)
          });

          await db.insert(users).values({
            id: user.id,
            name: createUsername(user.name)
          });
        } catch (error) {
          console.log(error);
          throw new Error('error creating account');
        }
      }

      return true;
    }
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export default handler;
