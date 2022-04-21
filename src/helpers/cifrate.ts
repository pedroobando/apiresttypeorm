const bcryptjs = require('bcryptjs');

export const cifrate = async (sword: string) => bcryptjs.hashSync(sword, bcryptjs.genSaltSync(10));

export const cifrateVerify = async (swordOne: string, swordTwo: string) =>
  bcryptjs.compareSync(swordOne, swordTwo);
