import prisma from '../lib/prisma';

// find user by email
const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// save user
const saveUser = async (firstName: string, lastName: string, email: string, password: string) => {
  return await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
    select: {
      id: true,
    },
  });
};

// create user session with otp and otpExpiresAt
const createUserSession = async (userId: string, otp: string) => {
  return await prisma.userSession.create({
    data: {
      userId,
      otp,
      otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
      otpUsed: false,
    },
  });
};

export { findUserByEmail, saveUser, createUserSession };
