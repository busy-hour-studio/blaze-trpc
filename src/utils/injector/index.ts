import type { Blaze } from '@busy-hour/blaze';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import type { BlazeTrpcInfo, UseBlazeTrpcOption } from '../../types/helper';
import { loadTrpcAction } from './helper';

export function useTrpc(
  this: Blaze,
  path: string,
  { endpoint = '/trpc', middlewares = [], ...option }: UseBlazeTrpcOption = {}
): BlazeTrpcInfo {
  const trpc = loadTrpcAction(this);

  this.use(path, ...middlewares, async (c) => {
    const response = await fetchRequestHandler({
      ...option,
      router: trpc.router,
      createContext: async () => ({}),
      endpoint,
      req: c.req.raw,
    }).then((res) => c.body(res.body, res));

    c.body(response.body, response);

    return response;
  });

  return trpc;
}
