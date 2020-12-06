import * as uid from 'uid/dist/index';
import { AnalyseResults, SessionModel } from '../index';
import { AumFirebaseRepository } from '../../repositories/firebase';
import { formatDateToString, buildResultObject, ResultModel } from '../../utils';
import { UserModel } from './user';
import facts from '../../data/facts';
import practices from '../../data/practices';

const repository = new AumFirebaseRepository();

export const getFullQueueFromFirebase = () => repository.getAllAsanas()

export const getQueuePreview = () => {
  /* TODO: Add implement of practice constructor */
  return practices[0];
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