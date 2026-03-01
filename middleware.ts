import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: ["/admin", "/admin/articles/:path*", "/admin/users/:path*", "/admin/settings/:path*"],
};
