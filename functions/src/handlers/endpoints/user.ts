import { AumFirebaseRepository } from '../../repositories/firebase';

export const lastResult = () => {
  const repository = new AumFirebaseRepository();
  return repository.getLastResult();
}