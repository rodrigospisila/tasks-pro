import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tasks-pro.com' },
    update: {},
    create: {
      email: 'admin@tasks-pro.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Criar usuário comum
  const userPassword = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@tasks-pro.com' },
    update: {},
    create: {
      email: 'user@tasks-pro.com',
      password: userPassword,
      role: 'USER',
    },
  });

  // Criar algumas tarefas de exemplo
  await prisma.task.createMany({
    data: [
      {
        title: 'Configurar projeto',
        done: true,
        ownerId: admin.id,
      },
      {
        title: 'Implementar autenticação',
        done: false,
        ownerId: admin.id,
      },
      {
        title: 'Criar interface de usuário',
        done: false,
        ownerId: user.id,
      },
      {
        title: 'Escrever testes',
        done: false,
        ownerId: user.id,
      },
    ],
  });

  console.log('Seed executado com sucesso!');
  console.log('Admin: admin@tasks-pro.com / admin123');
  console.log('User: user@tasks-pro.com / user123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
