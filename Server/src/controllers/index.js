'use strict';
import { StatusCodes } from 'http-status-codes';
import FloppyDAO from '~/models/FloppyBirdDAO';
import SmartContractDAO from '~/models/SmartContractDAO';
import ApiError from '~/utils/apiError';
const matchCode = 5;
const dbfilepath = '../models/FoppyBird.db';

/**
 * @dev get balance controller
 */

async function _getBalance(Address) {
  const dao = new SmartContractDAO();
  return await dao.getBalance(Address);
}

const getBalance = async (req, res, next) => {
  try {
    let bls = await _getBalance(req.query.address);
    if (!bls) throw new ApiError(StatusCodes.UNAUTHORIZED, 101, 'something wrongs');
    return res.status(StatusCodes.OK).json({
      code: 0,
      data: {
        balances: bls,
      },
      message: 'Success',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @dev get ticket balance. If the player is not exist, create new player
 */

async function _getTicketBalance(address) {
  const dao = new FloppyDAO(dbfilepath);
  try {
    await dao.AddPlayerVault(address);
    return await dao.GetPlayerBalance(address);
  } catch (error) {
    console.log(error);
    return null;
  }
}

const getTitketBalance = async (req, res, next) => {
  try {
    var bls = await _getTicketBalance(req.query.address);
    if (!bls) throw new ApiError(StatusCodes.UNAUTHORIZED, 101, 'something wrongs');
    return res.status(StatusCodes.OK).json({
      code: 0,
      data: {
        balances: bls,
      },
      message: 'Success',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * @dev start match. Deduct the ticket first, then start the match
 */

async function _startPlayerMatch(address) {
  try {
    const dao = new FloppyDAO(dbfilepath);
    const code = await dao.WithdrawPlayerBalance(address, matchCode);
    if (code !== null) {
      return await dao.StartPlayerMatch(address);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

const startMatch = async (req, res, next) => {
  try {
    const bls = await _startPlayerMatch(req.query.address);
    if (!bls) throw new ApiError(StatusCodes.UNAUTHORIZED, 101, 'something wrongs');
    return res.status(StatusCodes.OK).json({
      code: 0,
      data: {
        Id: bls,
      },
      message: 'Success',
    });
  } catch (error) {
    next(error);
  }
};

export const apiController = {
  getBalance,
  getTitketBalance,
  startMatch,
};
