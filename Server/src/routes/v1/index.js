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
// http://localhost:8000/v1/getTicketBalance?address=0x97922AEb927A3bE7DF0439AA0F3e769FF7Ee0eC8
Router.get('/startMatch', apiController.startMatch);
Router.get('/getTop', apiController.getTop);
Router.post('/deposit', apiController.deposit);
Router.post('/withdraw', apiController.withdraw);
Router.post('/endMatch', apiController.endMatch);

export const API_v1 = Router;
