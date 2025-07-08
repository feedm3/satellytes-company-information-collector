
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { companyWorkflow } from './workflows/company-information-workflow';
import { companyAgent } from './agents/company-agent';
import { weatherAgent } from './agents/weather-agent';
import { VercelDeployer } from "@mastra/deployer-vercel";

export const mastra = new Mastra({
  workflows: { companyWorkflow },
  agents: { companyAgent, weatherAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  deployer: new VercelDeployer()
});
