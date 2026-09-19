import { serviceSchema, type Service } from './types';
const data: Service[] = [
  {
    "slug": "regulatory-dossier-support",
    "name": "Regulatory dossier support",
    "summary": "A product file shaped around the destination.",
    "detail": "Define the destination and product classification before compiling a file. The proposed review covers available CTD or ACTD modules, manufacturer evidence and country-specific gaps. Artwork and labelling requirements belong in the same discussion. The importer remains responsible for local registration and authorisation.",
    "deliverables": [
      "CTD / ACTD document checklist",
      "Country-specific gap review",
      "Artwork and labelling brief",
      "Manufacturer evidence request"
    ],
    "icon": "file",
    "category": "generic-formulations"
  },
  {
    "slug": "private-label-contract-manufacturing",
    "name": "Private label & contract manufacturing",
    "summary": "Your portfolio. A clearly defined manufacturing brief.",
    "detail": "Start with the formulation, presentation, pack size and target market. Manufacturing capability and current credentials must be verified for the selected facility. MOQ and lead time are product-specific and require a written quotation. Artwork and specification approval should precede production.",
    "deliverables": [
      "Product and packaging brief",
      "Facility qualification checklist",
      "Artwork approval workflow",
      "Product-specific MOQ review"
    ],
    "icon": "box",
    "category": "branded-generics"
  },
  {
    "slug": "bulk-institutional-supply",
    "name": "Bulk & institutional supply",
    "summary": "Procurement structured around the tender, not just the product.",
    "detail": "Tender requirements should drive the initial specification review. Quantities, shelf-life conditions, documentary requirements and delivery windows need to be aligned before a bid. Product availability and manufacturer eligibility must be confirmed. No tender qualification is implied by this preview.",
    "deliverables": [
      "Tender specification review",
      "Product schedule",
      "Document responsibility matrix",
      "Delivery requirement brief"
    ],
    "icon": "building",
    "category": "surgical-diagnostics"
  },
  {
    "slug": "export-logistics-documentation",
    "name": "Export logistics & documentation",
    "summary": "The right information at every handover.",
    "detail": "A shipment plan starts with product classification, destination and agreed trade terms. Review the commercial invoice, packing list, certificate of origin and applicable shipping documents together. HS classification and destination import requirements need qualified confirmation. Freight mode and dispatch timing are agreed against the actual order.",
    "deliverables": [
      "Commercial document checklist",
      "Packing and marking instructions",
      "Origin documentation review",
      "Freight coordination brief"
    ],
    "icon": "truck",
    "category": "generic-formulations"
  },
  {
    "slug": "cold-chain-temperature-controlled",
    "name": "Temperature-controlled logistics",
    "summary": "Temperature requirements belong in the first conversation.",
    "detail": "Temperature-sensitive products need a lane-specific risk assessment. Discuss qualified packaging, monitoring equipment and shipment duration before accepting an order. An excursion response protocol must name the responsible parties and decision criteria. Validated cold-chain capability is not asserted until evidence has been reviewed.",
    "deliverables": [
      "Product temperature specification",
      "Shipping-lane risk review",
      "Data logger requirement",
      "Excursion response plan"
    ],
    "icon": "thermometer",
    "category": "generic-formulations"
  },
  {
    "slug": "quality-assurance-batch-release",
    "name": "Quality assurance & batch review",
    "summary": "Traceable evidence before dispatch.",
    "detail": "Agree the required quality documents and release responsibilities before allocation. Review the batch CoA against the approved specification and verify the manufacturing source. Sampling and retention arrangements require confirmation with the responsible facility. Dispatch should follow the documented release decision, not replace it.",
    "deliverables": [
      "CoA and specification review",
      "Pre-shipment sampling brief",
      "Batch traceability checklist",
      "Retention-sample arrangements"
    ],
    "icon": "shield",
    "category": "branded-generics"
  }
];
export const services: Service[] = serviceSchema.array().parse(data);
