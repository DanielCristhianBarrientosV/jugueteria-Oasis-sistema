# Oasis Toys - Sistema de Inventario y E-commerce

Sistema de gestión de inventario y comercio electrónico construido con Next.js 15, TypeScript y Prisma, con autenticación JWT y base de datos SQL Server.

## 🚀 Tecnologías

- **Framework**: Next.js 15 con App Router y Turbopack
- **Lenguaje**: TypeScript
- **Base de datos**: SQL Server con Prisma ORM
- **Autenticación**: JWT personalizado con cookies HTTP-only
- **Estilos**: Tailwind CSS v4
- **Fuente**: Nunito (Google Fonts)

## 📋 Requisitos previos

- Node.js 20+ y npm
- Docker (para SQL Server)

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd sio-proyect-sis
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copia el archivo de ejemplo y ajústalo:
```bash
cp .env.example .env
```

O crea un archivo `.env` manualmente con:
```env
DATABASE_URL="sqlserver://localhost:1434;database=Oasis;user=SA;password=MSSQL@oasisdb;trustServerCertificate=true;"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genera-con: openssl rand -base64 32"
JWT_SECRET="genera-con: openssl rand -base64 32"
NODE_ENV="development"
```

4. **Configurar Docker (opcional)**

Si necesitas configurar Docker, copia el archivo de ejemplo:
```bash
cp docker-compose.example.yml docker-compose.yml
```

Luego inicia SQL Server:
```bash
docker compose up -d
# O usa el script de ayuda:
# ./start-db.sh (si lo tienes)
```

5. **Crear las tablas en la base de datos**
```bash
npx prisma generate
npx prisma db push
```

6. **Crear un usuario administrador (opcional)**
```bash
npx tsx scripts/create-admin.ts
```

7. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 👥 Roles de usuario

- **PERSONAL**: Acceso completo al dashboard (inventario, productos, compras, ventas)
- **CLIENTE**: Acceso al catálogo público y perfil personal

## 📁 Estructura del proyecto

```
app/
├── api/              # Endpoints de API
├── dashboard/        # Área protegida para PERSONAL
├── cliente/          # Área para CLIENTE
├── login/            # Página de inicio de sesión
└── register/         # Página de registro

components/           # Componentes reutilizables
lib/                  # Utilidades y configuración
├── auth.ts          # Funciones de autenticación JWT
└── prisma.ts        # Cliente de Prisma (singleton)

prisma/
└── schema.prisma    # Esquema de base de datos
```

## 🔐 Autenticación

El sistema usa autenticación JWT personalizada:
- Tokens almacenados en cookies HTTP-only
- Middleware protege rutas según el rol del usuario
- Tokens válidos por 7 días

## 🗄️ Base de datos

### Comandos útiles de Prisma:

```bash
npx prisma studio          # Abrir interfaz visual de la BD
npx prisma generate        # Regenerar el cliente de Prisma
npx prisma db push         # Sincronizar schema con la BD
npx prisma migrate dev     # Crear migración (producción)
```

## 🧪 Desarrollo

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm start            # Servidor de producción
npm run lint         # Ejecutar ESLint
```

## 📦 Modelos de datos

- **User**: Usuarios del sistema (PERSONAL/CLIENTE)
- **Product**: Productos del inventario
- **Supplier**: Proveedores
- **Purchase**: Compras a proveedores
- **Sale**: Ventas a clientes
- **Customer**: Clientes finales

## 🎨 Tema

- Diseño dark por defecto con `bg-neutral-950`
- Gradiente radial de fondo
- Fuente Nunito

## 📝 Notas

- El proyecto usa Next.js App Router (no Pages Router)
- Server Components por defecto, usa `'use client'` solo cuando sea necesario
- Path alias `@/*` configurado para imports desde la raíz
- SQL Server no soporta enums nativos, se usan strings con validación

## 📋 Archivos de Configuración

El proyecto incluye archivos de ejemplo para facilitar la configuración:

- **`.env.example`** - Plantilla de variables de entorno
- **`docker-compose.example.yml`** - Configuración de Docker de ejemplo
- **`.gitignore-docs.md`** - Documentación sobre archivos ignorados

### Archivos ignorados por Git

Los siguientes archivos **NO** se suben al repositorio:
- `WARP.md`, `CLAUDE.md` - Configuraciones de IA (locales a cada desarrollador)
- `TESTING_REPORT.md` - Reportes de pruebas temporales
- `docker-compose.yml` - Configuración local de Docker
- `start-db.sh` - Scripts personalizados
- `.env*` - Variables de entorno (pueden contener secretos)

Para más detalles, consulta `.gitignore-docs.md`
