import { IUserModelUpdates, IUserModel } from "./user";

export type UserRepository = {
  collection: FirebaseFirestore.CollectionReference;
  getUserModel: (id: string) => Promise<IUserModel>;
  setUserModel: (id: string, data: IUserModel) => Promise<FirebaseFirestore.WriteResult>;
  updateUserModel: (id: string, updates: IUserModelUpdates) => Promise<void>;
}

export type ContentRepository = {
  tagCollection: FirebaseFirestore.CollectionReference;
  feedCollection: FirebaseFirestore.CollectionReference;
  mediaCollection: FirebaseFirestore.CollectionReference;
  getTags: () => Promise<any>;
  getFeed: () => Promise<any>;
  getMediaByFeedItem: () => Promise<any>;
}

export type ProgressRepository = {
  historyCollection: FirebaseFirestore.CollectionReference;
  statisticCollection: FirebaseFirestore.CollectionReference;
  getHistory: () => Promise<any>;
  getStatistic: () => Promise<any>;
}