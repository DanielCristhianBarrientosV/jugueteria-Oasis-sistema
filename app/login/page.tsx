'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tu lógica de login aquí
    console.log('Login:', { email, password });
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 relative overflow-hidden">
      {/* Fondo con gradiente */}
      <div className="absolute top-0 z-0 h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      {/* Lado izquierdo - Formulario */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className="text-white font-bold text-2xl">OASIS</span>
          </div>

          {/* Título */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Bienvenido de vuelta
            </h1>
            <p className="text-gray-400 text-lg">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="tu@email.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Recordar / Olvidé contraseña */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span className="text-sm text-gray-300">Recordarme</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón de login */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Registro */}
          <p className="mt-6 text-center text-gray-400">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>

      {/* Lado derecho - Imagen/Info */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl items-center justify-center p-12 relative z-10 border-l border-neutral-800">
        <div className="max-w-md text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            Sistema de Gestión Oasis
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Administra tu juguetería de manera eficiente. Control de inventario, ventas y más.
          </p>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-neutral-900/30 rounded-lg border border-neutral-800">
              <p className="text-2xl font-bold text-white">1K+</p>
              <p className="text-sm text-gray-400">Productos</p>
            </div>
            <div className="p-4 bg-neutral-900/30 rounded-lg border border-neutral-800">
              <p className="text-2xl font-bold text-white">500+</p>
              <p className="text-sm text-gray-400">Ventas/mes</p>
            </div>
            <div className="p-4 bg-neutral-900/30 rounded-lg border border-neutral-800">
              <p className="text-2xl font-bold text-white">24/7</p>
              <p className="text-sm text-gray-400">Soporte</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}