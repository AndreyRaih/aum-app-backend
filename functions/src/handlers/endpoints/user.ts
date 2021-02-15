import { AumFirebaseRepository } from '../../firebase-repository';
import { IUserModelUpdates, UserModel } from '../../typings/user';

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
      concept: false,
      player: false
    },
    recentResults: [],
    sessions: []
  };
  return repository.setUserModel(id, data);
};

export const getUserModel = (id: string) => repository.getUserModel(id);

export const updateUserModel = (id: string, updates: IUserModelUpdates) => repository.updateUserModel(id, updates);