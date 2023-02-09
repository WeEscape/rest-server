import winston, { format, transports } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const { combine, timestamp, colorize, label, printf } = format;

const formatfile = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ timestamp, level, message }) => {
    return `${timestamp} ${level} : ${message}`;
  }),
);

const formatConsole = combine(
  colorize(),
  printf(({ level, message }) => {
    return `[${level}] : ${message}`;
  }),
);

export const logger = winston.createLogger({
  transports: [
    new winstonDaily({
      level: 'info',
      dirname: './logs',
      filename: `%DATE%.log`,
      maxFiles: 30,
      format: formatfile,
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: './logs/error',
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: formatConsole,
    }),
  );
}
