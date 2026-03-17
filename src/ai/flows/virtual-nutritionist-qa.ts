'use server';
/**
 * @fileOverview A virtual nutritionist AI agent for answering general questions about nutrition and exercise.
 *
 * - askVirtualNutritionist - A function that handles asking questions to the virtual nutritionist.
 * - VirtualNutritionistQAInput - The input type for the askVirtualNutritionist function.
 * - VirtualNutritionistQAOutput - The return type for the askVirtualNutritionist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VirtualNutritionistQAInputSchema = z
  .string()
  .describe('A question about nutrition or exercise.');
export type VirtualNutritionistQAInput = z.infer<typeof VirtualNutritionistQAInputSchema>;

const VirtualNutritionistQAOutputSchema = z
  .string()
  .describe('A helpful and personalized answer from the virtual nutritionist.');
export type VirtualNutritionistQAOutput = z.infer<typeof VirtualNutritionistQAOutputSchema>;

export async function askVirtualNutritionist(
  input: VirtualNutritionistQAInput
): Promise<VirtualNutritionistQAOutput> {
  return virtualNutritionistQAFlow(input);
}

const prompt = ai.definePrompt({
  name: 'virtualNutritionistQAPrompt',
  input: {schema: VirtualNutritionistQAInputSchema},
  output: {schema: VirtualNutritionistQAOutputSchema},
  prompt: `You are NutriAI, a friendly and knowledgeable virtual nutritionist and fitness coach.
Your goal is to provide helpful, personalized, and accurate answers to questions about nutrition and exercise.
Keep your responses concise, easy to understand, and encouraging.

User Question: {{{this}}}`,
});

const virtualNutritionistQAFlow = ai.defineFlow(
  {
    name: 'virtualNutritionistQAFlow',
    inputSchema: VirtualNutritionistQAInputSchema,
    outputSchema: VirtualNutritionistQAOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
