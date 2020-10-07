"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPersonalQueue = exports.getAllQueueFromFirebase = void 0;
const firebase_1 = require("../../repositories/firebase");
exports.getAllQueueFromFirebase = async () => {
    const repository = new firebase_1.AumFirebaseRepository();
    return repository.getAllAsanas();
};
exports.buildPersonalQueue = (queue, params) => {
    return [];
};
//# sourceMappingURL=queue.js.map