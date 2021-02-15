import { PoseEstimationObject, PracticeFeedback } from "./content";
import { IUserModelUpdates } from "./user";

declare namespace AumApiHandlers {
  export interface IRequest {
    id: string
  }

  export interface IGetUser extends IRequest {}

  export interface IGetAsanaQueue {
    blocks: string[]
  }

  export interface IUpdateUser extends IRequest {
    updates: IUserModelUpdates
  }

  export interface IAddSessionResult extends IRequest {
    session: PracticeFeedback
  }

  export interface IApplyAsanaEstimations extends IRequest {
    estimations: PoseEstimationObject
  }
}