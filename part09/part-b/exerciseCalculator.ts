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

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const exercises = args.slice(3, args.length).map(Number);
  const target = Number(args[2]);

  if (!exercises.every((value) => !isNaN(value))) {
    throw new Error('Exercise hours must be given as numbers.');
  }

  if (isNaN(target)) {
    throw new Error('Target must be a number.');
  }

  return {
    exercises,
    target
  };
};

const determineRating = (
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

const exerciseCalculator = (
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
