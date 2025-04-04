import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserSeed } from './seeds/user.seed';
import { TaskSeed } from './seeds/task.seed';

const prisma = new PrismaClient();

async function main() {
  const hash = async (password: string) => await bcrypt.hash(password, 10);
  try {
    for (const user of UserSeed) {
      await prisma.user.create({
        data: {
          username: user.username,
          password: await hash(user.password),
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  for (const task of TaskSeed) {
    await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        userId: task.userId,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
