import prisma from '../lib/prisma';

// find user by email
const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// find user byy id
const findUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
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

// get user session
const getUserSession = async (userId: string) => {
  return await prisma.userSession.findUnique({
    where: {
      userId,
    },
  });
};

// update user session (otp)
const updateUserSession = async (
  userId: string,
  updates: { otp?: string; otpExpiresAt?: boolean; otpUsed?: boolean }
) => {
  // Build data object conditionally
  const data: any = {};

  if (updates.otp !== undefined) {
    data.otp = updates.otp;
  }

  if (updates.otpExpiresAt === true) {
    data.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  }

  if (updates.otpUsed !== undefined) {
    data.otpUsed = updates.otpUsed;
  }

  return await prisma.userSession.update({
    where: { userId },
    data,
  });
};

const updateLastLogin = async (userId: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { lastLogin: new Date() },
  });
};

const updateEmailVerified = async (userId: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { emailVerified: true },
  });
};

export {
  findUserByEmail,
  saveUser,
  createUserSession,
  updateEmailVerified,
  updateLastLogin,
  getUserSession,
  updateUserSession,
  findUserById,
};
