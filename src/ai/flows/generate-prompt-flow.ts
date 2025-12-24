'use server';
/**
 * @fileOverview Flow to generate a detailed project briefing prompt based on user input.
 *
 * - generatePrompt - A function that takes form data and generates a briefing.
 * - GeneratePromptInput - The input type for the generatePrompt function.
 * - GeneratePromptOutput - The return type for the generatePrompt function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const GeneratePromptInputSchema = z.object({
  siteName: z.string().describe('Project Name'),
  tipo: z.string().describe('Project Type (e.g., Institutional Site, SaaS App)'),
  idioma: z.string().describe('Primary Language'),
  plataforma: z.string().describe('Development Platform (e.g., Web, Mobile)'),
  isInstitutional: z.string().describe('Main focus: Institutional or Application'),
  description: z.string().describe('General project description'),
  targetAudience: z.string().describe('Target Audience'),
  funcionalidades: z.string().describe('Main functionalities (one per line)'),
  visualStyle: z.string().describe('Visual Style'),
  primaryColor: z.string().describe('Primary Color (hex)'),
  secondaryColor: z.string().describe('Secondary Color (hex)'),
  backgroundColor: z.string().describe('Background Color (hex)'),
  textColor: z.string().describe('Text Color (hex)'),
  tipografia: z.string().describe('Typography (font family)'),
  specialRequirements: z.string().describe('Special Requirements'),
  inspiration: z.string().describe('Inspirations and References'),
  additionalFeatures: z.string().describe('A formatted string listing selected additional features and their descriptions.'),
});
export type GeneratePromptInput = z.infer<typeof GeneratePromptInputSchema>;

export const GeneratePromptOutputSchema = z.object({
  prompt: z.string().describe('The final, formatted project briefing prompt.'),
});
export type GeneratePromptOutput = z.infer<typeof GeneratePromptOutputSchema>;


const prompt = ai.definePrompt({
  name: 'generateProjectBriefing',
  input: { schema: GeneratePromptInputSchema },
  output: { schema: GeneratePromptOutputSchema },
  prompt: `
    Você é um especialista em engenharia de software e design de produtos. Sua tarefa é criar um briefing de projeto (prompt) detalhado e bem estruturado a partir das informações fornecidas. O briefing deve ser claro, conciso e pronto para ser usado por uma IA de geração de código.

    Use a formatação Markdown para organizar o documento.

    Aqui estão as informações do usuário:

    ### **BRIEFING DE PROJETO: {{{siteName}}}**
    
    ---
    
    #### **1. VISÃO GERAL**
    - **Nome do Projeto:** {{{siteName}}}
    - **Tipo:** {{{tipo}}} (Foco em {{{isInstitutional}}})
    - **Idioma Principal:** {{{idioma}}}
    - **Plataforma:** {{{plataforma}}}
    - **Descrição:** {{{description}}}
    
    ---
    
    #### **2. PÚBLICO E FUNCIONALIDADES**
    - **Público-Alvo:** {{{targetAudience}}}
    - **Funcionalidades Principais:**
      {{#each (split funcionalidades '\n')}}
      - {{this}}
      {{/each}}
    
    ---
    
    #### **3. DESIGN E IDENTIDADE VISUAL**
    - **Estilo Visual:** {{{visualStyle}}}
    - **Paleta de Cores:**
      - Primária: \`{{{primaryColor}}}\`
      - Secundária: \`{{{secondaryColor}}}\`
      - Fundo: \`{{{backgroundColor}}}\`
      - Texto: \`{{{textColor}}}\`
    - **Tipografia:** {{{tipografia}}}
    
    ---
    
    #### **4. REQUISITOS ADICIONAIS**
    - **Funcionalidades Adicionais Selecionadas:**
    {{{additionalFeatures}}}
    - **Inspirações e Referências:** {{#if inspiration}}{{{inspiration}}}{{else}}Nenhuma informada.{{/if}}
    - **Requisitos Especiais:** {{#if specialRequirements}}{{{specialRequirements}}}{{else}}Nenhum informado.{{/if}}
  `,
  
});

const generatePromptFlow = ai.defineFlow(
  {
    name: 'generatePromptFlow',
    inputSchema: GeneratePromptInputSchema,
    outputSchema: GeneratePromptOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);


export async function generatePrompt(input: GeneratePromptInput): Promise<GeneratePromptOutput> {
  // A helper function to split string inputs for the handlebars template
  Handlebars.registerHelper('split', function(text: string, separator: string) {
    if (typeof text !== 'string') return [];
    return text.split(separator).map(item => item.trim()).filter(Boolean);
  });
  const result = await generatePromptFlow(input);
  return result;
}

// We need to import handlebars for the helper to work
import Handlebars from 'handlebars';
