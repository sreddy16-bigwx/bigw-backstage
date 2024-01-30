import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const azStoragePlugin = createPlugin({
  id: 'az-storage',
  routes: {
    root: rootRouteRef,
  },
});

export const AzStoragePage = azStoragePlugin.provide(
  createRoutableExtension({
    name: 'AzStoragePage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
