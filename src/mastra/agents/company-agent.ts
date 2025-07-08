import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { createTool } from '@mastra/core/tools';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { z } from 'zod';

const companyTool = createTool({
  id: 'getCompanyFoundingYear',
  description: 'Get the company founding year.',
  inputSchema: z.object({
    companyName: z.string().describe('The name of the company.'),
  }),
  execute: async ({ context }) => {
    const { companyName } = context;
    console.log(`Getting founding year for ${companyName}`);

    // Simulate a lookup. We found the founding year of Satellytes to be 2018.
    if (companyName.toLowerCase().includes('satellytes')) {
      return {
        foundingYear: 2018,
      };
    }

    return {
      foundingYear: `founding year for ${companyName} could not be found.`,
    };
  },
});

export const companyAgent = new Agent({
  name: 'Company Agent',
  instructions: `
      You are a helpful company assistant that provides accurate company information.

      Your primary function is to help users get company details for specific companies. When responding:
      - Always ask for a company name if none is provided.
      - Keep responses concise but informative.

      Use the getCompanyFoundingYear tool to fetch the company founding year.
`,
  model: openai('gpt-4o-mini'),
  tools: { getCompanyFoundingYear: companyTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db', // path is relative to the .mastra/output directory
    }),
  }),
});
