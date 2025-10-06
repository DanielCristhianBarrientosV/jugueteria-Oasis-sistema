// app/register/page.tsx
import RegisterForm from '../../components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Registrarse</h1>
        <RegisterForm />
        <p className="mt-4 text-center">
          ¿Ya tienes cuenta? <Link href="/login" className="text-blue-500">Inicia Sesión</Link>
        </p>
      </div>
    </div>
  );
}
