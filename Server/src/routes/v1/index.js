import express from 'express';
import { StatusCodes } from 'http-status-codes';

const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs v1 are ready to use.',
  });
});

export const API_v1 = Router;
