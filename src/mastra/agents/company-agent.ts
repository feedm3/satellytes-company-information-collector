import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';

import { companyFoundingYearTool } from '../tools/company-founding-year-tool';
import { companyRevenueTool } from '../tools/company-revenue-tool';
import { SummarizationMetric } from "@mastra/evals/llm";
import {
  ContentSimilarityMetric,
  ToneConsistencyMetric,
} from "@mastra/evals/nlp";

export const companyAgent = new Agent({
  name: 'Company Agent',
  instructions: `
      You are a helpful company assistant that provides accurate company information.

      Your primary function is to help users get company details for specific companies. When responding:
      - Always ask for a company name if none is provided.
      - Keep responses concise but informative.

      Use the getCompanyFoundingYear tool to fetch the company founding year.
      Use the getCompanyRevenue tool to fetch the company revenue.
`,
  model: openai('gpt-4o-mini'),
  tools: { companyFoundingYearTool, companyRevenueTool },
  evals: {
    summarization: new SummarizationMetric(openai('gpt-4o-mini')),
    contentSimilarity: new ContentSimilarityMetric(),
    tone: new ToneConsistencyMetric(),
  },
});
