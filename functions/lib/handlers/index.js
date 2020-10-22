'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_user_model = exports.create_user_model = exports.get_user_model = exports.build_queue = exports.build_updates = exports.analyse_img = void 0;
const content_1 = require("./endpoints/content");
const user_1 = require("./endpoints/user");
const storage_1 = require("./storage");
// Image handlers
exports.analyse_img = storage_1.analyseImg;
exports.build_updates = (id, results) => content_1.parseResultsForUpdates(id, results);
// Queue handlers
exports.build_queue = () => content_1.getFullQueueFromFirebase();
// User handlers
exports.get_user_model = (id) => user_1.getUserModel(id);
exports.create_user_model = (id) => user_1.createUserModel(id);
exports.update_user_model = (id, updates) => user_1.updateUserModel(id, updates);
//# sourceMappingURL=index.js.map