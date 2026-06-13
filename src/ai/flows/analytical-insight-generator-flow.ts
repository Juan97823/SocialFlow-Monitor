'use server';
/**
 * @fileOverview An AI agent for generating analytical insights and summaries from provided data.
 *
 * - generateAnalyticalInsight - A function that orchestrates the generation of analytical insights.
 * - AnalyticalInsightGeneratorInput - The input type for the generateAnalyticalInsight function.
 * - AnalyticalInsightGeneratorOutput - The return type for the generateAnalyticalInsight function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyticalInsightGeneratorInputSchema = z.object({
  trends: z.string().describe('A summary or list of observed data trends.'),
  metrics: z.string().describe('Key performance metrics and their current values.'),
  eventHistory: z.string().describe('A chronological list or summary of significant events.'),
});
export type AnalyticalInsightGeneratorInput = z.infer<typeof AnalyticalInsightGeneratorInputSchema>;

const AnalyticalInsightGeneratorOutputSchema = z.object({
  summary: z.string().describe('A concise overall summary of the analytical data.'),
  keyPatterns: z.string().describe('Identified critical patterns and recurring behaviors in the data.'),
  anomalies: z.string().describe('Any detected anomalies, outliers, or unusual events.'),
  performanceDrivers: z.string().describe('Key factors or drivers influencing performance metrics.'),
});
export type AnalyticalInsightGeneratorOutput = z.infer<typeof AnalyticalInsightGeneratorOutputSchema>;

export async function generateAnalyticalInsight(input: AnalyticalInsightGeneratorInput): Promise<AnalyticalInsightGeneratorOutput> {
  return analyticalInsightGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyticalInsightGeneratorPrompt',
  input: {schema: AnalyticalInsightGeneratorInputSchema},
  output: {schema: AnalyticalInsightGeneratorOutputSchema},
  prompt: `You are an expert data analyst. Your task is to analyze the provided data on trends, metrics, and event history, and generate a concise summary, identify key patterns, flag any anomalies, and pinpoint performance drivers.

Here is the data for your analysis:

Trends:
{{{trends}}}

Metrics:
{{{metrics}}}

Event History:
{{{eventHistory}}}

Based on this data, provide your analysis in the specified JSON format. Ensure your response is professional and insightful.`,
});

const analyticalInsightGeneratorFlow = ai.defineFlow(
  {
    name: 'analyticalInsightGeneratorFlow',
    inputSchema: AnalyticalInsightGeneratorInputSchema,
    outputSchema: AnalyticalInsightGeneratorOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
