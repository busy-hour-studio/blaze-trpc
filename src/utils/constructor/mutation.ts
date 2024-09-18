import type { BlazeServiceAction } from '@busy-hour/blaze/utils/setup';
import type { TrpcMutationCallRecord } from '@busy-hour/blaze';
import { constructValidator, trpcHandler } from './helper';
import type { Procedure } from '../../types/helper';

export function constructTrpcMutation(
  actions: BlazeServiceAction[],
  procedure: Procedure
) {
  return actions.reduce((prev, curr) => {
    // @ts-expect-error no-defined-name-props
    // eslint-disable-next-line no-param-reassign
    prev[curr.actionName] = procedure
      .input(constructValidator(curr.action.validator))
      .mutation(({ input }) => trpcHandler(curr, input));

    return prev;
  }, {} as TrpcMutationCallRecord);
}
