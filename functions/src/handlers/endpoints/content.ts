import * as uid from 'uid/dist/index';
import { AnalyseResults, SessionModel } from '../index';
import { AumFirebaseRepository } from '../../repositories/firebase';
const repository = new AumFirebaseRepository();

export const getFullQueueFromFirebase = () => repository.getAllAsanas()

export const getQueuePreview = () => {
  // Add request to db with practice types
  return {
    name: 'Stress relief practice',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare pretium placerat ut platea. Purus blandit integer sagittis massa vel est hac.',
    includes: [
      'Balances',
      'standing'
    ],
    time: 2100,
    cal: 240
  };
};

export const parseResultsForUpdates = async (id, results: AnalyseResults) => {
  let { recentResults, levels } = await repository.getUserModel(id);
  const lastSessionResultObj = {
    id: uid(),
    date: Date.now(),
    levelUpdates: {
      [results.block]: results.result.every(chain => chain.isDone) ? levels[results.block]++ : levels[results.block]
    },
    resultModel: {
      asana: results.name,
      block: results.block,
      doneEntries: results.result.filter(entry => entry.isDone),
      failures: results.result.filter(entry => !entry.isDone)
    }
  };
  recentResults.push(lastSessionResultObj.resultModel);
  levels = { ...levels, ...lastSessionResultObj.levelUpdates };
  return {
    recentResults,
    levels
  }
}

export const addNewSession = async (id: string, sessionData: SessionModel ) => {
  const { sessions } = await repository.getUserModel(id);
  sessions.push({
    id: uid(),
    date: Date.now(),
    ...sessionData
  });
  return { sessions };
}