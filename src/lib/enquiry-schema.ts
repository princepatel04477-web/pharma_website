import { z, type Infer } from "@/lib/validation";
import {
  formCopy as text,
  catalogueFields,
  tradeFields,
} from "@/content/forms";
import { navigation } from "@/content/navigation";
import { countryOptions } from "@/lib/countries";
export const MAX_FILE_BYTES = 3 * 1024 * 1024;
export const ACCEPTED_FILES = ["application/pdf", "image/jpeg", "image/png"];
const required = z
  .string({ error: text.requiredError })
  .trim()
  .min(1, text.requiredError)
  .max(300);
const optional = z.string().trim().max(300).default("");
const email = z.email(text.emailError).max(254);
const phone = z
  .string()
  .trim()
  .regex(/^\+[1-9][0-9 ()-]{6,20}$/, text.phoneError);
const country = required.refine(
  (v) => countryOptions.some((c) => c.code === v),
  text.countryError,
);
const category = z
  .string()
  .refine(
    (v) => v === "" || navigation.products.some((c) => c.slug === v),
    text.categoryError,
  );
const categories = z
  .array(category)
  .min(1, text.categoryError)
  .max(6)
  .refine((v) => !v.includes(""), text.categoryError);
const select = (name: string) =>
  required.refine(
    (v) =>
      [...catalogueFields, ...tradeFields]
        .find((f) => f.name === name)
        ?.options?.includes(v) ?? false,
    text.requiredError,
  );
const common = {
  name: required,
  company: required,
  email,
  phone,
  country,
  consent: z.literal(true, { error: text.consentError }),
};
export const contactSchema = z.object({
  ...common,
  type: z.literal("contact"),
  category: category.default(""),
  message: z
    .string()
    .trim()
    .min(10, "Please include at least ten characters of detail.")
    .max(5000),
});
const freeDomains = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.in",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "mail.com",
  "gmx.com",
  "yandex.com",
]);
export const catalogueSchema = z.object({
  ...common,
  type: z.literal("catalogue"),
  email: email.refine(
    (v) => !freeDomains.has(v.split("@")[1]?.toLowerCase() ?? ""),
    text.companyEmail,
  ),
  businessType: select("businessType"),
  licenceHeld: select("licenceHeld"),
  categories,
});
export const tradeSchema = z.object({
  ...common,
  type: z.literal("trade"),
  tradingName: required,
  city: required,
  website: optional.refine(
    (v) => !v || (/^https?:\/\//.test(v) && z.url().safeParse(v).success),
    text.urlError,
  ),
  year: z
    .string()
    .regex(/^\d{4}$/, text.yearError)
    .refine(
      (v) => +v >= 1800 && +v <= new Date().getFullYear(),
      text.yearError,
    ),
  licenceNumber: required,
  authority: required,
  expiry: required.refine(
    (v) =>
      /^\d{4}-\d{2}-\d{2}$/.test(v) &&
      Number.isFinite(Date.parse(v)) &&
      v >= new Date().toISOString().slice(0, 10),
    text.expired,
  ),
  categories,
  volume: select("volume"),
  frequency: select("frequency"),
  targetMarkets: required,
  incoterms: select("incoterms"),
  payment: select("payment"),
  role: required,
  whatsapp: optional.refine(
    (v) => !v || phone.safeParse(v).success,
    text.phoneError,
  ),
  method: select("method"),
  timezone: select("timezone"),
});
export const enquirySchema = z.discriminatedUnion("type", [
  contactSchema,
  catalogueSchema,
  tradeSchema,
]);
export type Enquiry = Infer<typeof enquirySchema>;
export const envelopeSchema = z.object({
  data: enquirySchema,
  startedAt: z.number().finite(),
  honeypot: z.string().max(300),
  requestId: z.uuid(),
});
export const draftSchema = z.object({
  values: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
  step: z.number().int().min(0).max(3),
});
export type EnquiryResponse = {
  ok: boolean;
  message: string;
  reference?: string;
  errors?: Record<string, string>;
  fallbackEmail?: string;
};
