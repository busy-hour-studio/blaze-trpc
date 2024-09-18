import type { initTRPC } from '@trpc/server';

export type Procedure = ReturnType<(typeof initTRPC)['create']>['procedure'];
