import { PoseEstimationObject } from "../typings";
import { IUserResultUpdates, UserModel } from "../typings/user";

export function formatDateToString(date: Date): string {
  const normalizeValue = (value: Number): string => value > 9 ? value.toString() : `0${value}`
  return `${date.getFullYear()}-${normalizeValue(date.getMonth())}-${normalizeValue(date.getDate())}`;
}

export function buildResultObject(user: UserModel, estimation: PoseEstimationObject): IUserResultUpdates {
  const { recentResults: existRecentResults, levels: existLevels } = user;
  const { name, block ,result } = estimation;
  // Build level updates
  const updatedBlockName = Object.keys(existLevels).find(block => block.includes(block));
  const isShouldUpdate = result.every(chain => chain.isDone);
  const levels = { 
    ...existLevels,
    [updatedBlockName]: isShouldUpdate ? existLevels[updatedBlockName] + 1 : existLevels[updatedBlockName]
  };
  // Build recent results updates
  const newResult = {
    asana: name,
    block: block,
    doneEntries: result.filter(entry => entry.isDone),
    failures: result.filter(entry => !entry.isDone)
  };
  const recentResults = [...existRecentResults];
  recentResults.push(newResult);
  return {
    recentResults,
    levels
  }
}