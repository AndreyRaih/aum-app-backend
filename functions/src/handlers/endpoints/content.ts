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

export const parseResultsForUpdates = async (results: AnalyseResults) => {
  const { id } = results;
  console.log(results, id);
  let { recentResults, levels } = await repository.getUserModel(id);
  const lastSessionResultObj = {
    id: uid(),
    date: Date.now(),
    levelUpdates: {
      [results.block]: results.result.every(chain => chain.isDone) ? levels[results.block] + 1 : levels[results.block]
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
    id,
    updates: {
      recentResults,
      levels
    }
  }
}

export const addNewSession = async (id: string, sessionData: SessionModel ) => {
  const { sessions } = await repository.getUserModel(id);
  sessions.push({
    id: uid(),
    date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1) : `0${(new Date().getMonth() + 1)}`}-${new Date().getDate() > 9 ? new Date().getDate() : `0${new Date().getDate()}`}`,
    duration: sessionData.asanaQuantity * 45,
    cal: sessionData.asanaQuantity * 10,
    ...sessionData
  });
  return { sessions };
}

export const createFact = () => {
  const pos = Math.floor(Math.random() * Math.floor(3));
  const facts = [
    'Today in the West, Yoga is largely dominated by women. However, up until 1937 it was a male-only practice.',
    'A practice of both physical, mental and spiritual nature, there are an estimated 300 million people partaking in Yoga as of today.',
    'There is research suggesting Yoga, along with meditation, can help delay ageing.'
  ];
  return facts[pos];
}