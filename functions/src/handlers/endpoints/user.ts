import { AumFirebaseRepository } from '../../repositories/firebase';

const repository = new AumFirebaseRepository();

export const lastResult = () => repository.getLastResult()

export const createUserModel = (data) => repository.setUserModel(data);

export const getUserModel = (id) => repository.getUserModel(id)