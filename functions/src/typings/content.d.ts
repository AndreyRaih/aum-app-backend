// PRACTICE:

export interface IPracticeDescription {
  id: string,
  name: string,
  description: string,
  accents: string[],
  time: number,
  cal: number,
  benefits: string[],
  blocks: IPracticeBlock[],
  descriptionImg: string
}
export interface IPracticeBlock {
  name: string,
  level: number,
  minLevel: number
}

// ASANA:

export interface IPracticeMediaAudioSource {
  voice: 'male' | 'female',
  isShort: boolean,
  src: string
}

export type IPracticeMedia = {
  id: string,
  name: string,
  block: string,
  level: number,
  src: string,
  audioSources: IPracticeMediaAudioSource[]
}