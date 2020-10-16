'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_user_model = exports.get_user_model = exports.get_result = exports.build_queue = exports.update_user_result = exports.analyse_img = void 0;
const queue_1 = require("./endpoints/queue");
const user_1 = require("./endpoints/user");
const storage_1 = require("./storage");
exports.analyse_img = storage_1.analyseImg;
exports.update_user_result = storage_1.setAnalyseResultFromUserModel;
exports.build_queue = async (settings) => {
    const fullQueue = await queue_1.getAllQueueFromFirebase();
    const queue = await queue_1.buildPersonalQueue(fullQueue, settings);
    return queue;
};
exports.get_result = async () => user_1.lastResult();
exports.get_user_model = async (id) => user_1.getUserModel(id);
exports.create_user_model = async (data) => user_1.createUserModel(data);
//# sourceMappingURL=index.js.map