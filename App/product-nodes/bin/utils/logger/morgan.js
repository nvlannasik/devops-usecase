const morgan = require("morgan");
const logger = require("./log");

const stream = {
  write: (message) => {
    logger.http(message);
  },
};

// const skip = () => {
//   const env = process.env.NODE_ENV || "dev";
//   return env !== "dev";
// };

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);

module.exports = morganMiddleware;
