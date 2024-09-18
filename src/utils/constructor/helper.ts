import { type ActionValidator, z } from '@busy-hour/blaze';
import type { BlazeServiceAction } from '@busy-hour/blaze/utils/setup';

export function constructValidator<
  H extends z.ZodSchema = z.ZodSchema,
  P extends z.ZodSchema = z.ZodSchema,
  Q extends z.ZodSchema = z.ZodSchema,
  B extends z.ZodSchema = z.ZodSchema,
>(validator: ActionValidator<H, P, Q, B> | null | undefined) {
  const defaultValidation = z.any().nullable().default(null);

  return z.object({
    headers: validator?.header ?? defaultValidation,
    params: validator?.params ?? defaultValidation,
    query: validator?.query ?? defaultValidation,
    body: validator?.body ?? defaultValidation,
  });
}

export function trpcHandler(
  action: BlazeServiceAction,
  input: {
    body?: never;
    params?: never;
    headers?: never;
    query?: never;
  }
) {
  const { body = {}, headers = {}, params = {}, query = {} } = input;

  return action.actionHandler(body, params, headers, query);
}
