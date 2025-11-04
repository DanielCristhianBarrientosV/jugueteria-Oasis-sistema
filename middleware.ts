// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'tu-super-secreto-cambialo-en-produccion-12345'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas (no requieren autenticación)
  const publicPaths = ['/', '/login', '/register', '/cliente/catalogo', '/api/auth'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Si es ruta pública, permitir acceso
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Obtener token de las cookies
  const token = request.cookies.get('auth-token')?.value;

  // Si no hay token, redirigir a login
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  try {
    // Verificar token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userRole = payload.role as string;

    // Proteger rutas del dashboard (solo PERSONAL)
    if (pathname.startsWith('/dashboard')) {
      if (userRole !== 'PERSONAL') {
        const url = request.nextUrl.clone();
        url.pathname = '/cliente/catalogo';
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    // Token inválido, redirigir a login
    console.error('Error verificando token:', error);
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};