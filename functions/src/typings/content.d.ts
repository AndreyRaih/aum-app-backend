// ESTIMATION:

export interface IEstimationItem {
  chain: string,
  deg: any,
  isDone: Boolean
}

export type PoseEstimationObject = {
  name: string,
  block: string,
  result: IEstimationItem[]
}

// PRACTICE:

export interface IPracticeBlock {
  name: string,
  level: number,
  minLevel: number
}

export type Practice = {
  name: string,
  description: string,
  accents: string[],
  time: number,
  cal: number,
  benefits: string[],
  blocks: IPracticeBlock[],
  userQueue: string[],
  descriptionImg: string
}

export type PracticeFeedback = {
  asanaQuantity: number,
  userRange: number
}

// ASANA:

export interface IAsanaAudio {
  voice: 'male' | 'female',
  isShort: boolean,
  src: string
}

export interface IAsanaRule {
  line: string[],
  angle: number,
  offset: { 
    min: number,
    max: number
  }
}

export type AsanaItem = {
  id: string,
  name: string,
  block: string,
  level: number,
  isCheck: boolean,
  rules?: IAsanaRule[],
  src: string,
  audioSources: IAsanaAudio[],
  captureTime: number
}