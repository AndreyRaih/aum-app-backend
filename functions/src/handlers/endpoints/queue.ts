import { AumFirebaseRepository } from '../../repositories/firebase';

export const getAllQueueFromFirebase = async () => {
  const repository = new AumFirebaseRepository();
  return repository.getAllAsanas();
}

export const buildPersonalQueue = (queue, params) => {
  return [];
}