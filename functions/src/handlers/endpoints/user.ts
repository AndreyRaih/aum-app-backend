import { UserModelUpdates } from '..';
import { AumFirebaseRepository } from '../../repositories/firebase';

type UserModel = {
  id: string,
  name: string,
  levels: {
    standing: number,
    sitting: number,
    balances: number,
    lying_forward: number,
    lying_back: number
  },
  recentResults: any[],
  sessions: any[]
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
    recentResults: [],
    sessions: []
  };
  return repository.setUserModel(id, data);
};

export const getUserModel = (id: string) => repository.getUserModel(id);

export const updateUserModel = (id: string, updates: UserModelUpdates) => repository.updateUserModel(id, updates);