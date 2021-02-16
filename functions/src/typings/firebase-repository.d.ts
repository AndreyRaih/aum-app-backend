import { AsanaItem } from "./content";
import { IUserModelUpdates, UserModel } from "./user";

declare namespace AumFirebase {
  export type AsanaBlockQuery = {
    id: string,
    block: string
  }
  
  export type AsanaBlockItem = {
    block: string,
    value: AsanaItem[]
  }
}

export type AumRepository = {
  db: FirebaseFirestore.Firestore,
  asanasCollection: FirebaseFirestore.CollectionReference;
  usersCollection: FirebaseFirestore.CollectionReference;
  getAsanaList: (block: string[]) => Promise<AumFirebase.AsanaBlockItem[]>;
  getAsana: (query: AumFirebase.AsanaBlockQuery) => Promise<AumFirebase.AsanaBlockItem>;
  getUserModel: (id: string) => Promise<UserModel>;
  setUserModel: (id: string, data: UserModel) => Promise<FirebaseFirestore.WriteResult>;
  updateUserModel: (id: string, updates: IUserModelUpdates) => Promise<void>;
}