
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';

const companyFoundingAgent = new Agent({
  name: 'Company Founding Agent',
  instructions: `
        You are a researcher that answers questions about company founding years.
    `,
  model: openai('gpt-4o-mini'),
});

export const companyFoundingYearTool = createTool({
  id: 'getCompanyFoundingYear',
  description: 'Get the company founding year.',
  inputSchema: z.object({
    companyName: z.string().describe('The legal name of the company.'),
  }),
  execute: async ({ context }) => {
    const { companyName } = context;
    console.log(`Getting founding year for ${companyName}`);

    const response = await companyFoundingAgent.generate(`What is the founding year of ${companyName}?`, { output: z.object({ foundingYear: z.number().describe('The founding year of the company.') }) })
  
    return {
      foundingYear: response.object.foundingYear,
    };
  },
});