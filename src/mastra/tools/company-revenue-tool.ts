import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';

import { Agent } from '@mastra/core/agent';

const companyRevenueAgent = new Agent({
  name: 'Company Revenue Agent',
  instructions: `
        You are a researcher that answers questions about company revenues.
    `,
  model: openai('gpt-4o-mini'),
});

export const companyRevenueTool = createTool({
    id: 'getCompanyRevenue',
    description: 'Get the company revenue.',
    inputSchema: z.object({
      companyName: z.string().describe('The legal name of the company.'),
    }),
    execute: async ({ context }) => {
      const { companyName } = context;
      console.log(`Getting revenue for ${companyName}`);
  
      const response = await companyRevenueAgent.generate(`What is the revenue of ${companyName}?`, { output: z.object({ revenue: z.number().describe('The revenue of the company.') }) })
        
      return {
        revenue: response.object.revenue,
      };
    },
  });