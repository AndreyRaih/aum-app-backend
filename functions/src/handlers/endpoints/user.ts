import { IAnalyseResultItem, UserModelUpdates } from '..';
import { AumFirebaseRepository } from '../../repositories/firebase';

export interface IResult {
  asana: string,
  block: string,
  doneEntries: IAnalyseResultItem[],
  failures: IAnalyseResultItem[]
}

export interface ISession {
  id: NonNullable<string>,
  userRange: Number,
  asanaQuantity: Number,
  date: string,
  duration: Number,
  cal: Number,
}

export interface IOnboarding {
  introduction: Boolean,
  concept: Boolean,
  player: Boolean,
}
export interface ILevels {
  standing: Number,
  sitting: Number,
  balances: Number,
  lying_forward: Number,
  lying_back: Number
}

export type UserModel = {
  id: NonNullable<string>,
  name: string,
  levels: ILevels,
  onboardingComplete: IOnboarding,
  recentResults: IResult[],
  sessions: ISession[]
}

const repository = new AumFirebaseRepository();

export const createUserModel = (id: string) => {
  const data: UserModel = { 
    id,
    name: null,
    levels: {
      standing: 1,
      sitting: 1,
      balances: 1,
      lying_forward: 1,
      lying_back: 1
    },
    onboardingComplete: {
      introduction: false,
      concept: false,
      player: false
    },
    recentResults: [],
    sessions: []
  };
  return repository.setUserModel(id, data);
};

export const getUserModel = (id: string) => repository.getUserModel(id);

export const updateUserModel = (id: string, updates: UserModelUpdates) => repository.updateUserModel(id, updates);