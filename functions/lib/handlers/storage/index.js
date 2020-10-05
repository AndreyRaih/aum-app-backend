'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAnalyseResultFromUserModel = exports.analyseImg = void 0;
const pose_analyser_1 = require("../pose-analyser");
const firebase_1 = require("../../repositories/firebase");
exports.analyseImg = (file) => {
    const analyser = new pose_analyser_1.AumPoseAnalyser(file);
    return analyser.getAnalyse();
};
exports.setAnalyseResultFromUserModel = (updates) => {
    const repository = new firebase_1.AumFirebaseRepository();
    return repository.setUserResult(updates);
};
//# sourceMappingURL=index.js.map