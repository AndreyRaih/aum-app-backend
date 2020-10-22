'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyseImg = void 0;
const pose_analyser_1 = require("../pose-analyser");
exports.analyseImg = (file) => {
    const analyser = new pose_analyser_1.PoseAnalyser(file);
    return analyser.getAnalyse();
};
//# sourceMappingURL=index.js.map