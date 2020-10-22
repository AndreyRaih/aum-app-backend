import uid from 'uid';
import { AnalyseResults } from '..';
import { AumFirebaseRepository } from '../../repositories/firebase';
const repository = new AumFirebaseRepository();

export const getFullQueueFromFirebase = () => repository.getAllAsanas()

export const parseResultsForUpdates = async (id, results: AnalyseResults) => {
  let { recentResults, levels, sessions } = await repository.getUserModel(id);
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
  recentResults = [...recentResults].push(lastSessionResultObj.resultModel);
  levels = { ...levels, ...lastSessionResultObj.levelUpdates };
  sessions = [...sessions].push({
    date: lastSessionResultObj.date,
    id: lastSessionResultObj.id
  });
  return {
    recentResults,
    levels,
    sessions
  }
}