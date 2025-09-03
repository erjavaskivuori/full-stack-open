interface Result {
  periodLenght: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  exercises: Array<number>;
  target: number;
}

export const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const exercises = args.slice(3, args.length);
  const target = args[2];

  return validateExerciseInputs(exercises, target);
};

export const validateExerciseInputs = (exercises: unknown, target: unknown): ExerciseValues => {
  if (!Array.isArray(exercises) || exercises.length === 0) {
    throw new Error('Parameters missing');
  }

  if (
    !exercises.every((value) => !isNaN(Number(value))) ||
    isNaN(Number(target))
  ) {
    throw new Error('Malformatted parameters');
  }

  return {
    exercises: exercises.map((value) => Number(value)),
    target: Number(target)
  };
};

export const determineRating = (
  average: number,
  target: number
): { rating: number; description: string } => {
  if (average >= target) {
    return { rating: 3, description: 'Well done!' };
  } else if (average >= target / 2) {
    return { rating: 2, description: 'Not too bad but could be better' };
  } else {
    return { rating: 1, description: 'Try to exercise more next week' };
  }
};

export const exerciseCalculator = (
  exercises: Array<number>,
  target: number
): Result => {
  const periodLenght = exercises.length;
  const trainingDays = exercises.reduce(
    (acc, cur) => (cur !== 0 ? acc + 1 : acc),
    0
  );
  const totalHours = exercises.reduce((acc, cur) => acc + cur, 0);
  const average = totalHours / periodLenght;
  const { rating, description: ratingDescription } = determineRating(
    average,
    target
  );

  return {
    periodLenght,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (require.main === module) {
  try {
    const { exercises, target } = parseExerciseArguments(process.argv);
    const result = exerciseCalculator(exercises, target);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = ' An error occured.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
