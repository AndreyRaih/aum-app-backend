import * as uid from 'uid/dist/index';
import { AumFirebaseRepository } from '../../firebase-repository';
import { formatDateToString, buildResultObject } from '../../utils';
import facts from '../../data/facts';
import practices from '../../data/practices';
import { IUserModelLinkedUpdates, IUserResultUpdates, IUserSession, UserModel } from '../../typings/user';
import { AumApiHandlers, AumFirebase, Practice, PracticeFeedback } from '../../typings';

const repository = new AumFirebaseRepository();

export const getQueueFromFirebase = (blocks: string[]): Promise<AumFirebase.AsanaBlockItem[]> => repository.getAsanaList(blocks)

export const getQueuePreview = async (id: string): Promise<Practice> => {
  const user: UserModel = await repository.getUserModel(id);
  const practice: Practice = practices[0];
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

export const parseResultsForUpdates = async ({ id, estimations}: AumApiHandlers.IApplyAsanaEstimations): Promise<IUserModelLinkedUpdates> => {
  const user: UserModel = await repository.getUserModel(id);
  const updates: IUserResultUpdates = buildResultObject(user, estimations);
  return {
    id,
    updates
  }
}

export const addNewSession = async (id: string, sessionData: PracticeFeedback ): Promise<{ sessions: IUserSession[] }> => {
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

export const createFact = (): string => {
  const pos = Math.floor(Math.random() * Math.floor(3));
  return facts[pos];
}