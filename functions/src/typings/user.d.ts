// User model:

export interface IUserNote{
  id: NonNullable<string>,
  name: string,
  date: string,
}

export interface IUserSession {
  id: NonNullable<string>,
  date: string
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

export interface IUserModel {
  id: NonNullable<string>,
  name: string,
  levels: IUserLevels,
  onboardingComplete: IUserOnboarding,
  recentActivities: string[],
  recentNotes: IUserNote[],
  sessions: IUserSession[]
}

export interface IUserModelUpdates {
  [key: string]: NonNullable<string> | string | IUserLevels | IUserOnboarding | IUserNote[] | IUserSession[]
}
