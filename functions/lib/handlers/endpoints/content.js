"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFact = exports.addNewSession = exports.parseResultsForUpdates = exports.getQueuePreview = exports.getFullQueueFromFirebase = void 0;
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
exports.parseResultsForUpdates = async (results) => {
    const { id } = results;
    console.log(results, id);
    let { recentResults, levels } = await repository.getUserModel(id);
    const lastSessionResultObj = {
        id: uid(),
        date: Date.now(),
        levelUpdates: {
            [results.block]: results.result.every(chain => chain.isDone) ? levels[results.block] + 1 : levels[results.block]
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
        id,
        updates: {
            recentResults,
            levels
        }
    };
};
exports.addNewSession = async (id, sessionData) => {
    const { sessions } = await repository.getUserModel(id);
    sessions.push(Object.assign({ id: uid(), date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : `0${(new Date().getMonth() + 1)}`}-${new Date().getDate() > 9 ? new Date().getDate() : `0${new Date().getDate()}`}`, duration: sessionData.asanaQuantity * 45, cal: sessionData.asanaQuantity * 10 }, sessionData));
    return { sessions };
};
exports.createFact = () => {
    const pos = Math.floor(Math.random() * Math.floor(3));
    const facts = [
        'Today in the West, Yoga is largely dominated by women. However, up until 1937 it was a male-only practice.',
        'A practice of both physical, mental and spiritual nature, there are an estimated 300 million people partaking in Yoga as of today.',
        'There is research suggesting Yoga, along with meditation, can help delay ageing.'
    ];
    return facts[pos];
};
//# sourceMappingURL=content.js.map