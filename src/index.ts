import {
  Connect,
  ContactFlowSummary,
  DeleteContactFlowCommandInput,
  ListContactFlowsCommandOutput,
  ListContactFlowsCommandInput
} from '@aws-sdk/client-connect';

import * as winston from 'winston';
export const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});
const InstanceId: string = '24be0b99-0f6c-4c81-a26a-8291be425726';
const connect = new Connect({ region: 'us-east-1' });
export async function handler(): Promise<void> {
  const flows = await listFlows(InstanceId);
  logger.info({ message: `${flows.length} Flows Found` });
  logger.info(flows);
  const sampleFlows = parseSampleFlowsBeginningWith(flows, 'Sample');
  logger.info({ message: `${sampleFlows.length} Sample Flows Found` });
  logger.info(sampleFlows);
  const defaultFlows = parseSampleFlowsBeginningWith(flows, 'Default');
  logger.info({ message: `${defaultFlows.length} Default Flows Found` });
  logger.info(defaultFlows);
  const startFlows = parseSampleFlowsBeginningWith(flows, 'start');
  logger.info({ message: `${startFlows.length} start Flows Found` });
  logger.info(startFlows);
  await deleteFlows(defaultFlows);
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function listFlows(instanceId: string): Promise<ContactFlowSummary[]> {
  let flows: ContactFlowSummary[] = [];
  let response: ListContactFlowsCommandOutput;
  let params: ListContactFlowsCommandInput = {
    InstanceId: instanceId
  };
  response = await connect.listContactFlows(params);
  if (response.ContactFlowSummaryList) {
    flows = [...flows, ...response.ContactFlowSummaryList];
    while (response.NextToken) {
      params.NextToken = response.NextToken;
      response = await connect.listContactFlows(params);

      if (response.ContactFlowSummaryList) {
        flows = [...flows, ...response.ContactFlowSummaryList];
      }
    }
  }
  return flows;
}

function parseSampleFlowsBeginningWith(contactFlows: ContactFlowSummary[], prefix: string): ContactFlowSummary[] {
  let parsedFlows: ContactFlowSummary[] = [];
  contactFlows.map(flow => {
    if (flow.Name?.startsWith(prefix)) {
      parsedFlows.push(flow);
    }
  });
  return parsedFlows;
}

async function deleteFlows(contactFlows: ContactFlowSummary[]): Promise<void> {
  for (let i = 0; i < contactFlows.length; i++) {
    logger.info({ message: `Deleting Flow ${contactFlows[i].Name}` });
    const params: DeleteContactFlowCommandInput = {
      InstanceId,
      ContactFlowId: contactFlows[i].Id
    };
    const response = await connect.deleteContactFlow(params);
    logger.info({ message: `Deleted ${contactFlows[i].Name}: ${response}` });
  }
  delay(1000);
}

handler();
