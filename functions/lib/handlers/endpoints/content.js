"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFact = exports.addNewSession = exports.parseResultsForUpdates = exports.getQueuePreview = exports.getFullQueueFromFirebase = void 0;
const uid = require("uid/dist/index");
const firebase_1 = require("../../repositories/firebase");
const utils_1 = require("../../utils");
const facts_1 = require("../../data/facts");
const practices_1 = require("../../data/practices");
const repository = new firebase_1.AumFirebaseRepository();
exports.getFullQueueFromFirebase = () => repository.getAllAsanas();
exports.getQueuePreview = () => {
    /* TODO: Add implement of practice constructor */
    return practices_1.default[0];
};
exports.parseResultsForUpdates = async (results) => {
    const { id } = results;
    const user = await repository.getUserModel(id);
    const updates = utils_1.buildResultObject(user, results);
    return {
        id,
        updates
    };
};
exports.addNewSession = async (id, sessionData) => {
    const { sessions } = await repository.getUserModel(id);
    sessions.push(Object.assign({ id: uid(), date: utils_1.formatDateToString(new Date()), duration: sessionData.asanaQuantity * 45, cal: sessionData.asanaQuantity * 10 }, sessionData));
    return { sessions };
};
exports.createFact = () => {
    const pos = Math.floor(Math.random() * Math.floor(3));
    return facts_1.default[pos];
};
//# sourceMappingURL=content.js.map