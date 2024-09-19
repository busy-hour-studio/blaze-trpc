import type { AnyRouter, initTRPC } from '@trpc/server';
import type { FetchHandlerRequestOptions } from '@trpc/server/adapters/fetch';

export type Procedure = ReturnType<(typeof initTRPC)['create']>['procedure'];

export interface UseTrpcOption
  extends Partial<
    Omit<
      FetchHandlerRequestOptions<AnyRouter>,
      'req' | 'createContext' | 'router'
    >
  > {}
