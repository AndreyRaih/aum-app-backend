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
admin.initializeApp()

import { build_queue, get_result, analyse_img, update_user_result, create_user_model, get_user_model } from './handlers';
import { AumFirebaseRepository } from './repositories/firebase';

/**
 * Triggers by firestorage segments. Needs for a parse users images, build models,
 * which contain result of ts.poseNet, and patching exist model of user data
 */

export const handle_user_asana_img_upload = (file) => analyse_img(file).then(result => update_user_result(result)).catch((err) => console.log(err));

/**
 * Other triggers;
 */

export const create_user = functions.auth.user().onCreate((user) => create_user_model(user));

/**
 * API handlers for a plain http requests
 */

export const get_asana_queue = functions.https.onRequest(async (req, res) => {
  try {
    const queue = await build_queue(req.query);
    res.status(200).json(queue);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export const get_user_result = functions.https.onRequest(async (req, res) => {
  try {
    const result = await get_result();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


export const get_user = functions.https.onRequest(async (req, res) => {
  try {
    const { id } = req.query;
    const result = await get_user_model(id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
