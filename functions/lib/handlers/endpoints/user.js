"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserModel = exports.getUserModel = exports.createUserModel = void 0;
const firebase_repository_1 = require("../../firebase-repository");
const repository = new firebase_repository_1.AumFirebaseRepository();
exports.createUserModel = (id) => {
    return {
        id,
        name: null,
        levels: {
            standing: 1,
            sitting: 1,
            balances: 1,
            lying_forward: 1,
            lying_back: 1
        },
        onboardingComplete: {
            concept: false,
            player: false
        },
        recentResults: [],
        sessions: []
    };
    // return repository.setUserModel(id, data);
};
exports.getUserModel = (id) => repository.getUserModel(id);
exports.updateUserModel = (id, updates) => repository.updateUserModel(id, updates);
//# sourceMappingURL=user.js.map