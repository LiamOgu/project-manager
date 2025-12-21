import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const passwordHash = async (password: string) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};
