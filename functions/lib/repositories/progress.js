"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressDataRepository = void 0;
const admin = require("firebase-admin");
class ProgressDataRepository {
    constructor() {
        this.collection = admin.firestore().collection('progress');
    }
    getHistory() {
        return Promise.resolve();
    }
    getStatistic() {
        return Promise.resolve();
    }
}
exports.ProgressDataRepository = ProgressDataRepository;
//# sourceMappingURL=progress.js.map