'use strict';

import { getAllQueueFromFirebase, buildPersonalQueue } from './endpoints/queue';
import { lastResult } from './endpoints/user';
import { analyseImg, setAnalyseResultFromUserModel } from './storage';

interface AumQueueSettings {
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

export const get_result = async () => await lastResult();