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
import { analyse_img } from './storage_layer';
import { build_queue, get_result } from './api_handlers';

/**
 * Triggers by firestorage segments. Needs for a parse users images, build models,
 * which contain result of ts.poseNet, and patching exist model of user data
 */

export const analyse_user_input = analyse_img;

/**
 * API handlers for a plain http requests
 */

export const get_asana_queue = functions.https.onRequest(async (req, res) => {
  try {
    const queue = await build_queue();
    res.status(200).json(queue);
  } catch (err) {
    res.status(500).json(err);
  }
});

export const get_user_result = functions.https.onRequest(async (req, res) => {
  get_result()
  try {
    const result = await get_result();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
