'use strict';

import { ResultModel } from '../utils';
import { addNewSession, getQueueFromFirebase, getQueuePreview, parseResultsForUpdates, createFact } from './endpoints/content';
import { createUserModel, getUserModel, updateUserModel } from './endpoints/user';
import { analyseImg } from './storage';

export interface IAnalyseResultItem {
  chain: string,
  deg: any,
  isDone: Boolean
}

export type AnalyseResults = {
  id: string,
  name: string,
  block: string,
  result: Array<IAnalyseResultItem>
}

export type UserModelUpdates = {
  [key: string]: any
}

export type SessionModel = {
  asanaQuantity: number,
  userRange: number
}

export interface IPoseResults {
  id: string,
  updates: ResultModel
}

// Image handlers

export const analyse_img = analyseImg;

export const build_updates = (results: AnalyseResults): Promise<IPoseResults> => parseResultsForUpdates(results);

// Queue handlers

export const practice_preview = (id: string) => getQueuePreview(id);

export const build_queue = (blocks: string[]) => getQueueFromFirebase(blocks);

export const add_session = (id: string, data: SessionModel) => addNewSession(id, data);

// User handlers

export const get_user_model = (id: string) => getUserModel(id);

export const create_user_model = (id: string) => createUserModel(id);

export const update_user_model = (id: string, updates: UserModelUpdates) => updateUserModel(id, updates);

// Ither handlers

export const create_fun_fact = () => createFact();