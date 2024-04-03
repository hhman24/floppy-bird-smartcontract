import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { apiController } from '~/controllers';

const Router = express.Router();

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs v1 are ready to use.',
  });
});

// balance in ticket
// http://localhost:8000/v1/getTicketBalance?address=0x97922AEb927A3bE7DF0439AA0F3e769FF7Ee0eC8
Router.get('/getTicketBalance', apiController.getTitketBalance);

// balnace in FLP
// http://localhost:8000/v1/getBalance?address=0x97922AEb927A3bE7DF0439AA0F3e769FF7Ee0eC8
Router.get('/getBalance', apiController.getBalance);

// deduct ticket and start match
// http://localhost:8000/v1/startMatch?address=0x97922AEb927A3bE7DF0439AA0F3e769FF7Ee0eC8
Router.get('/startMatch', apiController.startMatch);

// end the match
// http://localhost:8000/v1/endMatch
/**
 {
    "address": "0x97922AEb927A3bE7DF0439AA0F3e769FF7Ee0eC8",
    "id": 1,
    "point": 100,
    "matchData": []
 }
 */
Router.post('/endMatch', apiController.endMatch);

// get leader board
// http://localhost:8000/v1/getTop
Router.get('/getTop', apiController.getTop);

// deposit into the vault
// http://localhost:8000/v1/deposit
/**
{
  "address": "0x97922AEb927A3bE7DF0439AA0F3e769FF7Ee0eC8",
  "amount": 200,
  "transaction_id": 100, // ?
}
 */
Router.post('/deposit', apiController.deposit);

// withdraw ticket to FLP token
// http://localhost:8000/v1/withdraw
/**
{
  "address": "0x97922AEb927A3bE7DF0439AA0F3e769FF7Ee0eC8",
  "amount": 50, // ?
}
 */
Router.post('/withdraw', apiController.withdraw);

export const API_v1 = Router;
