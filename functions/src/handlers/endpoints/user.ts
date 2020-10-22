import { UserModelUpdates } from '..';
import { AumFirebaseRepository } from '../../repositories/firebase';

const repository = new AumFirebaseRepository();

export const createUserModel = (id: String) => {
  const data = { 
    id,
    name,
    ageGroup: null,
    weight: null,
    totalLevel: 1,
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

export const getUserModel = (id: String) => repository.getUserModel(id);

export const updateUserModel = (id: String, updates: UserModelUpdates) => repository.updateUserModel(id, updates);