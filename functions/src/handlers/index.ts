'use strict';

import { getFullQueueFromFirebase, parseResultsForUpdates } from './endpoints/content';
import { createUserModel, getUserModel, updateUserModel } from './endpoints/user';
import { analyseImg } from './storage';

export interface IAnalyseResultItem {
  chain: string,
  deg: any,
  isDone: boolean
}

export type AnalyseResults = {
  name: string,
  block: string,
  result: Array<IAnalyseResultItem>
}

export type UserModelUpdates = {
  [key: string]: any
}

// Image handlers

export const analyse_img = analyseImg;

export const build_updates = (id: string, results: AnalyseResults) => parseResultsForUpdates(id, results);

// Queue handlers

export const build_queue = () => getFullQueueFromFirebase();

// User handlers

export const get_user_model = (id: string) => getUserModel(id);

export const create_user_model = (id: string) => createUserModel(id);

export const update_user_model = (id: string, updates: UserModelUpdates) => updateUserModel(id, updates);