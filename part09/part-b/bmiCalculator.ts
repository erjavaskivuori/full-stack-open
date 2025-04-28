interface BmiValues {
  weight: number;
  height: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  return validateArguments(args[2], args[3]);
};

export const validateArguments = (
  weight: unknown,
  height: unknown
): BmiValues => {
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      weight: Number(weight),
      height: Number(height)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (a: number, b: number): string => {
  const bmi = b / (a / 100) ** 2;
  if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 29) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

if (require.main === module) {
  try {
    const { weight, height } = parseArguments(process.argv);
    const result = calculateBmi(weight, height);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = ' An error occured.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
