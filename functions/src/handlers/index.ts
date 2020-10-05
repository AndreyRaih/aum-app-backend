'use strict';

import { getAllQueueFromFirebase, buildPersonalQueue } from './endpoints/queue';
import { lastResult } from './endpoints/user';
import { analyseImg } from './storage';

export interface AumQueueParameters {
  time?: String,
  voice?: String,
  complexity?: String
}

export const analyse_img = analyseImg;

export const build_queue = async (params: AumQueueParameters) => {
  const fullQueue = await getAllQueueFromFirebase();
  const queue = await buildPersonalQueue(fullQueue, params);
  return queue;
};

export const get_result = async () => await lastResult();