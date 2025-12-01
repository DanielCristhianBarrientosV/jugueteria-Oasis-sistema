// middleware.ts

import { withAuth } from "next-auth/middleware" // <-- Usas next-auth/middleware

// Comenta o elimina la lógica de validación
export default withAuth({
  callbacks: {
    // Devuelve siempre true para permitir el paso a cualquiera
    authorized: () => true, // <-- Esto permite pasar a TODOS, deshabilitando la seguridad.
  },
})

export const config = {
  // Dejar el array vacío hace que el middleware no se ejecute en ninguna ruta
  matcher: [] // <-- Esto significa que el middleware NO SE EJECUTA en NINGUNA RUTA.
}