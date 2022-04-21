import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

// const { validationResult } = require('express-validator');

const fieldValidate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ err: errors.array(), user: null });
  }
  next();
};

export default fieldValidate;
