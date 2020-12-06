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

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import * as asanas from './data/asanas';
admin.initializeApp()

import { build_queue, analyse_img, create_user_model, get_user_model, update_user_model, build_updates, AnalyseResults, SessionModel, UserModelUpdates, practice_preview, add_session, create_fun_fact } from './handlers';

/**
 * Triggers by firestorage segments. Needs for a parse users images, build models,
 * which contain result of ts.poseNet, and patching exist model of user data
 */

export const handle_user_asana_img_upload = functions.storage.object().onFinalize(async (file) => {
  try {
    const analyseResult = await analyse_img(file);
    const { id, updates } = await build_updates(analyseResult as AnalyseResults);
    await update_user_model(id, updates);
  } catch (err) {
    console.log(err)
  }
});

/**
 * Other triggers;
 */

export const create_user = functions.auth.user().onCreate(({ uid: id }) => create_user_model(id));

/**
 * API handlers for a plain http requests
 */

export const get_practice_preview = functions.https.onRequest(async (req, res) => {
  try {
    const preview = await practice_preview();
    res.status(200).json(preview);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export const get_asana_queue = functions.https.onRequest(async (req, res) => {
  try {
    const queue = await build_queue();
    res.status(200).json(queue);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export const add_session_result = functions.https.onRequest(async (req, res) => {
  try {
    const { id, session } = req.body;
    const updates: UserModelUpdates = await add_session(id, session as SessionModel);
    await update_user_model(id, updates);
    res.status(200).send('OK');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export const get_user = functions.https.onRequest(async (req, res) => {
  try {
    const { id } = req.query;
    const result = await get_user_model(id as string);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export const update_user = functions.https.onRequest(async (req, res) => {
  try {
    const { id, updates } = req.body;
    await update_user_model(id, updates);
    res.status(200).send('OK');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export const get_fact = functions.https.onRequest(async (req, res) => {
  try {
    const fact = await create_fun_fact();
    res.status(200).send(fact);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// OTHER:

/* export const get_user_result = functions.https.onRequest(async (req, res) => {
  try {
    const result = await get_result();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export const rules_deploy = functions.https.onRequest(async (request, response) => {
  for (const [doc, value] of Object.entries(asanas.asanas)) {
    await admin.firestore().collection('asanas').doc(doc).set({ value });
  };
  response.status(200);
});
 */