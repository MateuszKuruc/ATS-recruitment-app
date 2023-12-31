const logger = require("./logger");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.substring(7);
  }
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "ValidationError" || error.name === "ValidatorError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }

  next(error);
};

module.exports = {
  errorHandler,
  tokenExtractor,
};
