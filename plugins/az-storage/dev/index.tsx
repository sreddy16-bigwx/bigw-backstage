import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { azStoragePlugin, AzStoragePage } from '../src/plugin';

createDevApp()
  .registerPlugin(azStoragePlugin)
  .addPage({
    element: <AzStoragePage />,
    title: 'Root Page',
    path: '/az-storage'
  })
  .render();
