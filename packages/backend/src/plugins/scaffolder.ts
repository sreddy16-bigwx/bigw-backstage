import { CatalogClient } from '@backstage/catalog-client';
import { createBuiltinActions, createRouter } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import type { PluginEnvironment } from '../types';
import {
  createZipAction,
  createSleepAction,
  createWriteFileAction,
  createAppendFileAction,
  createMergeJSONAction,
  createMergeAction,
  createParseFileAction,
  createSerializeYamlAction,
  createSerializeJsonAction,
  createJSONataAction,
  createYamlJSONataTransformAction,
  createJsonJSONataTransformAction,
  createReplaceInFileAction,
} from '@roadiehq/scaffolder-backend-module-utils';
import { ScmIntegrations } from '@backstage/integration';
import { createConfluenceToMarkdownAction } from '@backstage/plugin-scaffolder-backend-module-confluence-to-markdown';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const catalogClient = new CatalogClient({
    discoveryApi: env.discovery,
  });
  
const integrations = ScmIntegrations.fromConfig(env.config);

const builtInActions = createBuiltinActions({
  integrations,
  config: env.config,
  catalogClient,
  reader: env.reader,
});

const actions = [
  createZipAction(),
  createSleepAction(),
  createWriteFileAction(),
  createAppendFileAction(),
  createMergeJSONAction({}),
  createMergeAction(),
  //createAwsS3CpAction(),
  //createEcrAction(),
  createParseFileAction(),
  createSerializeYamlAction(),
  createSerializeJsonAction(),
  createJSONataAction(),
  createYamlJSONataTransformAction(),
  createJsonJSONataTransformAction(),
  createReplaceInFileAction(),
  ...builtInActions,
  createConfluenceToMarkdownAction({
    integrations,
    config: env.config,
    reader: env.reader,
  })
];



  return await createRouter({
    logger: env.logger,
    config: env.config,
    database: env.database,
    reader: env.reader,
    catalogClient: catalogClient,
    identity: env.identity,
    scheduler: env.scheduler,
    permissions: env.permissions,
    actions,
  });
}

