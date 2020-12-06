import { AnalyseResults } from "../handlers";
import { ILevels, IResult, UserModel } from "../handlers/endpoints/user";

export type ResultModel = {
  recentResults: IResult[],
  levels: ILevels
}

export function formatDateToString(date: Date): string {
  const normalizeValue = (value: Number): string => value > 9 ? value.toString() : `0${value}`
  return `${date.getFullYear()}-${normalizeValue(date.getMonth())}-${normalizeValue(date.getDate())}`;
}

export function buildResultObject(user: UserModel, results: AnalyseResults): ResultModel {
  const { recentResults: existRecentResults, levels: existLevels } = user;
  // Build level updates
  const updatedBlockName = Object.keys(existLevels).find(block => results.block.includes(block));
  const isShouldUpdate = results.result.every(chain => chain.isDone);
  const levels = { 
    ...existLevels,
    [updatedBlockName]: isShouldUpdate ? existLevels[updatedBlockName] + 1 : existLevels[updatedBlockName]
  };
  // Build recent results updates
  const newResult = {
    asana: results.name,
    block: results.block,
    doneEntries: results.result.filter(entry => entry.isDone),
    failures: results.result.filter(entry => !entry.isDone)
  };
  const recentResults = [...existRecentResults];
  recentResults.push(newResult);
  return {
    recentResults,
    levels
  }
}