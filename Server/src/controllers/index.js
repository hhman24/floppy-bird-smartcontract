import { StatusCodes } from 'http-status-codes';
import FloppyDAO from '~/models/FloppyBirdDAO';
import SmartContractDAO from '~/models/SmartContractDAO';
import ApiError from '~/utils/apiError';
const matchCode = 5;
const dbfilepath = './FloppyBird.db';

/**
 * @dev get balance controller
 */

async function _getBalance(Address) {
  const dao = new SmartContractDAO();
  return await dao.getBalance(Address);
}

const getBalance = async (req, res, next) => {
  try {
    const bls = await _getBalance(req.query.address);
    if (bls === null) throw new ApiError(StatusCodes.UNAUTHORIZED, 101, 'something wrongs');
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
    const bls = await _getTicketBalance(req.query.address);
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

/**
 * @dev end match. update infor when end match
 */

async function _endPlayerMatch(address, id, point, matchData) {
  try {
    const dao = new FloppyDAO(dbfilepath);
    //await dao.AddPlayerVault(address);
    //await dao.AddPlayerBalance(address, amount*2);
    const updateId = await dao.EndPlayerMatch(address, id, point, matchData);
    if (updateId !== null) {
      return await dao.AddPlayerBalance(address, point, null);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

const endMatch = async (req, res, next) => {
  try {
    const { address, id, point, matchData } = req.body;

    const bls = await _endPlayerMatch(address, id, point, matchData);
    if (!bls) throw new ApiError(StatusCodes.UNAUTHORIZED, 101, 'something wrongs');

    return res.status(StatusCodes.OK).json({
      code: 0,
      data: {
        result: bls,
      },
      message: 'Success',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @dev get top player.
 */

async function _getTopPlayer() {
  const dao = new FloppyDAO(dbfilepath);
  try {
    return await dao.GetTopPlayer();
  } catch (error) {
    console.log(error);
    return null;
  }
}

const getTop = async (req, res, next) => {
  try {
    var bls = await _getTopPlayer();
    if (!bls) throw new ApiError(StatusCodes.UNAUTHORIZED, 101, 'something wrongs');

    return res.status(StatusCodes.OK).json({
      code: 0,
      data: {
        result: bls,
      },
      message: 'Success',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @dev add player.
 */

async function _addPlayer(address) {
  try {
    let dao = new FloppyDAO(dbfilepath);
    return await dao.AddPlayerVault(address);
  } catch (error) {
    console.log(error);
    return null;
  }
}

const addPlayer = async (req, res, next) => {
  try {
    var bls = await _addPlayer(req.query.address);
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
 * @dev deposit ticket to balance.
 */

async function _addTicketBalance(address, amount, transaction_id) {
  try {
    const dao = new FloppyDAO(dbfilepath);
    return await dao.AddPlayerBalance(address, amount, transaction_id);
  } catch (error) {
    console.log(`add ticket balance: ${error}`);
    return null;
  }
}

const deposit = async (req, res, next) => {
  try {
    const { address, amount, transaction_id } = req.body;
    if (
      address === undefined ||
      amount === undefined ||
      amount <= 0 ||
      transaction_id === undefined
    ) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 101, 'bad request');
    }

    const result = await _addTicketBalance(address, amount, transaction_id);
    if (!result) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 102, 'bad request');
    }
    return res.status(StatusCodes.OK).json({
      code: 0,
      data: {
        result,
      },
      message: 'Success',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * @dev withdraw ticket to balance.
 */

async function _withdrawTicketBalance(address, amount) {
  try {
    const dao = new FloppyDAO(dbfilepath);
    //await dao.AddPlayerVault(address);
    //await dao.AddPlayerBalance(address, amount*2);
    return await dao.WithdrawPlayerBalance(address, amount);
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function _updateTransaction(id, transid) {
  try {
    const dao = new FloppyDAO(dbfilepath);
    //await dao.AddPlayerVault(address);
    //await dao.AddPlayerBalance(address, amount*2);
    return await dao.UpdateTransaction(id, transid);
  } catch (error) {
    console.log(error);
  }
  return null;
}

const withdraw = async (req, res, next) => {
  try {
    // get address, amount from body
    const { address, amount } = req.body;
    if (address === undefined || amount === undefined || amount <= 0) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 101, 'bad request');
    }

    const result = await _withdrawTicketBalance(address, amount);
    if (!result) {
      throw new ApiError(StatusCodes.BAD_REQUEST, 102, 'bad request');
    }

    console.log('call smart contract');
    const dao = new SmartContractDAO.SmartContractDAO();
    const trans = await dao.withdraw(address, result.amount);

    await _updateTransaction(result.transid, trans);

    return res.status(StatusCodes.OK).json({
      code: 0,
      data: { amount: result.amount, txHash: trans },
      message: 'Success',
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const apiController = {
  getBalance,
  getTitketBalance,
  startMatch,
  endMatch,
  getTop,
  addPlayer,
  deposit,
  withdraw,
};
