import { IUserModelUpdates, IUserModel, IUserLevels } from "./user";

export type UserRepository = {
  collection: FirebaseFirestore.CollectionReference;
  getUserModel: (id: string) => Promise<IUserModel>;
  setUserModel: (id: string, data: IUserModel) => Promise<FirebaseFirestore.WriteResult>;
  updateUserModel: (id: string, updates: IUserModelUpdates) => Promise<void>;
}

export type ContentRepository = {
  collection: FirebaseFirestore.CollectionReference;
  getTags: () => Promise<string[]>;
  getFeed: () => Promise<any>;
  getMediaByFeedItem: () => Promise<any>;
}

export type ProgressRepository = {
  collection: FirebaseFirestore.CollectionReference;
  getHistory: () => Promise<any>;
  getStatistic: () => Promise<any>;
}