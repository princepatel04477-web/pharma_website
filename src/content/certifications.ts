import { certificationSchema, type Certification } from './types';
const data: Certification[] = [
  {
    "code": "WHO-GMP",
    "name": "WHO-GMP manufacturing evidence",
    "valueKey": "whoGmpCertNo",
    "issuingBody": "Issuing authority to be verified from the original document",
    "scope": "Applies to the named manufacturing site and documented scope, not a blanket approval of an exporter. Partner-facility evidence has not yet been supplied."
  },
  {
    "code": "Schedule M",
    "name": "Schedule M compliance evidence",
    "valueKey": "scheduleM",
    "issuingBody": "Issuing authority to be verified from the original document",
    "scope": "Concerns applicable Indian manufacturing requirements. The facility, scope and current evidence require verification."
  },
  {
    "code": "ISO 9001:2015",
    "name": "Quality management system",
    "valueKey": "iso9001",
    "issuingBody": "Issuing authority to be verified from the original document",
    "scope": "Describes a certified management-system scope, not product approval. Certification body, site coverage and validity remain unverified."
  },
  {
    "code": "ISO 14001:2015",
    "name": "Environmental management system",
    "valueKey": "iso14001",
    "issuingBody": "Issuing authority to be verified from the original document",
    "scope": "Concerns the stated environmental management-system scope. It does not establish medicine quality or destination approval."
  },
  {
    "code": "Wholesale licence",
    "name": "Wholesale and export-related authorisations",
    "valueKey": "cdscoLicence",
    "issuingBody": "Issuing authority to be verified from the original document",
    "scope": "The actual licence type, issuing authority and permitted activities must be checked against original documents. No wholesale or export authorisation is claimed by this preview."
  },
  {
    "code": "FSSAI",
    "name": "Food business authorisation",
    "valueKey": "fssai",
    "issuingBody": "Issuing authority to be verified from the original document",
    "scope": "Relevant only where the product and activity fall within the applicable food-business scope. Product classification and licence details are pending verification."
  },
  {
    "code": "IEC",
    "name": "Importer Exporter Code",
    "valueKey": "iecCode",
    "issuingBody": "Issuing authority to be verified from the original document",
    "scope": "An identifier for applicable import/export activities, not pharmaceutical product approval. The entity and registration record remain unverified."
  }
];
export const certifications: Certification[] = certificationSchema.array().parse(data);
