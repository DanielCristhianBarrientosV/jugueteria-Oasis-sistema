// middleware.ts

import { withAuth } from "next-auth/middleware"

// Comenta o elimina la lógica de validación
export default withAuth({
  callbacks: {
    // Devuelve siempre true para permitir el paso a cualquiera
    authorized: () => true, 
  },
})

export const config = {
  // Dejar el array vacío hace que el middleware no se ejecute en ninguna ruta
  matcher: [] 
}