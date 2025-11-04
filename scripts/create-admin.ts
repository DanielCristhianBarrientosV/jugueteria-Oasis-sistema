import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@oasis.com',
      name: 'Administrador',
      password: hashedPassword,
      role: 'PERSONAL',
    },
  });

  console.log('✅ Usuario PERSONAL creado:', admin);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());