'use strict';

import { PoseAnalyser } from '../pose-analyser';

export const analyseImg = (file) => {
  const analyser = new PoseAnalyser(file);
  return analyser.getAnalyse();
};
