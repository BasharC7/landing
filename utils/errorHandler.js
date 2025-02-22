class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true; // Mark operational errors explicitly
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Centralized Express error-handling middleware
  const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";
    const message = err.message || "Internal Server Error";
  
    console.error("Error:", err); // Log the error for debugging
  
    res.status(statusCode).json({ status, message });
  };
  
  module.exports = { AppError, handleError };
  