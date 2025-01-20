import winston from 'winston';

const { printf, combine, timestamp, colorize } = winston.format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), colorize(), logFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

// Custom stream object for Morgan logger
export const stream = {
  write: (message: string) => logger.info(message.trim()),
};
