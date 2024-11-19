/* eslint-disable @typescript-eslint/no-explicit-any */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user?.id;
        token.isAdmin = user?.isAdmin;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token?.id;
        session.user.isAdmin = token?.isAdmin;
      }
      return session;
    },
    authorized({ token, req }: any) {
      const { pathname } = req.nextUrl;

      // Admin route: Allow only admins
      if (pathname.startsWith("/admin")) {
        return token?.isAdmin === true;
      }

      // Blog route: Allow authenticated users only
      if (pathname.startsWith("/blog")) {
        return !!token;
      }

      // Login page: Allow only unauthenticated users
      if (pathname.startsWith("/login") && Boolean(token)) {
        return false;
      }

      // Allow access to all other routes
      return true;
    },
  },
};
