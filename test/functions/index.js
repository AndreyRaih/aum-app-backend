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
admin.initializeApp()
const db = admin.firestore();
// Init analyze-pose module
const { analyze } = require('./modules/pose-analyzer');

exports.get_user_result = functions.https.onRequest(async (req, res) => {
  try {
    const updates = await analyze(`gs://aum-app-images/bow pose-lying_back_1.jpeg`);
    await db.collection('results_test_compare').doc(`result_${new Date().toLocaleDateString()}`).set({ updates });
    return res.status(200).json({ updates });
  } catch (err) {
    console.log(err);
  }
});
