import { initTRPC } from '@trpc/server';
import { Blaze } from '@busy-hour/blaze';
import { constructTrpcAction } from '../constructor';

export function loadTrpcAction(app: Blaze) {
  const trpc = initTRPC.create();

  const router = trpc.router(constructTrpcAction(app, trpc.procedure));

  return {
    router,
    instance: trpc,
    procedure: trpc.procedure,
  };
}
