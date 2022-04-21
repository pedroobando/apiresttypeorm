import { User } from '../entities/User';

// export const isRollValid = async (roll = '') => {
//   const rollExist = await Roll.findOne({ roll });
//   if (!rollExist) throw new Error(`El roll ${roll} no esta registrado en DB`);
// };

export const isExistEmail = async (email: string) => {
  const findUser = await User.findOneBy({ email });
  if (findUser) throw new Error(`El email ${email} ya esta registrado en otro usuario`);
};

export const isExistUserById = async (id: string) => {
  const findUser = await User.findOneBy({ id });
  if (!findUser) throw new Error(`El usuario no esta registrado`);
};
