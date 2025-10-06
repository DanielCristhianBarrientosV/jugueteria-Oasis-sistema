import LoginForm from '../../components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        <LoginForm />
        <p className="mt-4 text-center">
          ¿No tienes cuenta? <Link href="/register" className="text-blue-500">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}
