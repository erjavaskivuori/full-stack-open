import express from 'express';
const app = express();
import { validateArguments, calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  try {
    const { height: validHeight, weight: validWeight } = validateArguments(
      weight,
      height
    );
    const result = calculateBmi(validHeight, validWeight);
    res.json({ height: validHeight, weight: validWeight, bmi: result });
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
