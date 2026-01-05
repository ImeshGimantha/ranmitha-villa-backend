import { errorHandler } from "../utils/errorHandler.js"

const error = (err, req, res, next) => {
    errorHandler(err, req, res, next);
};

export default error;