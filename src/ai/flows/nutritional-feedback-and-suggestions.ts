'use server';
/**
 * @fileOverview This file implements a Genkit flow for providing personalized nutritional feedback and suggestions.
 *
 * - nutritionalFeedbackAndSuggestions - A function that provides AI-generated nutritional feedback, meal suggestions, and alerts.
 * - NutritionalFeedbackInput - The input type for the nutritionalFeedbackAndSuggestions function.
 * - NutritionalFeedbackOutput - The return type for the nutritionalFeedbackAndSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NutritionalFeedbackInputSchema = z.object({
  profile: z.object({
    height: z.number().describe('User height in cm.'),
    weight: z.number().describe('User current weight in kg.'),
    age: z.number().describe('User age in years.'),
    sex: z.enum(['male', 'female']).describe('User sex.'),
    activityLevel: z.string().describe('User activity level (e.g., sedentary, lightly active, moderately active, very active).'),
    targetWeight: z.number().describe('User target weight in kg.'),
    currentTDEE: z.number().describe('User current Total Daily Energy Expenditure (TDEE) goal in calories.'),
    currentMacroGoals: z.object({
      protein: z.number().describe('Daily protein goal in grams.'),
      carbs: z.number().describe('Daily carbohydrate goal in grams.'),
      fat: z.number().describe('Daily fat goal in grams.'),
    }).describe('User current daily macronutrient goals.'),
  }).describe('User profile details and goals.'),
  foodDiaryEntries: z.array(z.object({
    date: z.string().describe('Date of the food entry (YYYY-MM-DD).'),
    mealType: z.string().describe('Type of meal (e.g., breakfast, lunch, dinner, snack).'),
    foodName: z.string().describe('Name of the food item.'),
    calories: z.number().describe('Calories for the food item.'),
    protein: z.number().describe('Protein in grams for the food item.'),
    carbs: z.number().describe('Carbohydrates in grams for the food item.'),
    fat: z.number().describe('Fat in grams for the food item.'),
  })).describe('A list of food diary entries for the analysis period.'),
  weightHistory: z.array(z.object({
    date: z.string().describe('Date of weight measurement (YYYY-MM-DD).'),
    weight: z.number().describe('Recorded weight in kg.'),
  })).describe('A historical record of user weight changes.'),
  summaryPeriod: z.enum(['daily', 'weekly']).describe('The period for which to generate the nutritional feedback (e.g., "daily", "weekly").'),
  userQuestion: z.string().optional().describe('An optional specific question from the user about nutrition or exercise.'),
});
export type NutritionalFeedbackInput = z.infer<typeof NutritionalFeedbackInputSchema>;

const NutritionalFeedbackOutputSchema = z.object({
  summary: z.string().describe('A comprehensive summary of nutritional progress for the specified period, including adherence to caloric and macronutrient goals, and overall dietary patterns.'),
  mealSuggestions: z.array(z.string()).describe('Personalized meal suggestions based on the user\'s dietary patterns, goals, and any identified nutritional gaps. Each suggestion should be a complete meal idea with estimated macros if possible.'),
  nutritionalAlerts: z.array(z.string()).describe('Specific alerts regarding nutritional deficits or excesses (e.g., "Low in fiber", "High in saturated fat"), with actionable advice to address them.'),
  caloricGoalAdjustment: z.object({
    suggestedTDEE: z.number().optional().describe('A numerically suggested new Total Daily Energy Expenditure (TDEE) goal in calories, if an adjustment is recommended.'),
    rationale: z.string().optional().describe('The reasoning behind the suggested caloric goal adjustment, based on weight evolution and original goals.'),
  }).optional().describe('An optional object containing a suggested adjustment to the daily caloric goal and its rationale, if changes in weight history warrant it.'),
  answerToQuestion: z.string().optional().describe('If a user question was provided in the input, this field contains a direct and helpful answer to that question.'),
});
export type NutritionalFeedbackOutput = z.infer<typeof NutritionalFeedbackOutputSchema>;

export async function nutritionalFeedbackAndSuggestions(input: NutritionalFeedbackInput): Promise<Nut NutritionalFeedbackOutput> {
  return nutritionalFeedbackAndSuggestionsFlow(input);
}

const nutritionalFeedbackPrompt = ai.definePrompt({
  name: 'nutritionalFeedbackPrompt',
  input: {schema: NutritionalFeedbackInputSchema},
  output: {schema: NutritionalFeedbackOutputSchema},
  prompt: `You are an expert virtual nutritionist and fitness coach. Your goal is to analyze the provided user data and offer comprehensive, personalized, and actionable feedback.

Based on the user's profile, food diary entries, weight history, and specified summary period, provide:
1.  A detailed summary of their nutritional progress.
2.  Personalized meal suggestions.
3.  Alerts about any nutritional deficits or excesses.
4.  A recommendation for caloric goal adjustment if warranted by weight changes.
5.  An answer to any specific user question.

User Profile:
- Height: {{{profile.height}}} cm
- Weight: {{{profile.weight}}} kg
- Age: {{{profile.age}}} years
- Sex: {{{profile.sex}}}
- Activity Level: {{{profile.activityLevel}}}
- Target Weight: {{{profile.targetWeight}}} kg
- Current Daily Caloric Goal (TDEE): {{{profile.currentTDEE}}} calories
- Current Daily Macronutrient Goals:
    - Protein: {{{profile.currentMacroGoals.protein}}} g
    - Carbs: {{{profile.currentMacroGoals.carbs}}} g
    - Fat: {{{profile.currentMacroGoals.fat}}} g

Food Diary Entries for the review period (last {{summaryPeriod}}):
{{#each foodDiaryEntries}}
- Date: {{{date}}}, Meal Type: {{{mealType}}}, Food: {{{foodName}}}, Calories: {{{calories}}} kcal, Protein: {{{protein}}} g, Carbs: {{{carbs}}} g, Fat: {{{fat}}} g
{{/each}}
{{^if foodDiaryEntries}}
No food diary entries provided for this period. Please provide feedback based on available profile and weight data.
{{/if}}

Weight History:
{{#each weightHistory}}
- Date: {{{date}}}, Weight: {{{weight}}} kg
{{/each}}
{{^if weightHistory}}
No weight history provided.
{{/if}}

Summary Period: {{{summaryPeriod}}}

{{#if userQuestion}}
User's Specific Question: {{{userQuestion}}}
{{/if}}

Your response must be a JSON object strictly adhering to the following schema:
`
});

const nutritionalFeedbackAndSuggestionsFlow = ai.defineFlow(
  {
    name: 'nutritionalFeedbackAndSuggestionsFlow',
    inputSchema: NutritionalFeedbackInputSchema,
    outputSchema: NutritionalFeedbackOutputSchema,
  },
  async (input) => {
    const {output} = await nutritionalFeedbackPrompt(input);
    return output!;
  }
);