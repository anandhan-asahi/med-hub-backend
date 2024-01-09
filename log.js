const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
require("winston-daily-rotate-file");
const sails = require("sails");

const customLogger = createLogger({
  level: "info",
  format: combine(
    timestamp(),
    printf((info) => `${info.timestamp} ${info.message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      dirname:
        sails.config.environment === "development"
          ? "logs/development"
          : "logs/production",
      filename: "lofty",
      extension: ".log",
      maxFiles: "15d",
    }),
  ],
});
module.exports.log = {
  custom: customLogger,
};
