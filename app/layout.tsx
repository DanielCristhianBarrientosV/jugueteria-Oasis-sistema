// app/layout.tsx

<<<<<<< HEAD
import type { Metadata } from "next";
// 1. Cambiamos la importación: quitamos Geist y añadimos Inter.
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
=======
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext'; // 1. ¡IMPORTAMOS EL PROVIDER!
>>>>>>> 750e512 (feat(auth): Implement complete user authentication system)

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'Oasis Toys - Tienda de Juguetes',
  description: 'Descubre la magia del juego.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<<<<<<< HEAD
    // 4. Cambiamos el idioma a español.
    <html lang="es" className={inter.className} suppressHydrationWarning>
      {/* 5. Aplicamos la variable de la fuente al body.
          La clase 'font-sans' se configurará en Tailwind para usar esta fuente. */}
      <body
        className={`${inter.variable} font-sans antialiased bg-neutral-950 text-white`}
      >
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <Providers>{children}</Providers>
=======
    <html lang="es">
      <body className={`${nunito.variable} font-sans`}>
        {/* 2. ENVOLVEMOS TODA LA APLICACIÓN CON EL AUTHPROVIDER */}
        <AuthProvider>
          {/* Header, Footer, y el resto de tu app ahora viven DENTRO del AuthProvider */}
          {children}
        </AuthProvider>
>>>>>>> 750e512 (feat(auth): Implement complete user authentication system)
      </body>
    </html>
  );
}
