import { AumFirebaseRepository } from '../../repositories/firebase';

export const getAllQueueFromFirebase = async () => {
  const repository = new AumFirebaseRepository();
  return repository.getAllAsanas();
}

export const buildPersonalQueue = (queue, params) => {
  const { time, voice, complexity } = params;
  return queue.filter(block => );
}