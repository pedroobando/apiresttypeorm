import { Request, Response } from 'express';
import { User } from '../entities/User';
import { cifrate, cifrateVerify } from '../helpers/cifrate';
import { eatGetCollecc, paginateRange } from '../helpers/db-paginate';
import { COMPANY_EMAIL, COMPANY_NAME } from '../helpers/cf-enviroment';

export const userGet = async (req: Request, res: Response) => {
  const page: number = Number(req.query.page || 1);
  const limit: number = Number(req.query.limit || 10);

  try {
    // const roll: string = String(req.query.roll || '');
    // const condition = ? { active: true } : { active: true, roll };
    const { toSkip, tolimit } = eatGetCollecc(page, limit);
    const [users, totalItem] = await User.findAndCount({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        isActive: true,
        email: true,
      },
      skip: toSkip,
      take: tolimit,
    });

    const paginate = paginateRange(page, tolimit, totalItem);

    res.status(200).json({ err: null, data: { users, paginate } });
  } catch (error: any) {
    res.status(500).json({ err: 'Problemas mostrando usuario', error: error.message, user: null });
  }
};

export const userGetbyId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getUser = await User.findOne({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        isActive: true,
        email: true,
        createAt: true,
        updateAt: true,
      },
    });

    res.status(200).json({ err: null, data: getUser });
  } catch (error: any) {
    res.status(500).json({ err: 'Problemas mostrando usuario', error: error.message, user: null });
  }
};

export const userPost = async (req: Request, res: Response) => {
  const { password, firstName, lastName, email } = req.body;

  try {
    const createUser = new User();
    createUser.firstName = firstName;
    createUser.lastName = lastName;
    createUser.isActive = false;
    createUser.email = email;
    createUser.password = await cifrate(password);
    await createUser.save();

    res.status(201).json({ err: null, user: createUser });
  } catch (error: any) {
    res.status(500).json({
      err: 'Problema ingresando el usuario!',
      error: error.message,
      user: null,
      affected: 0,
    });
  }
};

export const userPut = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, isActive } = req.body;
  try {
    const updateUser = await User.update(
      { id },
      {
        firstName,
        lastName,
        email,
        isActive,
      },
    );

    res.status(200).json({ err: null, affected: updateUser.affected });
  } catch (error: any) {
    res
      .status(500)
      .json({ err: 'Problema actualizando usuario', error: error.message, affected: 0 });
  }
};

export const userChangePassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { password } = req.body;

  try {
    password = await cifrate(password);
    const updateUser = await User.update({ id }, { password });
    res.status(200).json({ err: null, affected: updateUser.affected });
  } catch (error: any) {
    res
      .status(500)
      .json({ err: 'Problema actualizando password', error: error.message, affected: 0 });
  }
};

export const userDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.delete({ id });
    res.status(200).json({ err: null, affected: deleteUser.affected });
  } catch (error: any) {
    res.status(500).json({ err: 'Problema eliminando usuario', error: error.message, user: null });
  }
};
