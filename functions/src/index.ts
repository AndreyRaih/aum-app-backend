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

import {
  build_queue,
  create_user_model,
  get_user_model,
  update_user_model,
  practice_preview,
  add_session,
  create_fun_fact,
  parse_results_for_updates
} from './handlers';
import { AumApiHandlers, IUserModelLinkedUpdates, IUserModelUpdates, IUserResultUpdates } from './typings';

/**
 * Firestorage riggers;
 */

export const create_user = functions.auth.user().onCreate(({ uid: id }: admin.auth.UserRecord) => create_user_model(id));

/**
 * API handlers for REST API layer
 */

// USER:

export const get_user = functions.https.onRequest(async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(400).send(new Error('Invalid request. User ID is required'));
    }
    const result = await get_user_model(id as string);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export const update_user = functions.https.onRequest(async (req, res) => {
  try {
    const { id, updates } = req.body as AumApiHandlers.IUpdateUser;
    if (!id) {
      res.status(400).send(new Error('Invalid request. User ID is required'));
    }
    await update_user_model(id, updates);
    res.status(200).send('OK');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export const apply_asana_estimations = functions.https.onRequest(async (req, res) => {
  try {
    const estimation = req.body as AumApiHandlers.IApplyAsanaEstimations;
    if (!estimation.id) {
      res.status(400).send(new Error('Invalid request. User ID is required'));
    }
    const { id, updates }: IUserModelLinkedUpdates = await parse_results_for_updates(estimation);
    await update_user_model(id, updates);
    res.status(200).send('OK');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CONTENT:

export const get_practice_preview = functions.https.onRequest(async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      res.status(400).send(new Error('Invalid request. User ID is required'));
    }
    const preview = await practice_preview(id as string);
    res.status(200).json(preview);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export const get_asana_queue = functions.https.onRequest(async (req, res) => {
  try {
    const { blocks } = req.body as AumApiHandlers.IGetAsanaQueue;
    if (!blocks) {
      res.status(400).send(new Error('Invalid request. Blocks is required'));
    }
    const queue = await build_queue(blocks);
    res.status(200).json(queue);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export const add_session_result = functions.https.onRequest(async (req, res) => {
  try {
    const { id, session } = req.body as AumApiHandlers.IAddSessionResult;
    if (!id) {
      res.status(400).send(new Error('Invalid request. User ID is required'));
    }
    const updates: IUserModelUpdates = await add_session(id, session);
    await update_user_model(id, updates);
    res.status(200).send('OK');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// OTHER

export const get_fact = functions.https.onRequest(async (req, res) => {
  try {
    const fact = await create_fun_fact();
    res.status(200).send(fact);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});