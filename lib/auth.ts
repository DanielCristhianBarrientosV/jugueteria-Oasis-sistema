// lib/auth.ts
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

// Secret para JWT (debe estar en .env)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'tu-super-secreto-cambialo-en-produccion-12345'
);

// Interfaz del usuario en el token
export interface UserPayload {
  id: string;
  email: string;
  name: string;
  role: 'PERSONAL' | 'CLIENTE';
}

// ==========================================
// FUNCIONES DE HASH DE CONTRASEÑAS
// ==========================================

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// ==========================================
// FUNCIONES DE JWT
// ==========================================

export async function createToken(payload: UserPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Token válido por 7 días
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as UserPayload;
  } catch (error) {
    console.error('Error verificando token:', error);
    return null;
  }
}

// ==========================================
// FUNCIONES DE COOKIES
// ==========================================

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 días
    path: '/',
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('auth-token')?.value;
}

export async function getCurrentUser(): Promise<UserPayload | null> {
  const token = await getAuthToken();
  if (!token) return null;
  
  return verifyToken(token);
}