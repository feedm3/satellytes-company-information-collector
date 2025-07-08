import { createStep, createWorkflow } from '@mastra/core/workflows';
import { z } from 'zod';

const getFoundingYear = createStep({
  id: 'get-found-year',
  description: 'Get the founding year of a company',
  inputSchema: z.object({
    name: z.string().describe('The name of the company'),
  }),
  outputSchema: z.object({
    foundingYear: z.number(),
  }),
  execute: async ({ inputData }) => {
    if (!inputData) {
      throw new Error('Input data not found');
    }

    const response = await fetch(
      `https://api.company-information.io/v1/companies/${inputData.name}`,
    );
    const data = await response.json();
    return {
      foundingYear: data.founding_year,
    };
  },
})


const companyWorkflow = createWorkflow({
  id: 'company-workflow',
  inputSchema: z.object({
    name: z.string().describe('The name of the company'),
  }),
  outputSchema: z.object({
    foundingYear: z.number(),
  }),
})
  .then(getFoundingYear);

companyWorkflow.commit();

export { companyWorkflow };
