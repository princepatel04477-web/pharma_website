export interface BrandConfig {
  legalName: string; tradingName: string; tagline: string; foundedYear: number | null;
  hq: { line1: string; line2: string; city: string; state: string; postcode: string; country: string };
  phone: string; whatsapp: string; email: { sales: string; regulatory: string; general: string };
  registrations: { cdscoLicence: string; whoGmpCertNo: string; iso9001: string; iso14001: string; isoCerts: string[]; scheduleM: string; fssai: string; iecCode: string; gstin: string };
  stats: { skuCount: number; countriesServed: number; yearsTrading: number; manufacturingPartners: number };
  catalogueRevision: string | null; licenceAuthority: string; licenceValidity: string | null; siteUrl: string;
}
export const brand: BrandConfig = {
  legalName: 'TODO_LEGAL_NAME', tradingName: 'ARVEX PHARMA', tagline: 'Pharmaceutical export & wholesale distribution', foundedYear: null,
  hq: { line1: 'TODO_ADDRESS', line2: '', city: 'Surat', state: 'Gujarat', postcode: 'TODO_POSTCODE', country: 'India' },
  phone: 'TODO_PHONE', whatsapp: 'TODO_WHATSAPP', email: { sales: 'TODO_SALES_EMAIL', regulatory: 'TODO_REGULATORY_EMAIL', general: 'TODO_GENERAL_EMAIL' },
  registrations: { cdscoLicence: 'TODO_CDSCO_LICENCE', whoGmpCertNo: 'TODO_WHO_GMP_CERT', iso9001: 'TODO_ISO_9001', iso14001: 'TODO_ISO_14001', isoCerts: ['TODO_ISO_9001','TODO_ISO_14001'], scheduleM: 'TODO_SCHEDULE_M', fssai: 'TODO_FSSAI', iecCode: 'TODO_IEC_CODE', gstin: 'TODO_GSTIN' },
  // VERIFY: supplied design fixtures only; never render as established business facts.
  stats: { skuCount: 2400, countriesServed: 38, yearsTrading: 14, manufacturingPartners: 60 },
  catalogueRevision: null, licenceAuthority: 'TODO_LICENCE_AUTHORITY', licenceValidity: null,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.invalid',
};
export const isVerified = (value: string): boolean => !value.startsWith('TODO_') && value.length > 0;
