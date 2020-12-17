import * as uid from 'uid/dist/index';
import { AnalyseResults, SessionModel } from '../index';
import { AumFirebaseRepository } from '../../repositories/firebase';
import { formatDateToString, buildResultObject, ResultModel } from '../../utils';
import { UserModel } from './user';
import facts from '../../data/facts';
import practices, { IPractice } from '../../data/practices';

const repository = new AumFirebaseRepository();

export const getQueueFromFirebase = (blocks: string[]) => repository.getAsanas(blocks)

export const getQueuePreview = async (id: string): Promise<IPractice> => {
  const user: UserModel = await repository.getUserModel(id);
  const practice: IPractice = practices[0];
  const userQueue = practice.blocks.map(block => {
    const userLevel = user.levels[block.name];
    if (!userLevel) {
      throw new Error(`[getQueuePreview]: Something wrong, block with name "${block.name}" doesn't exist!`);
    }
    if (block.level <= userLevel) {
      return `${block.name}_${block.level}`;
    } else if (userLevel >= block.minLevel) {
      return `${block.name}_${userLevel}`
    } else {
      return null;
    }
  }).filter(block => Boolean(block));
  return { ...practice, userQueue };
};

export const parseResultsForUpdates = async (results: AnalyseResults) => {
  const { id } = results;
  const user: UserModel = await repository.getUserModel(id);
  const updates: ResultModel = buildResultObject(user, results);
  return {
    id,
    updates
  }
}

export const addNewSession = async (id: string, sessionData: SessionModel ) => {
  const { sessions } = await repository.getUserModel(id);
  sessions.push({
    id: uid(),
    date: formatDateToString(new Date()),
    duration: sessionData.asanaQuantity * 45,
    cal: sessionData.asanaQuantity * 10,
    ...sessionData
  });
  return { sessions };
}

export const createFact = () => {
  const pos = Math.floor(Math.random() * Math.floor(3));
  return facts[pos];
}