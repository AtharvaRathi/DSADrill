export interface SM2Input {
  rating: number;
  repetitions: number;
  easeFactor: number;
  interval: number;
}

export interface SM2Output {
  repetitions: number;
  easeFactor: number;
  interval: number;
  nextReviewDate: Date;
}

export default function calculateSM2(input: SM2Input): SM2Output {
  let { rating, repetitions, easeFactor, interval } = input;

  if (rating < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
  
  if (easeFactor < 1.3) easeFactor = 1.3;

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    repetitions,
    easeFactor: parseFloat(easeFactor.toFixed(2)),
    interval,
    nextReviewDate
  };
}
