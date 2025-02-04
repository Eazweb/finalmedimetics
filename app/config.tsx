// app/config.ts
import type { Route } from 'next';

// Global runtime configuration
export const runtime = 'edge';

// This type ensures the configuration is applied to all routes
export type RuntimeConfig = {
  [K in Route]: typeof runtime;
};