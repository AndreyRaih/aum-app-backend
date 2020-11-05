"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewSession = exports.parseResultsForUpdates = exports.getQueuePreview = exports.getFullQueueFromFirebase = void 0;
const uid = require("uid/dist/index");
const firebase_1 = require("../../repositories/firebase");
const repository = new firebase_1.AumFirebaseRepository();
exports.getFullQueueFromFirebase = () => repository.getAllAsanas();
exports.getQueuePreview = () => {
    // Add request to db with practice types
    return {
        name: 'Stress relief practice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare pretium placerat ut platea. Purus blandit integer sagittis massa vel est hac.',
        includes: [
            'Balances',
            'standing'
        ],
        time: 2100,
        cal: 240
    };
};
exports.parseResultsForUpdates = async (id, results) => {
    let { recentResults, levels } = await repository.getUserModel(id);
    const lastSessionResultObj = {
        id: uid(),
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
    recentResults.push(lastSessionResultObj.resultModel);
    levels = Object.assign(Object.assign({}, levels), lastSessionResultObj.levelUpdates);
    return {
        recentResults,
        levels
    };
};
exports.addNewSession = async (id, sessionData) => {
    const { sessions } = await repository.getUserModel(id);
    sessions.push(Object.assign({ id: uid(), date: Date.now() }, sessionData));
    return { sessions };
};
//# sourceMappingURL=content.js.map