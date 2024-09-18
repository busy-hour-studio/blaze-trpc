import type { Blaze } from '@busy-hour/blaze';
import type { BlazeServiceAction } from '@busy-hour/blaze/utils/setup';
import type { ProcedureType } from '@trpc/server';
import { constructTrpcMutation } from './mutation';
import { constructTrpcQuery } from './query';
import type { Procedure } from '../../types/helper';

export function constructTrpcAction(app: Blaze, procedure: Procedure) {
  let actions = app.services.map((service) => service.actions).flat(1);
  actions = actions.filter((action) => action.action.trpc);

  const groups = actions.reduce(
    (prev, curr) => {
      const type = curr.action.trpc;

      if (!type) return prev;

      prev[type].push(curr);

      return prev;
    },
    {
      mutation: [],
      query: [],
      subscription: [],
    } as { [T in ProcedureType]: BlazeServiceAction[] }
  );

  const mutations = constructTrpcMutation(groups.mutation, procedure);
  const queries = constructTrpcQuery(groups.query, procedure);

  return {
    ...mutations,
    ...queries,
  };
}
