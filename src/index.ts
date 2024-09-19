import { Blaze } from '@busy-hour/blaze';
import { useTrpc } from './utils/injector';

export function setupBlazeTrpc() {
  if (!Blaze.prototype.useTrpc) {
    Blaze.prototype.useTrpc = useTrpc;
  }
}

setupBlazeTrpc();
