import { faqSchema, type FAQ } from "./types";
const data: FAQ[] = [
  {
    question: "What is the minimum order quantity?",
    answer:
      "MOQ depends on the formulation, pack size, manufacturer and whether the product is a stock or production order. Share your product list and quantities for a specific assessment.",
    category: "orders",
  },
  {
    question: "How long does an export order take?",
    answer:
      "Lead time depends on stock allocation, manufacturing, artwork approval and document readiness. A written schedule should be agreed after the product and destination review; this preview makes no delivery commitment.",
    category: "orders",
  },
  {
    question: "Which payment terms can be discussed?",
    answer:
      "Letters of credit (LC) and telegraphic transfers (TT) can be included in an enquiry. Availability, payment milestones and banking requirements must be agreed in the written quotation. No rates are published.",
    category: "orders",
  },
  {
    question: "Which documents should accompany a shipment?",
    answer:
      "A typical review includes a batch CoA, invoice, packing list, certificate of origin and shipping documents. GMP evidence, Free Sale Certificates, MSDS and stability information depend on the product and destination. Confirm the complete list before ordering.",
    category: "documentation",
  },
  {
    question: "Can I request samples before ordering?",
    answer:
      "Include the product, presentation, quantity and destination in your request. Sample availability, charges, transport and import permissions require confirmation; prescription samples are not exempt from applicable rules.",
    category: "orders",
  },
  {
    question: "Can products carry our own label?",
    answer:
      "Submit a product brief with proposed artwork, pack size and target country. Manufacturing scope, brand rights, MOQ, lead time and destination labelling requirements must be assessed before a private-label order.",
    category: "orders",
  },
  {
    question: "Which shipment modes are available?",
    answer:
      "Air and sea freight can be discussed according to the product, route and required delivery window. Temperature control, dangerous-goods classification and applicable carrier restrictions must be reviewed first.",
    category: "logistics",
  },
  {
    question: "Who is responsible for product registration?",
    answer:
      "The destination importer is responsible for local registration and import permissions. A documentation brief can define the manufacturer information needed to support the filing; support is not a promise of approval.",
    category: "regulatory",
  },
  {
    question: "Do I need an import licence?",
    answer:
      "Prescription categories require an appropriate import licence and destination-specific authorisation. Other categories may also be regulated. Supply your licence details and product list for a classification review.",
    category: "regulatory",
  },
  {
    question: "How is remaining shelf life agreed?",
    answer:
      "State the minimum remaining shelf life required at arrival in your enquiry. Product stability, batch expiry and planned transit time must be reviewed before a written commitment can be made. No blanket shelf-life assurance is offered here.",
    category: "quality",
  },
];
export const faqs: FAQ[] = faqSchema.array().parse(data);
