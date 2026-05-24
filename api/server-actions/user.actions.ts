'use server';

import { UserCreateInput } from '@/db/generated/prisma/models';
import { prisma } from '@/lib/prisma';

export async function login(userData: { email: string, password?: string }) {
  const user = await prisma.user.findFirst({
    where: {
      email: userData.email,
    },
  });
    
  if (!user) {
    throw new Error(`User with email ${userData.email} does not exists`);
  } else if (user.password !== userData.password) {
    throw new Error("Incorrect credentials"); 
  }

  return user;
}

export async function createUser(userData: UserCreateInput) {
  await prisma.user.create({ data: userData });
}

export async function getUserByAttr(by: string, value: string) {
  return (await prisma.user.findFirst({
    where: {
      [by]: value,
    }
  }));
}
