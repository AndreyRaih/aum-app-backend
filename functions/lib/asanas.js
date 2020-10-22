const lying_back_1 = [
/* {
  id: 'right_twist_lying_back_1',
  name: 'right twist',
  adaptName: '',
  block: 'lying_back_1',
  src: 'gs://',
  audioSources: [
    { voice: 'male', isShort: false, src: 'gs://' },
    { voice: 'male', isShort: true, src: 'gs://' },
    { voice: 'female', isShort: false, src: 'gs://' },
    { voice: 'female', isShort: true, src: 'gs://' }
  ],
  level: 1,
  isCheck: false
},
{
  name: 'left twist',
  src: 'gs://',
  audioSources: [
    { voice: 'male', isShort: false, src: 'gs://' },
    { voice: 'male', isShort: true, src: 'gs://' },
    { voice: 'female', isShort: false, src: 'gs://' },
    { voice: 'female', isShort: true, src: 'gs://' }
  ],
  level: 1,
  isCheck: false
},
{
  name: 'legs pull',
  src: 'gs://',
  audioSources: [
    { voice: 'male', isShort: false, src: 'gs://' },
    { voice: 'male', isShort: true, src: 'gs://' },
    { voice: 'female', isShort: false, src: 'gs://' },
    { voice: 'female', isShort: true, src: 'gs://' }
  ],
  level: 1,
  isCheck: false
},
{
  name: 'bow pose',
  src: 'gs://',
  audioSources: [
    { voice: 'male', isShort: false, src: 'gs://' },
    { voice: 'male', isShort: true, src: 'gs://' },
    { voice: 'female', isShort: false, src: 'gs://' },
    { voice: 'female', isShort: true, src: 'gs://' }
  ],
  level: 1,
  isCheck: true,

  rules: [
    {
      line: ['knee', 'ankle', 'shoulder'],
      angle: 90,
      offset: { min: 5, max: 5 }
    },
    {
      line: ['ankle', 'knee', 'hip'],
      angle: 90,
      offset: { min: 5, max: 5 }
    }
  ]
} */
];
const lying_back_2 = [
/*ardha_navasana: {
  name: 'ardha navasana',
  src: 'gs://',
  level: 2,
  isCheck: false
},
leg_stertch_right: {
  name: 'leg stertch right',
  src: 'gs://',
  level: 2,
  isCheck: false
},
leg_stertch_right: {
  name: 'leg stertch left',
  src: 'gs://',
  level: 2,
  isCheck: false
},
sarvangasana: {
  name: 'sarvangasana',
  src: 'gs://',
  level: 2,
  isCheck: true,

  rules: [
    {
      line: ['ankle', 'hip', 'shoulder'],
      angle: 170,
      offset: { min: 5, max: 5 }
    },
    {
      line: ['ankle', 'knee', 'hip'],
      angle: 180,
      offset: { min: 5, max: 5 }
    }
  ]
} */
];
const lying_forward_1 = [
    {
        id: 'balasana_lying_forward_1',
        name: 'Balasana',
        adaptName: 'Childs Pose',
        block: 'lying_back_1',
        src: 'gs://aum-app-videos/lying_forward_1/child_lying_forward_1.mp4',
        audioSources: [
            { voice: 'male', isShort: false, src: 'gs://aum-app-audio/balasana_lying_forward_1/male_full.mp3' },
            { voice: 'male', isShort: true, src: 'gs://aum-app-audio/balasana_lying_forward_1/male_short.mp3' },
            { voice: 'female', isShort: false, src: 'gs://aum-app-audio/balasana_lying_forward_1/female_full.mp3' },
            { voice: 'female', isShort: true, src: 'gs://aum-app-audio/balasana_lying_forward_1/female_short.mp3' }
        ],
        level: 1,
        isCheck: false
    },
    {
        id: 'bhujangasana_lying_forward_1',
        name: 'Bhujangasana',
        adaptName: 'Sphinx Pose',
        block: 'lying_forward_1',
        src: 'gs://aum-app-videos/lying_forward_1/sphynx_lying_forward_1.mp4',
        audioSources: [
            { voice: 'male', isShort: false, src: 'gs://aum-app-audio/bhujangasana_lying_forward_1/male_full.mp3' },
            { voice: 'male', isShort: true, src: 'gs://aum-app-audio/bhujangasana_lying_forward_1/male_short.mp3' },
            { voice: 'female', isShort: false, src: 'gs://aum-app-audio/bhujangasana_lying_forward_1/female_full.mp3' },
            { voice: 'female', isShort: true, src: 'gs://aum-app-audio/bhujangasana_lying_forward_1/female_short.mp3' }
        ],
        level: 1,
        isCheck: false
    },
    {
        id: 'svanasana_lying_forward_1',
        name: 'Adho Mukha Svanasana',
        adaptName: 'Downward Facing Dog Pose',
        block: 'lying_forward_1',
        src: 'gs://aum-app-videos/lying_forward_1/shavanasana_lying_forward_1.mp4',
        audioSources: [
            { voice: 'male', isShort: false, src: 'gs://aum-app-audio/svanasana_lying_forward_1/male_full.mp3' },
            { voice: 'male', isShort: true, src: 'gs://aum-app-audio/svanasana_lying_forward_1/male_short.mp3' },
            { voice: 'female', isShort: false, src: 'gs://aum-app-audio/svanasana_lying_forward_1/female_full.mp3' },
            { voice: 'female', isShort: true, src: 'gs://aum-app-audio/svanasana_lying_forward_1/female_short.mp3' }
        ],
        level: 1,
        isCheck: true,
        rules: [
            {
                line: ['wrist', 'elbow', 'shoulder'],
                angle: 180,
                offset: { min: 10, max: 10 }
            },
            {
                line: ['hip', 'knee', 'ankle'],
                angle: 170,
                offset: { min: 5, max: 5 }
            },
            {
                line: ['wrist', 'hip', 'ankle'],
                angle: 75,
                offset: { min: 10, max: 10 }
            }
        ]
    }
    // Need cobra
];
const lying_forward_2 = [
    // need sahebhasana
    {
        id: 'phalakasana_lying_forward_2',
        name: 'Phalakasana',
        adaptName: 'Forearm plank',
        block: 'lying_forward_2',
        src: 'gs://aum-app-videos/lying_forward_2/plank-lying_forward_2.mp4',
        audioSources: [
            { voice: 'male', isShort: false, src: 'gs://aum-app-audio/phalakasana_lying_forward_2/male_full.mp3' },
            { voice: 'male', isShort: true, src: 'gs://aum-app-audio/phalakasana_lying_forward_2/male_short.mp3' },
            { voice: 'female', isShort: false, src: 'gs://aum-app-audio/phalakasana_lying_forward_2/female_full.mp3' },
            { voice: 'female', isShort: true, src: 'gs://aum-app-audio/phalakasana_lying_forward_2/female_short.mp3' }
        ],
        level: 1,
        isCheck: false
    },
    {
        id: 'dhanurasana_lying_forward_2',
        name: 'Dhanurasana',
        adaptName: 'Bow pose',
        block: 'lying_forward_2',
        src: 'gs://aum-app-videos/lying_forward_2/dhanurasana-lying_forward_2.mp4',
        audioSources: [
            { voice: 'male', isShort: false, src: 'gs://aum-app-audio/dhanurasana_lying_forward_2/male_full.mp3' },
            { voice: 'male', isShort: true, src: 'gs://aum-app-audio/dhanurasana_lying_forward_2/male_short.mp3' },
            { voice: 'female', isShort: false, src: 'gs://aum-app-audio/dhanurasana_lying_forward_2/female_full.mp3' },
            { voice: 'female', isShort: true, src: 'gs://aum-app-audio/dhanurasana_lying_forward_2/female_short.mp3' }
        ],
        level: 1,
        isCheck: true,
        rules: [
            {
                line: ['shoulder', 'wrist', 'knee'],
                angle: 90,
                offset: { min: 5, max: 5 }
            },
            {
                line: ['ankle', 'knee', 'hip'],
                angle: 80,
                offset: { min: 10, max: 10 }
            }
        ]
    },
];
const sitting_1 = [
    {
        id: 'purvottanasana_sitting_1',
        name: 'Purvottanasana',
        adaptName: 'Upward plank pose',
        block: 'sitting_1',
        src: 'gs://aum-app-videos/sitting_1/kurvatopanasana-sitting_1.mp4',
        audioSources: [
            { voice: 'male', isShort: false, src: 'gs://aum-app-audio/purvottanasana_sitting_1/male_full.mp3' },
            { voice: 'male', isShort: true, src: 'gs://aum-app-audio/purvottanasana_sitting_1/male_short.mp3' },
            { voice: 'female', isShort: false, src: 'gs://aum-app-audio/purvottanasana_sitting_1/female_full.mp3' },
            { voice: 'female', isShort: true, src: 'gs://aum-app-audio/purvottanasana_sitting_1/female_short.mp3' }
        ],
        level: 1,
        isCheck: false
    },
];
const sitting_2 = [
    /* turn_right: {
      name: 'turn right',
      src: 'gs://',
      level: 2,
      isCheck: false
    },
    turn_left: {
      name: 'turn_left',
      src: 'gs://',
      level: 2,
      isCheck: false
    }, */
    {
        id: 'virasana_sitting_2',
        name: 'Virasana',
        adaptName: 'Hero Pose',
        block: 'sitting_2',
        src: 'gs://aum-app-videos/sitting_2/virasana-sitting_2.mp4',
        audioSources: [
            { voice: 'male', isShort: false, src: 'gs://aum-app-audio/virasana_sitting_2/male_full.mp3' },
            { voice: 'male', isShort: true, src: 'gs://aum-app-audio/virasana_sitting_2/male_short.mp3' },
            { voice: 'female', isShort: false, src: 'gs://aum-app-audio/virasana_sitting_2/female_full.mp3' },
            { voice: 'female', isShort: true, src: 'gs://aum-app-audio/virasana_sitting_2/female_short.mp3' }
        ],
        level: 2,
        isCheck: false
    },
];
const balances_1 = [
    {
        id: 'utthita_bhujangasana_balances_1',
        name: 'Utthita Bhujangasana',
        adaptName: 'Standing Cobra',
        block: 'balances_1',
        src: 'gs://aum-app-videos/balances_1/standing-balances_1.mp4',
        audioSources: [
            { voice: 'male', isShort: false, src: 'gs://aum-app-audio/utthita_bhujangasana_balances_1/male_full.mp3' },
            { voice: 'male', isShort: true, src: 'gs://aum-app-audio/utthita_bhujangasana_balances_1/male_short.mp3' },
            { voice: 'female', isShort: false, src: 'gs://aum-app-audio/utthita_bhujangasana_balances_1/female_full.mp3' },
            { voice: 'female', isShort: true, src: 'gs://aum-app-audio/utthita_bhujangasana_balances_1/female_short.mp3' }
        ],
        level: 2,
        isCheck: false
    },
    // need tree
    {
        id: 'virabhadrasana_left_balances_1',
        name: 'Virabhadrasana (left)',
        adaptName: 'Warrinr pose (left side)',
        block: 'balances_1',
        src: 'gs://aum-app-videos/balances_1/warrior_left-balances_1.mp4',
        audioSources: [
            { voice: 'male', isShort: false, src: 'gs://aum-app-audio/virabhadrasana_left_balances_1/male_full.mp3' },
            { voice: 'male', isShort: true, src: 'gs://aum-app-audio/virabhadrasana_left_balances_1/male_short.mp3' },
            { voice: 'female', isShort: false, src: 'gs://aum-app-audio/virabhadrasana_left_balances_1/female_full.mp3' },
            { voice: 'female', isShort: true, src: 'gs://aum-app-audio/virabhadrasana_left_balances_1/female_short.mp3' }
        ],
        level: 1,
        isCheck: false
    },
    {
        id: 'virabhadrasana_right_balances_1',
        name: 'Virabhadrasana (right)',
        adaptName: 'Warrinr pose (right side)',
        block: 'balances_1',
        src: 'gs://aum-app-videos/balances_1/warrior_right-balances_1.mp4',
        audioSources: [
            { voice: 'male', isShort: false, src: 'gs://aum-app-audio/virabhadrasana_right_balances_1/male_full.mp3' },
            { voice: 'male', isShort: true, src: 'gs://aum-app-audio/virabhadrasana_right_balances_1/male_short.mp3' },
            { voice: 'female', isShort: false, src: 'gs://aum-app-audio/virabhadrasana_right_balances_1/female_full.mp3' },
            { voice: 'female', isShort: true, src: 'gs://aum-app-audio/virabhadrasana_right_balances_1/female_short.mp3' }
        ],
        level: 1,
        rules: [
            {
                line: ['wrist', 'hip', 'ankle'],
                angle: 180,
                offset: { min: 5, max: 5 }
            },
            {
                line: ['rightAnkle', 'rightKnee', 'hip'],
                angle: 180,
                offset: { min: 5, max: 5 }
            },
            {
                line: ['rightAnkle', 'hip', 'leftAnkle'],
                angle: 90,
                offset: { min: 5, max: 5 }
            }
        ]
    }
];
const balances_2 = [
/* twist_right: {
  name: 'twist right',
  src: 'gs://',
  level: 2,
  isCheck: false
},
twist_left: {
  name: 'twist left',
  src: 'gs://',
  level: 2,
  isCheck: false
},
nasharajasana_left: {
  name: 'nasharajasana',
  src: 'gs://',
  level: 2,
  isCheck: false
},
nasharajasana_right: {
  name: 'nasharajasana',
  src: 'gs://',
  level: 2,
  isCheck: true,
  rules: [
    {
      line: ['rightAnkle', 'rightKnee', 'rightHip'],
      angle: 45,
      offset: { min: 5, max: 5 }
    },
    {
      line: ['rightKnee', 'rightHip', 'leftAnkle'],
      angle: 75,
      offset: { min: 15, max: 15 }
    },
    {
      line: ['leftAnkle', 'leftHip', 'rightEar'],
      angle: 135,
      offset: { min: 5, max: 5 }
    }
  ]
} */
];
const standing_1 = [
    {
        id: 'utkatasana_standing_1',
        name: 'Utkatasana',
        adaptName: 'Chair pose',
        block: 'standing_1',
        src: 'gs://aum-app-videos/standing_1/chest-standing_1.mp4',
        audioSources: [
            { voice: 'male', isShort: false, src: 'gs://aum-app-audio/utkatasana_standing_1/male_full.mp3' },
            { voice: 'male', isShort: true, src: 'gs://aum-app-audio/utkatasana_standing_1/male_short.mp3' },
            { voice: 'female', isShort: false, src: 'gs://aum-app-audio/utkatasana_standing_1/female_full.mp3' },
            { voice: 'female', isShort: true, src: 'gs://aum-app-audio/utkatasana_standing_1/female_short.mp3' }
        ],
        level: 1,
        isCheck: false
    },
    {
        id: 'trikonasana_left_standing_1',
        name: 'Utthita Trikonasana',
        adaptName: 'Triangle Pose (left side)',
        block: 'standing_1',
        src: 'gs://aum-app-videos/standing_1/triokonasana_left-standing_1.mp4',
        audioSources: [
            { voice: 'male', isShort: false, src: 'gs://aum-app-audio/trikonasana_left_standing_1/male_full.mp3' },
            { voice: 'male', isShort: true, src: 'gs://aum-app-audio/trikonasana_left_standing_1/male_short.mp3' },
            { voice: 'female', isShort: false, src: 'gs://aum-app-audio/trikonasana_left_standing_1/female_full.mp3' },
            { voice: 'female', isShort: true, src: 'gs://aum-app-audio/trikonasana_left_standing_1/female_short.mp3' }
        ],
        level: 1,
        isCheck: false
    },
    {
        id: 'trikonasana_right_standing_1',
        name: 'Utthita Trikonasana',
        adaptName: 'Triangle Pose (right side)',
        block: 'standing_1',
        src: 'gs://aum-app-videos/standing_1/trikonasana_right-standing_1.mp4',
        audioSources: [
            { voice: 'male', isShort: false, src: 'gs://aum-app-audio/trikonasana_right_standing_1/male_full.mp3' },
            { voice: 'male', isShort: true, src: 'gs://aum-app-audio/trikonasana_right_standing_1/male_short.mp3' },
            { voice: 'female', isShort: false, src: 'gs://aum-app-audio/trikonasana_right_standing_1/female_full.mp3' },
            { voice: 'female', isShort: true, src: 'gs://aum-app-audio/trikonasana_right_standing_1/female_short.mp3' }
        ],
        level: 1,
        isCheck: true,
        rules: [
            {
                line: ['leftAnkle', 'leftKnee', 'leftHip'],
                angle: 180,
                offset: { min: 5, max: 5 }
            },
            {
                line: ['leftShoulder', 'leftHip', 'leftAnkle'],
                angle: 45,
                offset: { min: 5, max: 45 }
            },
            {
                line: ['leftWrist', 'leftShoulder', 'rightWrist'],
                angle: 180,
                offset: { min: 5, max: 5 }
            }
        ]
    }
];
const standing_2 = [
    {
        id: 'padangusthasana_standing_2',
        name: 'Padangusthasana',
        adaptName: 'Forward Fold',
        block: 'standing_1',
        src: 'gs://aum-app-videos/standing_2/paddotanasana-standing_2.mp4',
        audioSources: [
            { voice: 'male', isShort: false, src: 'gs://aum-app-audio/padangusthasana_standing_2/male_full.mp3' },
            { voice: 'male', isShort: true, src: 'gs://aum-app-audio/padangusthasana_standing_2/male_short.mp3' },
            { voice: 'female', isShort: false, src: 'gs://aum-app-audio/padangusthasana_standing_2/female_full.mp3' },
            { voice: 'female', isShort: true, src: 'gs://aum-app-audio/padangusthasana_standing_2/female_short.mp3' }
        ],
        level: 1,
        isCheck: false
    },
];
exports.asanas = {
    lying_back_1,
    lying_back_2,
    lying_forward_1,
    lying_forward_2,
    sitting_1,
    sitting_2,
    balances_1,
    balances_2,
    standing_1,
    standing_2
};
//# sourceMappingURL=asanas.js.map