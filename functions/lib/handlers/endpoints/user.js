"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserModel = exports.getUserModel = exports.createUserModel = void 0;
const firebase_1 = require("../../repositories/firebase");
const repository = new firebase_1.AumFirebaseRepository();
exports.createUserModel = (id) => {
    const data = {
        id,
        name: null,
        levels: {
            standing: 1,
            sitting: 1,
            balances: 1,
            lying_forward: 1,
            lying_back: 1
        },
        recentResults: [],
        sessions: []
    };
    return repository.setUserModel(id, data);
};
exports.getUserModel = (id) => repository.getUserModel(id);
exports.updateUserModel = (id, updates) => repository.updateUserModel(id, updates);
//# sourceMappingURL=user.js.map