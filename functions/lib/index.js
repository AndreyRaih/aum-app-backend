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
exports.get_fact = exports.add_session_result = exports.get_asana_queue = exports.get_practice_preview = exports.apply_asana_estimations = exports.update_user = exports.get_user = exports.create_user = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const handlers_1 = require("./handlers");
/**
 * Firestorage riggers;
 */
exports.create_user = functions.auth.user().onCreate(({ uid: id }) => handlers_1.create_user_model(id));
/**
 * API handlers for REST API layer
 */
// USER:
/**
 * @description `GET` method
 */
exports.get_user = functions.https.onRequest(async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            res.status(400).send(new Error('Invalid request. User ID is required'));
        }
        const result = await handlers_1.get_user_model(id);
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
/**
 * @description `POST` method
 */
exports.update_user = functions.https.onRequest(async (req, res) => {
    try {
        const { id, updates } = req.body;
        if (!id) {
            res.status(400).send(new Error('Invalid request. User ID is required'));
        }
        await handlers_1.update_user_model(id, updates);
        res.status(200).send('OK');
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
/**
 * @description `POST` method
 */
exports.apply_asana_estimations = functions.https.onRequest(async (req, res) => {
    try {
        const estimation = req.body;
        if (!estimation.id) {
            res.status(400).send(new Error('Invalid request. User ID is required'));
        }
        const { id, updates } = await handlers_1.parse_results_for_updates(estimation);
        await handlers_1.update_user_model(id, updates);
        res.status(200).send('OK');
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// CONTENT:
/**
 * @description `GET` method
 */
exports.get_practice_preview = functions.https.onRequest(async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            res.status(400).send(new Error('Invalid request. User ID is required'));
        }
        const preview = await handlers_1.practice_preview(id);
        res.status(200).json(preview);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
/**
 * @description `POST` method
 */
exports.get_asana_queue = functions.https.onRequest(async (req, res) => {
    try {
        const { blocks } = req.body;
        if (!blocks) {
            res.status(400).send(new Error('Invalid request. Blocks is required'));
        }
        const queue = await handlers_1.build_queue(blocks);
        res.status(200).json(queue);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
/**
 * @description `POST` method
 */
exports.add_session_result = functions.https.onRequest(async (req, res) => {
    try {
        const { id, session } = req.body;
        if (!id) {
            res.status(400).send(new Error('Invalid request. User ID is required'));
        }
        const updates = await handlers_1.add_session(id, session);
        await handlers_1.update_user_model(id, updates);
        res.status(200).send('OK');
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// OTHER
/**
 * @description `GET` method
 */
exports.get_fact = functions.https.onRequest(async (req, res) => {
    try {
        const fact = await handlers_1.create_fun_fact();
        res.status(200).send(fact);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//# sourceMappingURL=index.js.map