'use strict';

import { getAllQueueFromFirebase, buildPersonalQueue } from './endpoints/queue';
import { lastResult, createUserModel, getUserModel } from './endpoints/user';
import { analyseImg, setAnalyseResultFromUserModel } from './storage';

export interface AumQueueSettings {
  time?: String,
  voice?: String,
  complexity?: String
}

export const analyse_img = analyseImg;

export const update_user_result = setAnalyseResultFromUserModel;

export const build_queue = async (settings: AumQueueSettings) => {
  const fullQueue = await getAllQueueFromFirebase();
  const queue = await buildPersonalQueue(fullQueue, settings);
  return queue;
};

export const get_result = async () => lastResult();

export const get_user_model = async (id) => getUserModel(id);

export const create_user_model = async (data) => createUserModel(data);