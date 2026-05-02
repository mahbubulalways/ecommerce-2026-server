import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};
const comparePassword = async (
  planPassword: string,
  hashPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(planPassword, hashPassword);
};

export const bcryptHelper = {
  hashPassword,
  comparePassword,
};
