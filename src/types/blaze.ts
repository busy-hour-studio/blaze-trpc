import '@busy-hour/blaze';
import type { loadTrpcAction } from '../utils/injector/helper';
import type { UseTrpcOption } from './helper';

declare module '@busy-hour/blaze' {
  export interface Blaze {
    useTrpc(
      this: Blaze,
      path: string,
      option?: UseTrpcOption
    ): ReturnType<typeof loadTrpcAction>;
  }
}
