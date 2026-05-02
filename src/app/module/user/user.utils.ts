import { prisma } from "../../../lib/prisma";

export const isUserExist = async (email: string, phoneNumber: string) => {
  const user = await prisma.user.count({
    where: {
      OR: [{ email }, { phoneNumber }],
    },
  });

  return user;
};
