// import { PrismaAdapter } from "@auth/prisma-adapter"; // Commented: Ensure this package exists or use alternative
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, Session, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Simple user mock - in production, this would come from a database
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
  },
];

export const authOptions: AuthOptions = {
  adapter: undefined, // PrismaAdapter(prisma), // Uncomment after checking above
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }
        // Find user from mock data
        const user = mockUsers.find(u => u.email === credentials.email);
        if (!user) {
          throw new Error("No user found");
        }
        if (credentials.password !== user.password) {
          throw new Error("Invalid password");
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }: { session: Session, token: JWT }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT, user?: NextAuthUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {},
};
