import type {
  TrpcMutationCallRecord,
  TrpcQueryCallRecord,
} from '@busy-hour/blaze';
import { Middleware } from '@busy-hour/blaze/types/rest';
import type {
  AnyRouter,
  CreateRouterInner,
  DefaultDataTransformer,
  DefaultErrorShape,
  initTRPC,
  RootConfig,
} from '@trpc/server';
import type { FetchHandlerRequestOptions } from '@trpc/server/adapters/fetch';

export type Trpc = ReturnType<(typeof initTRPC)['create']>;

export type Procedure = Trpc['procedure'];

export type BlazeTrpcRouter = CreateRouterInner<
  RootConfig<{
    ctx: object;
    meta: object;
    errorShape: DefaultErrorShape;
    transformer: DefaultDataTransformer;
  }>,
  // @ts-expect-error no-defined-name-props
  TrpcMutationCallRecord & TrpcQueryCallRecord
>;

export type BlazeTrpcInfo = {
  router: BlazeTrpcRouter;
  instance: Trpc;
  procedure: Procedure;
};

export interface UseBlazeTrpcOption
  extends Partial<
    Omit<
      FetchHandlerRequestOptions<AnyRouter>,
      'req' | 'createContext' | 'router'
    >
  > {
  middlewares?: Middleware[1][];
}
