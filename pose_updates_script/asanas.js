const lying_back_1 = [
  {
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
  }
]

const lying_back_2 = {
  ardha_navasana: {
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
  }
}

const lying_forward_1 = {
  sphinx: {
    name: 'sphinx pose',
    src: 'gs://',
    level: 1,
    isCheck: false
  },
  cobra: {
    name: 'cobra pose',
    src: 'gs://',
    level: 1,
    isCheck: false
  },
  child: {
    name: 'child pose',
    src: 'gs://',
    level: 1,
    isCheck: false
  },
  shavanasana: {
    name: 'shavanasana',
    src: 'gs://',
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
}

const lying_forward_2 = {
  sahebhasana: {
    name: 'sahebhasana',
    src: 'gs://',
    level: 2,
    isCheck: false
  },
  plank: {
    name: 'plank',
    src: 'gs://',
    level: 2,
    isCheck: false
  },
  phanurasana: {
    name: 'phanurasana',
    src: 'gs://',
    level: 2,
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
  }
}

const sitting_1 = {
  janushirshasana: {
    name: 'janu shirshasana',
    src: 'gs://',
    level: 1,
    isCheck: false
  },
  revert_plank: {
    name: 'revert plank',
    src: 'gs://',
    level: 1,
    isCheck: false
  },
  sukhasana: {
    name: 'sukhasana',
    src: 'gs://',
    level: 1,
    isCheck: true,

    rules: [
      {
        line: ['ear', 'shoulder', 'hip'],
        angle: 170,
        offset: { min: 5, max: 5 }
      },
      {
        line: ['ear', 'hip', 'knee'],
        angle: 85,
        offset: { min: 5, max: 5 }
      }
    ]
  }
}

const sitting_2 = {
  turn_right: {
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
  },
  virasana: {
    name: 'virasana',
    src: 'gs://',
    level: 2,
    isCheck: false
  },
  paschimothanasana: {
    name: 'paschimothanasana',
    src: 'gs://',
    level: 2,
    isCheck: true,

    rules: [
      {
        line: ['ear', 'shoulder', 'hip'],
        angle: 170,
        offset: { min: 5, max: 5 }
      },
      {
        line: ['hip', 'knee', 'ankle'],
        angle: 180,
        offset: { min: 5, max: 5 }
      },
      {
        line: ['ear', 'hip', 'ankle'],
        angle: 160,
        offset: { min: 10, max: 10 }
      }
    ]
  }
}

const balances_1 = {
  standing: {
    name: 'standing',
    src: 'gs://',
    level: 1,
    isCheck: false
  },
  tree: {
    name: 'tree pose',
    src: 'gs://',
    level: 1,
    isCheck: false
  },
  warrior_left: {
    name: 'child pose',
    src: 'gs://',
    level: 1,
    isCheck: false
  },
  warrior_right: {
    name: 'warrior right',
    src: 'gs://',
    level: 1,
    isCheck: true,
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
}

const balances_2 = {
  twist_right: {
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
  }
}

const standing_1 = {
  utkhatasana: {
    name: 'utkhatasana',
    src: 'gs://',
    level: 1,
    isCheck: false
  },
  uttanasana: {
    name: 'uttanasana',
    src: 'gs://',
    level: 1,
    isCheck: false
  },
  trikonasana_left: {
    name: 'trikonasana left',
    src: 'gs://',
    level: 1,
    isCheck: false
  },
  trikonasana_right: {
    name: 'trikonasana right',
    src: 'gs://',
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
}

const standing_2 = {
  padonttanasana: {
    name: 'padonttanasana',
    src: 'gs://',
    level: 2,
    isCheck: false
  },
  parivakotanasana_left: {
    name: 'parivakotanasana left',
    src: 'gs://',
    level: 2,
    isCheck: false
  },
  parivakotanasana_right: {
    name: 'parivakotanasana right',
    src: 'gs://',
    level: 2,
    isCheck: false
  },
  warrior_left: {
    name: 'warrior left',
    src: 'gs://',
    level: 2,
    isCheck: false
  },
  warrior_right: {
    name: 'warrior right',
    src: 'gs://',
    level: 2,
    isCheck: true,

    rules: [
      {
        line: ['rightWrist', 'rightShoulder', 'leftWrist'],
        angle: 180,
        offset: { min: 5, max: 5 }
      },
      {
        line: ['leftHip', 'leftKnee', 'leftAnkle'],
        angle: 180,
        offset: { min: 5, max: 5 }
      },
      {
        line: ['rightAnkle', 'rightKnee', 'rightHip'],
        angle: 90,
        offset: { min: 5, max: 5 }
      }
    ]
  }
}

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
}