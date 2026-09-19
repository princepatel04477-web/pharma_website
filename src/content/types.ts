import { z, type Infer } from "@/lib/validation";
export const categorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  shortName: z.string(),
  scope: z.string(),
  description: z.string(),
  skuCount: z.number().nullable(),
  rxClassified: z.boolean(),
  importLicenceRequired: z.boolean(),
  subGroups: z.array(z.string()),
  representativeMolecules: z.array(
    z.object({
      name: z.string(),
      strengths: z.array(z.string()),
      forms: z.array(z.string()),
    }),
  ),
  dosageForms: z.array(z.string()),
  packagingOptions: z.array(z.string()),
  shelfLifeMonths: z.number().nullable(),
  documentationProvided: z.array(z.string()),
  heroImage: z.string().nullable(),
  icon: z.enum(["capsule", "box", "cross", "leaf", "surgical", "bottle"]),
  relatedServices: z.array(z.string()),
  specifications: z.array(z.object({ label: z.string(), value: z.string() })),
});
export type ProductCategory = Infer<typeof categorySchema>;
export const serviceSchema = z.object({
  slug: z.string(),
  name: z.string(),
  summary: z.string(),
  detail: z.string(),
  deliverables: z.array(z.string()),
  icon: z.string(),
  category: z.string(),
});
export type Service = Infer<typeof serviceSchema>;
export const certificationSchema = z.object({
  code: z.string(),
  name: z.string(),
  issuingBody: z.string(),
  scope: z.string(),
  valueKey: z.enum([
    "cdscoLicence",
    "whoGmpCertNo",
    "iso9001",
    "iso14001",
    "scheduleM",
    "fssai",
    "iecCode",
  ]),
  documentUrl: z.string().optional(),
});
export type Certification = Infer<typeof certificationSchema>;
export const marketSchema = z.object({
  region: z.string(),
  slug: z.string(),
  countries: z.array(
    z.object({ name: z.string(), iso2: z.string().length(2) }),
  ),
  registrationSupport: z.string(),
  notes: z.string(),
});
export type Market = Infer<typeof marketSchema>;
export const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
  category: z.string(),
});
export type FAQ = Infer<typeof faqSchema>;
export interface Stat {
  valueKey:
    "skuCount" | "countriesServed" | "yearsTrading" | "manufacturingPartners";
  label: string;
  suffix?: string;
}
