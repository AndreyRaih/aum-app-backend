"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseResultsForUpdates = exports.getFullQueueFromFirebase = void 0;
const uid_1 = require("uid");
const firebase_1 = require("../../repositories/firebase");
const repository = new firebase_1.AumFirebaseRepository();
exports.getFullQueueFromFirebase = () => repository.getAllAsanas();
exports.parseResultsForUpdates = async (id, results) => {
    let { recentResults, levels, sessions } = await repository.getUserModel(id);
    const lastSessionResultObj = {
        id: uid_1.default(),
        date: Date.now(),
        levelUpdates: {
            [results.block]: results.result.every(chain => chain.isDone) ? levels[results.block]++ : levels[results.block]
        },
        resultModel: {
            asana: results.name,
            block: results.block,
            doneEntries: results.result.filter(entry => entry.isDone),
            failures: results.result.filter(entry => !entry.isDone)
        }
    };
    recentResults = [...recentResults].push(lastSessionResultObj.resultModel);
    levels = Object.assign(Object.assign({}, levels), lastSessionResultObj.levelUpdates);
    sessions = [...sessions].push({
        date: lastSessionResultObj.date,
        id: lastSessionResultObj.id
    });
    return {
        recentResults,
        levels,
        sessions
    };
};
//# sourceMappingURL=content.js.map