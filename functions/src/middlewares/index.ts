export function errorMiddleware(error, req, res, next): void {
  if (res.headersSent) {
    next(error)
  } else {
    res.status(500)
    res.json({
      message: error.message,
      ...(process.env.NODE_ENV === 'production' ? null : {stack: error.stack}),
    })
  }
}