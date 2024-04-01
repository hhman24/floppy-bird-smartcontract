import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { apiController } from '~/controllers';

const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs v1 are ready to use.',
  });
});

Router.get('/getBalance', apiController.getBalance);
Router.get('/getTicketBalance', apiController.getTitketBalance);
Router.get('/startMatch', apiController.startMatch);

export const API_v1 = Router;
