import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';

export const logEvent = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvent(`${req.method}\t${req.url}\t${req.header.origin}`, 'reqLog.log');
  console.log(`${req.method} ${req.path}`);
  next();
};

export const Loggers = {
  logEvent,
  logger,
};
