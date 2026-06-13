'use server';
/**
 * @fileOverview A Genkit flow for generating simulated digital interaction data based on a given topic or scenario.
 *
 * - simulatedInteractionDataGenerator - A function that handles the generation of simulated interaction data.
 * - SimulatedInteractionDataGeneratorInput - The input type for the simulatedInteractionDataGenerator function.
 * - SimulatedInteractionDataGeneratorOutput - The return type for the simulatedInteractionDataGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulatedInteractionDataGeneratorInputSchema = z.object({
  topicOrScenario: z
    .string()
    .describe(
      'A topic or scenario for which to generate simulated digital interaction data (e.g., "a new product launch", "a political debate").'
    ),
});
export type SimulatedInteractionDataGeneratorInput = z.infer<
  typeof SimulatedInteractionDataGeneratorInputSchema
>;

const InteractionDataSchema = z.object({
  user: z.string().describe('The username of the simulated interaction.'),
  timestamp: z
    .string()
    .describe('The timestamp of the interaction in ISO 8601 format (e.g., "2023-10-27T10:30:00Z").'),
  content: z.string().describe('The content of the interaction (e.g., a comment, a social media post).'),
  type: z.enum(['comment', 'post', 'tweet', 'review']).describe('The type of the interaction.'),
});

const SimulatedInteractionDataGeneratorOutputSchema = z.object({
  interactions: z.array(InteractionDataSchema).describe('An array of simulated digital interaction data.'),
});
export type SimulatedInteractionDataGeneratorOutput = z.infer<
  typeof SimulatedInteractionDataGeneratorOutputSchema
>;

export async function simulatedInteractionDataGenerator(
  input: SimulatedInteractionDataGeneratorInput
): Promise<SimulatedInteractionDataGeneratorOutput> {
  return simulatedInteractionDataGeneratorFlow(input);
}

const simulatedInteractionDataPrompt = ai.definePrompt({
  name: 'simulatedInteractionDataPrompt',
  input: {schema: SimulatedInteractionDataGeneratorInputSchema},
  output: {schema: SimulatedInteractionDataGeneratorOutputSchema},
  prompt: `You are an AI assistant tasked with generating realistic simulated digital interaction data.

Based on the following topic or scenario, generate an array of diverse and realistic interactions. Each interaction should include a username, a timestamp, the content of the interaction, and its type (comment, post, tweet, or review).

Ensure the content is varied and representative of typical online discourse related to the topic.

Topic/Scenario: {{{topicOrScenario}}}

Example Output Format:
{
  "interactions": [
    {
      "user": "Alice_User",
      "timestamp": "2023-10-27T10:05:00Z",
      "content": "This is an amazing product! Definitely recommend it.",
      "type": "review"
    },
    {
      "user": "Bob_Critic",
      "timestamp": "2023-10-27T10:15:30Z",
      "content": "I'm skeptical about these claims. Need more proof.",
      "type": "comment"
    }
  ]
}`,
});

const simulatedInteractionDataGeneratorFlow = ai.defineFlow(
  {
    name: 'simulatedInteractionDataGeneratorFlow',
    inputSchema: SimulatedInteractionDataGeneratorInputSchema,
    outputSchema: SimulatedInteractionDataGeneratorOutputSchema,
  },
  async input => {
    const {output} = await simulatedInteractionDataPrompt(input);
    return output!;
  }
);
