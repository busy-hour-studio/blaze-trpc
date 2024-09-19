import { initTRPC } from '@trpc/server';
import type { Blaze } from '@busy-hour/blaze';
import { constructTrpcAction } from '../constructor';
import type { BlazeTrpcInfo } from '../../types/helper';

export function loadTrpcAction(app: Blaze): BlazeTrpcInfo {
  const trpc = initTRPC.create();

  const router = trpc.router(constructTrpcAction(app, trpc.procedure));

  return {
    router,
    instance: trpc,
    procedure: trpc.procedure,
  };
}
