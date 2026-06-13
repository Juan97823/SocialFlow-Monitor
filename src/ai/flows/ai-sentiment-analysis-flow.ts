'use server';
/**
 * @fileOverview A Genkit flow for analyzing the sentiment of digital interaction data.
 *
 * - aiSentimentAnalysis - A function that analyzes and categorizes the sentiment of input text.
 * - AISentimentAnalysisInput - The input type for the aiSentimentAnalysis function.
 * - AISentimentAnalysisOutput - The return type for the aiSentimentAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISentimentAnalysisInputSchema = z.object({
  interactionData: z
    .string()
    .describe('The simulated digital interaction data (e.g., text comment, review) to analyze.'),
});
export type AISentimentAnalysisInput = z.infer<typeof AISentimentAnalysisInputSchema>;

const AISentimentAnalysisOutputSchema = z.object({
  sentiment: z
    .union([z.literal('positive'), z.literal('neutral'), z.literal('negative')])
    .describe('The categorized sentiment of the interaction data: positive, neutral, or negative.'),
});
export type AISentimentAnalysisOutput = z.infer<typeof AISentimentAnalysisOutputSchema>;

export async function aiSentimentAnalysis(
  input: AISentimentAnalysisInput
): Promise<AISentimentAnalysisOutput> {
  return aiSentimentAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSentimentAnalysisPrompt',
  input: {schema: AISentimentAnalysisInputSchema},
  output: {schema: AISentimentAnalysisOutputSchema},
  prompt: `You are an AI sentiment analysis tool. Your task is to analyze the provided digital interaction data and categorize its sentiment as either 'positive', 'neutral', or 'negative'.

Interaction Data: """{{{interactionData}}}"""

Return the sentiment in the specified JSON format.`,
});

const aiSentimentAnalysisFlow = ai.defineFlow(
  {
    name: 'aiSentimentAnalysisFlow',
    inputSchema: AISentimentAnalysisInputSchema,
    outputSchema: AISentimentAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
