'use server';
/**
 * @fileOverview This file implements a Genkit flow for dynamically adjusting a user's daily calorie
 * and macronutrient goals based on their weight progress and fitness objectives.
 *
 * - dynamicGoalAdjustment - A function to trigger the goal adjustment process.
 * - DynamicGoalAdjustmentInput - The input type for the dynamicGoalAdjustment function.
 * - DynamicGoalAdjustmentOutput - The return type for the dynamicGoalAdjustment function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const DynamicGoalAdjustmentInputSchema = z.object({
  age: z.number().int().positive().describe('User\'s age in years.'),
  gender: z.union([z.literal('male'), z.literal('female')]).describe('User\'s biological gender.'),
  heightCm: z.number().positive().describe('User\'s height in centimeters.'),
  currentWeightKg: z.number().positive().describe('User\'s current weight in kilograms.'),
  goalWeightKg: z.number().positive().describe('User\'s target weight in kilograms.'),
  activityLevel: z
    .union([
      z.literal('sedentary'),
      z.literal('lightly_active'),
      z.literal('moderately_active'),
      z.literal('very_active'),
      z.literal('extra_active'),
    ])
    .describe('User\'s physical activity level. Options: sedentary, lightly_active, moderately_active, very_active, extra_active.'),
  objective: z
    .union([
      z.literal('weight_loss'),
      z.literal('muscle_gain'),
      z.literal('maintenance'),
      z.literal('performance_improvement'),
    ])
    .describe('User\'s primary fitness objective.'),
  weeklyWeightChangeKg: z
    .number()
    .describe('User\'s average weekly weight change in kilograms (positive for gain, negative for loss).'),
  currentCalorieGoal: z.number().int().positive().describe('User\'s current daily calorie goal.'),
  currentProteinGoalG: z.number().positive().describe('User\'s current daily protein goal in grams.'),
  currentCarbGoalG: z.number().positive().describe('User\'s current daily carbohydrate goal in grams.'),
  currentFatGoalG: z.number().positive().describe('User\'s current daily fat goal in grams.'),
});
export type DynamicGoalAdjustmentInput = z.infer<typeof DynamicGoalAdjustmentInputSchema>;

const DynamicGoalAdjustmentOutputSchema = z.object({
  newCalorieGoal: z.number().int().positive().describe('Recommended new daily calorie goal.'),
  newProteinGoalG: z.number().positive().describe('Recommended new daily protein goal in grams.'),
  newCarbGoalG: z.number().positive().describe('Recommended new daily carbohydrate goal in grams.'),
  newFatGoalG: z.number().positive().describe('Recommended new daily fat goal in grams.'),
  adjustmentReasoning: z.string().describe('Explanation for the recommended adjustments.'),
});
export type DynamicGoalAdjustmentOutput = z.infer<typeof DynamicGoalAdjustmentOutputSchema>;

export async function dynamicGoalAdjustment(
  input: DynamicGoalAdjustmentInput
): Promise<DynamicGoalAdjustmentOutput> {
  return dynamicGoalAdjustmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dynamicGoalAdjustmentPrompt',
  input: { schema: DynamicGoalAdjustmentInputSchema },
  output: { schema: DynamicGoalAdjustmentOutputSchema },
  prompt: `You are an expert nutritionist and fitness coach. Your task is to analyze a user's current fitness data and objective, and then recommend adjustments to their daily calorie and macronutrient goals.

Use the following information to make your recommendations:

User Profile:
- Age: {{{age}}} years
- Gender: {{{gender}}}
- Height: {{{heightCm}}} cm
- Current Weight: {{{currentWeightKg}}} kg
- Goal Weight: {{{goalWeightKg}}} kg
- Activity Level: {{{activityLevel}}}
- Objective: {{{objective}}}

Current Goals:
- Current Calorie Goal: {{{currentCalorieGoal}}} kcal
- Current Protein Goal: {{{currentProteinGoalG}}} g
- Current Carbohydrate Goal: {{{currentCarbGoalG}}} g
- Current Fat Goal: {{{currentFatGoalG}}} g

Recent Progress:
- Weekly Weight Change: {{{weeklyWeightChangeKg}}} kg (a positive number means weight gain, a negative number means weight loss)

Consider the user's objective and their recent weekly weight change. If the user is not progressing towards their goal as expected (e.g., not losing weight fast enough for weight loss, or not gaining for muscle gain), make appropriate adjustments to their calorie and macronutrient targets. Explain your reasoning clearly, detailing why each adjustment was made based on their data and objective. Your adjustments should be realistic and sustainable.

For macronutrients, provide targets in grams. Ensure the macro percentages are appropriate for the objective (e.g., higher protein for muscle gain/weight loss, balanced for maintenance).
`,
});

const dynamicGoalAdjustmentFlow = ai.defineFlow(
  {
    name: 'dynamicGoalAdjustmentFlow',
    inputSchema: DynamicGoalAdjustmentInputSchema,
    outputSchema: DynamicGoalAdjustmentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('AI did not return an output for goal adjustment.');
    }
    return output;
  }
);
