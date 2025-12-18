'use server';
/**
 * @fileOverview Um agente de IA para busca de locais.
 *
 * - searchAgent - Uma função que busca por locais.
 * - SearchAgentInput - O tipo de entrada para a função.
 * - SearchAgentOutput - O tipo de retorno para a função.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchAgentInputSchema = z.object({
  busca: z.string().describe('O que deve ser buscado'),
  cidade: z.string().describe('A cidade onde a busca deve ser realizada'),
});
export type SearchAgentInput = z.infer<typeof SearchAgentInputSchema>;

const SearchAgentOutputSchema = z.array(
  z.object({
    nome: z.string().describe('O nome do local encontrado'),
    info: z.string().describe('Informações adicionais sobre o local'),
  })
);

export type SearchAgentOutput = z.infer<typeof SearchAgentOutputSchema>;

export async function searchAgent(
  input: SearchAgentInput
): Promise<SearchAgentOutput> {
  return searchAgentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchAgentPrompt',
  input: {schema: SearchAgentInputSchema},
  output: {schema: SearchAgentOutputSchema},
  prompt: `
        Você é um assistente de busca. Sua tarefa é encontrar locais com base na busca e cidade fornecidas.
        Para cada local encontrado, retorne o nome e uma breve informação adicional (como endereço ou categoria).
        Busca: {{{busca}}}
        Cidade: {{{cidade}}}
        Retorne até 10 resultados.
    `,
  config: {
    temperature: 0.2,
  },
});

const searchAgentFlow = ai.defineFlow(
  {
    name: 'searchAgentFlow',
    inputSchema: SearchAgentInputSchema,
    outputSchema: SearchAgentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
