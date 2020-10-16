/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_user = exports.get_user_result = exports.get_asana_queue = exports.create_user = exports.handle_user_asana_img_upload = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const handlers_1 = require("./handlers");
/**
 * Triggers by firestorage segments. Needs for a parse users images, build models,
 * which contain result of ts.poseNet, and patching exist model of user data
 */
exports.handle_user_asana_img_upload = (file) => handlers_1.analyse_img(file).then(result => handlers_1.update_user_result(result)).catch((err) => console.log(err));
/**
 * Other triggers;
 */
exports.create_user = functions.auth.user().onCreate((user) => handlers_1.create_user_model(user));
/**
 * API handlers for a plain http requests
 */
exports.get_asana_queue = functions.https.onRequest(async (req, res) => {
    try {
        const queue = await handlers_1.build_queue(req.query);
        res.status(200).json(queue);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
exports.get_user_result = functions.https.onRequest(async (req, res) => {
    try {
        const result = await handlers_1.get_result();
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
exports.get_user = functions.https.onRequest(async (req, res) => {
    try {
        const { id } = req.query;
        const result = await handlers_1.get_user_model(id);
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//# sourceMappingURL=index.js.map