import '@busy-hour/blaze';
import type { BlazeTrpcInfo, UseBlazeTrpcOption } from './helper';

declare module '@busy-hour/blaze' {
  export interface Blaze {
    useTrpc(
      this: Blaze,
      path: string,
      option?: UseBlazeTrpcOption
    ): BlazeTrpcInfo;
  }
}
