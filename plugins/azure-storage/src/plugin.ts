import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const azureStoragePlugin = createPlugin({
  id: 'azure-storage',
  routes: {
    root: rootRouteRef,
  },
});

export const AzureStoragePage = azureStoragePlugin.provide(
  createRoutableExtension({
    name: 'AzureStoragePage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
