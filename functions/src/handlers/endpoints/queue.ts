import { AumFirebaseRepository } from '../../repositories/firebase';

export const getAllQueueFromFirebase = async () => {
  const repository = new AumFirebaseRepository();
  const result = await repository.getAllAsanas();
  return result;
}

export const buildPersonalQueue = (queue, params) => {
  return [];
}