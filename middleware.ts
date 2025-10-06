// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  (req) => {
    const role = req.nextauth.token?.role;
    if (req.nextUrl.pathname.startsWith('/admin') && role !== 'EMPLEADO' && role !== 'ADMIN') {
      return new Response('Acceso denegado', { status: 403 });
    }
  },
  { callbacks: { authorized: ({ token }) => !!token } }
);

export const config = { matcher: ['/admin/:path*', '/cliente/:path*'] };
