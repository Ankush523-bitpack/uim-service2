import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

export async function checkDbConnection(req: any, res: any) {
  try {
    // try to find a single record from Challenges table
    // it will throw an error if the table does not exist
    await prisma.challenges.findFirst();

    res.json({
      success: true,
    });
  } catch (error) {
    // handle the error
    console.error(error);

    res.json({
      success: false,
    });
  } finally {
    await prisma.$disconnect();
  }
}
