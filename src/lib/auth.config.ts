import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        token: { label: "Token", type: "token" },
      },
      async authorize(credentials) {
        // console.log("authorize", credentials);
        
        if (!credentials?.email) {
          console.log("Email is required.");
          return null;
        }

        // Mock user for now, replace with actual DB call
        const user = {
          id: "123",
          name: "admin",
          email: credentials.email as string,
          token: credentials.token as string
        };

        return user;
      }
    }),
  ],
  
  pages: {
    signIn: "/login"
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours - how often session is updated
  },
  
  callbacks: {
    async jwt({ token, user, trigger }) {
      // console.log("JWT callback - token:", token, "user:", user, "trigger:", trigger);
      
      // When user signs in, store user data in token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.token = user.token;
      }
      
      return token;
    },
    
    async session({ session, token }) {
      // console.log("Session callback - session:", session, "token:", token);
      
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.token = token.token as string;
      }
      
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || baseUrl;
      
      // console.log("Redirect callback - url:", url, "baseUrl:", baseUrl, "frontendUrl:", frontendUrl);
      
      // Handle signout
      if (url.includes('/api/auth/signout')) {
        return `${frontendUrl}/auth/login`;
      }
      
      // Handle signin success
      if (url.includes('/api/auth/signin') || url === '/auth/login') {
        return frontendUrl;
      }
      
      // Allow relative URLs
      if (url.startsWith('/')) {
        return `${frontendUrl}${url}`;
      }
      
      // Allow same-origin URLs
      if (url.startsWith(frontendUrl)) {
        return url;
      }
      
      // Default fallback
      return frontendUrl;
    },
  },

  // Add these additional options for stability
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
  
  // JWT options for better token handling
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  // Events for debugging
  events: {
    async signIn({ user, account, profile }) {
      console.log("User signed in:", { user, account, profile });
    },
    async signOut({ session, token }) {
      console.log("User signed out:", { session, token });
    },
    async session({ session, token }) {
      console.log("Session checked:", { session, token });
    },
  },
};

// Type declarations
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      token?: string;
    };
  }
  
  interface User {
    id: string;
    name: string;
    email: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    token?: string;
  }
}