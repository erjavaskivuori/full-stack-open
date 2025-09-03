import express from 'express';
const app = express();
import { validateBmiInputs, calculateBmi } from './bmiCalculator';
import {
  exerciseCalculator,
  validateExerciseInputs
} from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  try {
    const { height: validHeight, weight: validWeight } = validateBmiInputs(
      weight,
      height
    );
    const result = calculateBmi(validHeight, validWeight);
    res.json({ height: validHeight, weight: validWeight, bmi: result });
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  try {
    const { exercises: validExercises, target: validTarget } = validateExerciseInputs(daily_exercises, target);
    const result = exerciseCalculator(validExercises, validTarget);
    res.json(result);
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
