// Workout Types
export const WORKOUT_TYPES = {
  FUNDAMENTALS: 'fundamentals',
  POWER: 'power',
  SPEED: 'speed',
  DEFENSE: 'defense',
  ENDURANCE: 'endurance',
  FREESTYLE: 'freestyle',
};

// Intensity Levels
export const INTENSITY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
};

// Audio Cue Types
export const CUE_TYPES = {
  START: 'start',
  END: 'end',
  ACTION: 'action',
  MOTIVATION: 'motivation',
  PACING: 'pacing',
};

// Time Ranges
export const TIME_RANGES = {
  EARLY: 'early',
  MID: 'mid',
  LATE: 'late',
  ANY: 'any',
};

// Focus exercises by workout type
export const FOCUS_EXERCISES = {
  [WORKOUT_TYPES.FUNDAMENTALS]: [
    'Stance & Balance',
    'Jab Technique',
    'Straight Right',
    'Hook Technique',
    'Footwork Basics',
    'Defensive Guard',
    'Jab-Cross Combo',
    'Body Positioning',
  ],
  [WORKOUT_TYPES.POWER]: [
    'Power Jab',
    'Cross Counterpunch',
    'Liver Hook',
    'Overhand Right',
    'Power Uppercut',
    'Combination Power',
    'Heavy Bag Smash',
    'Body-Head Combos',
  ],
  [WORKOUT_TYPES.SPEED]: [
    'Fast Hands Drill',
    'Double Jab',
    'Speed Combinations',
    'In-Out Movement',
    'Rapid Fire Punches',
    'Quick Counters',
    'Slip & Rip Drill',
    'Explosive Bursts',
  ],
  [WORKOUT_TYPES.DEFENSE]: [
    'Slipping Jabs',
    'Parrying Punches',
    'Rolling Under Hooks',
    'Blocking Drills',
    'Catch & Counter',
    'Defensive Pivots',
    'Shell Defense',
    'Footwork Evasion',
  ],
  [WORKOUT_TYPES.ENDURANCE]: [
    'Volume Punching',
    'Active Recovery',
    'Sustained Output',
    'Fight Conditioning',
    'Heavy Bag Marathon',
    'Pressure Drill',
    'Work Rate Focus',
    'Tempo Boxing',
  ],
  [WORKOUT_TYPES.FREESTYLE]: [
    'Creative Combinations',
    'Flow Drills',
    'Mixed Attack Types',
    'Free Expression',
    'Rhythm Changes',
    'Situational Work',
    'Adaptive Strategy',
    'Spontaneous Defense',
  ],
};