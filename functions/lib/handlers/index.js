'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_fun_fact = exports.update_user_model = exports.create_user_model = exports.get_user_model = exports.add_session = exports.build_queue = exports.practice_preview = exports.build_updates = exports.analyse_img = void 0;
const content_1 = require("./endpoints/content");
const user_1 = require("./endpoints/user");
const storage_1 = require("./storage");
// Image handlers
exports.analyse_img = storage_1.analyseImg;
exports.build_updates = (results) => content_1.parseResultsForUpdates(results);
// Queue handlers
exports.practice_preview = () => content_1.getQueuePreview();
exports.build_queue = () => content_1.getFullQueueFromFirebase();
exports.add_session = (id, data) => content_1.addNewSession(id, data);
// User handlers
exports.get_user_model = (id) => user_1.getUserModel(id);
exports.create_user_model = (id) => user_1.createUserModel(id);
exports.update_user_model = (id, updates) => user_1.updateUserModel(id, updates);
// Ither handlers
exports.create_fun_fact = () => content_1.createFact();
//# sourceMappingURL=index.js.map