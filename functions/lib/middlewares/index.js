"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
function errorMiddleware(error, req, res, next) {
    if (res.headersSent) {
        next(error);
    }
    else {
        res.status(500);
        res.json(Object.assign({ message: error.message }, (process.env.NODE_ENV === 'production' ? null : { stack: error.stack })));
    }
}
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=index.js.map