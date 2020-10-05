'use strict';

import { AumPoseAnalyser } from '../pose-analyser';
import { AumFirebaseRepository } from '../../repositories/firebase';

export const analyseImg = (file) => {
  const analyser = new AumPoseAnalyser(file);
  return analyser.getAnalyse();
};

export const setAnalyseResultFromUserModel = (updates) => {
  const repository = new AumFirebaseRepository();
  return repository.setUserResult(updates);
};