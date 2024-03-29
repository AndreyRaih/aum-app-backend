export interface IBlock {
  name: string,
  level: number,
  minLevel: number
}

export interface IPractice {
  name: string,
  description: string,
  accents: string[],
  time: number,
  cal: number,
  benefits: string[],
  blocks: IBlock[],
  userQueue: string[],
  descriptionImg: string
}

export default <IPractice[]>[
  {
    name: 'Stress relief',
    description: "Softly practice, with an accent on balances should help you to decrease a daily stress level. It's a better solution after long working day.",
    accents: [
      'balances',
      'standing'
    ],
    time: 2100,
    cal: 240,
    benefits: [
      'Your blood pressure should be normalized in next hour',
      'Balancing and deep breathing should reduce your level of cortisol, and due to this your mood should be better',
      'Your body now is a enough stretch for a more powerful exercises'
    ],
    /* blocks: [
      { name: 'sitting', level: 1, minLevel: 1 },
      { name: 'standing', level: 1, minLevel: 1 },
      { name: 'balances', level: 1, minLevel: 1 },
      { name: 'balances', level: 2, minLevel: 1 },
      { name: 'standing', level: 2, minLevel: 1 },
      { name: 'sitting', level: 1, minLevel: 1 },
      { name: 'lying_forward', level: 1, minLevel: 1 },
      { name: 'lying_back', level: 1, minLevel: 1 }
    ] */
    blocks: [
      { name: 'sitting', level: 1, minLevel: 1 },
      { name: 'sitting', level: 2, minLevel: 1 },
      { name: 'standing', level: 1, minLevel: 1 },
      { name: 'standing', level: 2, minLevel: 1 },
      { name: 'balances', level: 1, minLevel: 1 },
      { name: 'balances', level: 2, minLevel: 1 },
      { name: 'lying_forward', level: 1, minLevel: 1 },
      { name: 'lying_forward', level: 2, minLevel: 1 },
      { name: 'lying_back', level: 1, minLevel: 1 },
      { name: 'lying_back', level: 2, minLevel: 1 }
    ],
    descriptionImg: 'https://images.unsplash.com/photo-1593810451137-5dc55105dace?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2852&q=80'
  }
]