"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastResult = void 0;
const firebase_1 = require("../../repositories/firebase");
exports.lastResult = () => {
    const repository = new firebase_1.AumFirebaseRepository();
    return repository.getLastResult();
};
//# sourceMappingURL=user.js.map