const winston = require("winston");
require("dotenv").config();

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// const level = () => {
//   //testing
//   const env = process.env.NODE_ENV || "development";
//   const isDevelopment = env === "development";
//   return isDevelopment ? "debug" : "warn";
// };

const color = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(color);

const format = winston.format.combine(
  winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss:ms" }),
  winston.format.printf(
    (info) =>
      `${info.timestamp} - [${info.level.toUpperCase()}] ${info.message}`
  ),
  winston.format.colorize({ all: true })
);

const transports = [
  new winston.transports.Console(),
  // new KafkaTransport({
  //   level: "http",
  //   format: winston.format.json(),
  //   topic: config.get("/kafka/topic"),
  //   kafkaOptions: {
  //     brokers: [config.get("/kafka/url")],
  //     clientId: "service-login",
  //   },
  //   formatter: JSON.stringify,
  // }),
];

const logger = winston.createLogger({
  level: "http",
  levels,
  format,
  transports,
});

module.exports = logger;
