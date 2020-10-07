'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_result = exports.build_queue = exports.update_user_result = exports.analyse_img = void 0;
const queue_1 = require("./endpoints/queue");
const user_1 = require("./endpoints/user");
const storage_1 = require("./storage");
exports.analyse_img = storage_1.analyseImg;
exports.update_user_result = storage_1.setAnalyseResultFromUserModel;
exports.build_queue = async (settings) => {
    const fullQueue = await queue_1.getAllQueueFromFirebase();
    // const queue = await buildPersonalQueue(fullQueue, settings);
    return fullQueue;
};
exports.get_result = async () => await user_1.lastResult();
//# sourceMappingURL=index.js.map