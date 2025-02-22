const catchAsync = (fn) => {
    return async (req, res, next) => {
      try {
        await fn(req, res, next);
      } catch (error) {
        next(error); // Pass error to Express error-handling middleware
      }
    };
  };
  
  module.exports = catchAsync;
  