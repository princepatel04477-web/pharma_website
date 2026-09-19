import { z } from "@/lib/validation";
import {
  copy,
  orderSteps,
  qualityPillars,
  facilityStandards,
  engagementModels,
  suratPoints,
  legalPages,
  contactChannels,
  documentPack,
  trustItems,
} from "./site";
import { categories } from "./categories";
import { services } from "./services";
import { certifications } from "./certifications";
import { markets } from "./markets";
import { faqs } from "./faqs";
export const getCategories = () => categories;
export const getCategory = (slug: string) =>
  categories.find((category) => category.slug === slug);
export const getServices = () => services;
export const getCertifications = () => certifications;
export const getMarkets = () => markets;
export const getFAQs = () => faqs;

// Validate structured page content in the server content layer, not the browser bundle.
z.record(z.string(), z.string()).parse(copy);
const detailList = z.array(z.object({ name: z.string(), detail: z.string() }));
for (const list of [orderSteps, qualityPillars, facilityStandards, suratPoints])
  detailList.parse(list);
z.array(
  z.object({
    name: z.string(),
    fit: z.string(),
    moq: z.string(),
    lead: z.string(),
    scope: z.string(),
  }),
).parse(engagementModels);
z.array(
  z.object({
    slug: z.string(),
    name: z.string(),
    sections: z.array(z.object({ name: z.string(), text: z.string() })),
  }),
).parse(legalPages);
z.array(
  z.object({
    name: z.string(),
    key: z.enum(["sales", "regulatory", "general"]),
    detail: z.string(),
  }),
).parse(contactChannels);
z.array(z.string()).parse(documentPack);
z.array(z.string()).parse(trustItems);
