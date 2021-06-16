const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.BAD_REQUEST_ERROR = 400;
exports.badRequest_Error = message => internalError(message, exports.BAD_REQUEST_ERROR);

exports.EXTERNAL_API_ERROR = 'external_api_error';
exports.externalApiError = message => internalError(message, exports.EXTERNAL_API_ERROR);
