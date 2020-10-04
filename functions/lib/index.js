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
// Init firebase app
const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();
const db = admin.firestore();
// Init analyze-pose module
const { analyze } = require('./modules/pose-analyzer');
exports.get_user_result = async (file, context) => {
    try {
        const updates = await analyze(`gs://${file.bucket}/${file.name}`);
        const resultRef = db.collection('results_test_compare').doc('result_test');
        const doc = await resultRef.get();
        if (!doc.exists) {
            await resultRef.set({ [`${updates.name}_${updates.block}`]: updates });
        }
        else {
            await resultRef.update({ [`${updates.name}_${updates.block}`]: updates });
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.build_queue = functions.https.onRequest(async (req, res) => {
    try {
        const source = await db.collection('asanas').get().then(snapshot => snapshot.docs);
        const blockBindedList = source.map(doc => Object.values(doc.data()).map(note => (Object.assign(Object.assign({}, note), { block: doc.id }))));
        const queueBase = blockBindedList.reduce((full, block) => full.concat(Object.values(block)), []);
        const queue = queueBase.filter(asana => asana.isCheck);
        return res.status(200).json({ queue });
    }
    catch (err) {
        console.log(err);
    }
});
exports.get_result = functions.https.onRequest(async (req, res) => {
    try {
        const source = await db.collection('results_test_compare').doc('result_test').get().then(snapshot => snapshot.data());
        return res.status(200).json(Object.values(source));
    }
    catch (err) {
        console.log(err);
    }
});
//# sourceMappingURL=index.js.map