"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserModel = exports.createUserModel = exports.lastResult = void 0;
const firebase_1 = require("../../repositories/firebase");
const repository = new firebase_1.AumFirebaseRepository();
exports.lastResult = () => repository.getLastResult();
exports.createUserModel = (data) => repository.setUserModel(data);
exports.getUserModel = (id) => repository.getUserModel(id);
//# sourceMappingURL=user.js.map