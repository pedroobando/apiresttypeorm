import { Router } from 'express';
import { body, param, query } from 'express-validator';
import fieldValidate from '../middleware/validate-field';

import {
  userPost,
  userGet,
  userPut,
  userChangePassword,
  userDelete,
  userGetbyId,
} from '../controllers/user.controller';
// import validateJWT from '../middleware/validate-jwt';
// import { isAdminRoll, isHaveOnlyRoll, isOnlyRollExec } from '../middleware/validate-roll';

const { isExistEmail, isExistUserById } = require('../helpers/db-validator');

const router = Router();

const rollAdmited: string[] = ['ADMIN_ROLE', 'CLIENT_ROLE'];

router.get(
  '/',
  // validateJWT,
  // isAdminRoll,
  // isHaveOnlyRoll(['ADMIN_ROLE']),
  fieldValidate,
  userGet,
);

router.get(
  '/:id',
  [param('id', 'No es un id valido').isUUID().custom(isExistUserById)],
  fieldValidate,
  userGetbyId,
);

// .custom(isExistEmail)
router.post(
  '/',
  [
    body('firstName', 'El nombre es obligatorio').isEmpty(),
    body('lastName', 'El nombre es obligatorio').isEmpty(),
    body('email', 'Correo o email no es valido').isEmail().custom(isExistEmail),
    body('password', 'El password es requerido, debe ser mayor o igual a 6 caracteres')
      .isString()
      .isLength({ min: 6 }),
  ],
  fieldValidate,
  userPost,
);

router.put(
  '/:id',
  // validateJWT,
  // isOnlyRollExec(['ADMIN_ROLE']),
  [
    param('id', 'No es un id valido').isUUID().custom(isExistUserById),

    // body('roll', 'No es un roll valido').isIn(rollAdmited),
  ],
  fieldValidate,
  userPut,
);

router.put(
  '/password/:id',
  // validateJWT,
  // isOnlyRollExec(['ADMIN_ROLE']),

  [
    param('id', 'No es un id valido').isUUID().custom(isExistUserById),
    body('password', 'El password es requerido, debe ser mayor o igual a 6 caracteres')
      .isString()
      .isLength({ min: 6 }),
  ],
  fieldValidate,
  userChangePassword,
);

router.delete(
  '/:id',
  // validateJWT,
  // isOnlyRollExec(['ADMIN_ROLE']),
  [(param('id', 'No es un id valido').isEmpty(), param('id').custom(isExistUserById))],
  fieldValidate,
  userDelete,
);

export default router;
