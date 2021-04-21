import { IUserModel } from "../typings/user";

export function formatDateToString(date: Date): string {
  const normalizeValue = (value: Number): string => value > 9 ? value.toString() : `0${value}`
  return `${date.getFullYear()}-${normalizeValue(date.getMonth())}-${normalizeValue(date.getDate())}`;
}

export const createUserModel = (id: string): IUserModel => {
  return { 
    id,
    name: null,
    levels: {
      standing: 1,
      sitting: 1,
      balances: 1,
      lying_forward: 1,
      lying_back: 1
    },
    onboardingComplete: {
      concept: false,
      player: false
    },
    recentResults: [],
    sessions: []
  };
};
