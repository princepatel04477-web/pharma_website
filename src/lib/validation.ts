import {
  config,
  object,
  string,
  array,
  number,
  boolean,
  literal,
  enum as enumSchema,
  record,
  discriminatedUnion,
  email,
  url,
  uuid,
  union,
} from "zod";
// Avoid Zod's optional new Function probe under the no-unsafe-eval CSP.
// Explicit exports keep unused locale/JSON-schema machinery out of the browser.
config({ jitless: true });
export const z = {
  object,
  string,
  array,
  number,
  boolean,
  literal,
  enum: enumSchema,
  record,
  discriminatedUnion,
  email,
  url,
  uuid,
  union,
};
export type { infer as Infer } from "zod";
