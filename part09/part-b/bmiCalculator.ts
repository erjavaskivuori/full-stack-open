interface BmiValues {
  weight: number,
  height: number
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      weight: Number(args[2]),
      height: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


const calculateBmi = (a: number, b: number): void => {
  const bmi = b / (a / 100) ** 2;
  if (bmi < 25) {
    console.log('Normal range');
  } else if (bmi < 29) {
    console.log('Overweight');
  } else {
    console.log('Obese');
  }
};

try {
  const { weight, height } = parseArguments(process.argv);
  calculateBmi(weight, height);
} catch (error: unknown) {
  let errorMessage = ' An error occured.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
