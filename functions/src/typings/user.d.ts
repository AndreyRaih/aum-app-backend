import { IEstimationItem } from "./content";

// User model:

export interface IUserResult {
  asana: string,
  block: string,
  doneEntries: IEstimationItem[],
  failures: IEstimationItem[]
}

export interface IUserSession {
  id: NonNullable<string>,
  userRange: Number,
  asanaQuantity: Number,
  date: string,
  duration: Number,
  cal: Number,
}

export interface IUserOnboarding {
  concept: Boolean,
  player: Boolean,
}

export interface IUserLevels {
  standing: Number,
  sitting: Number,
  balances: Number,
  lying_forward: Number,
  lying_back: Number
}

export type UserModel = {
  id: NonNullable<string>,
  name: string,
  levels: IUserLevels,
  onboardingComplete: IUserOnboarding,
  recentResults: IUserResult[],
  sessions: IUserSession[]
}

// User model actions

export interface IUserModelUpdates {
  [key: string]: NonNullable<string> | string | IUserLevels | IUserOnboarding | IUserResult[] | IUserSession[]
}

export interface IUserModelLinkedUpdates {
  id: string,
  updates: IUserModelUpdates | IUserResultUpdates
}

export interface IUserResultUpdates extends IUserModelUpdates {
  recentResults: IUserResult[],
  levels: IUserLevels
}