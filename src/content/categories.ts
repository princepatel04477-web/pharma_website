import { categorySchema, type ProductCategory } from './types';
const data: ProductCategory[] = [
  {
    "slug": "generic-formulations",
    "name": "Generic formulations",
    "shortName": "Generic medicines",
    "scope": "Finished formulations. Essential therapeutic categories.",
    "icon": "capsule",
    "rxClassified": true,
    "importLicenceRequired": true,
    "subGroups": [
      "Anti-infectives",
      "Cardiovascular",
      "Anti-diabetics",
      "Analgesics",
      "Gastrointestinal"
    ],
    "dosageForms": [
      "Tablets",
      "Capsules",
      "Oral liquids",
      "Injectables"
    ],
    "description": "Discuss generic finished formulations across anti-infective, cardiovascular, diabetes, pain-management and gastrointestinal categories. Prescription products require an appropriate import licence and destination-specific review. Confirm the batch CoA, applicable GMP evidence, stability information and Free Sale Certificate requirements before ordering.",
    "skuCount": null,
    "representativeMolecules": [
      {
        "name": "Paracetamol",
        "strengths": [
          "500 mg",
          "650 mg"
        ],
        "forms": [
          "Tablets"
        ]
      },
      {
        "name": "Amoxicillin",
        "strengths": [
          "250 mg",
          "500 mg"
        ],
        "forms": [
          "Capsules"
        ]
      },
      {
        "name": "Metformin",
        "strengths": [
          "500 mg",
          "850 mg"
        ],
        "forms": [
          "Tablets"
        ]
      },
      {
        "name": "Amlodipine",
        "strengths": [
          "5 mg",
          "10 mg"
        ],
        "forms": [
          "Tablets"
        ]
      },
      {
        "name": "Azithromycin",
        "strengths": [
          "250 mg",
          "500 mg"
        ],
        "forms": [
          "Tablets"
        ]
      },
      {
        "name": "Omeprazole",
        "strengths": [
          "20 mg"
        ],
        "forms": [
          "Capsules"
        ]
      }
    ],
    "packagingOptions": [
      "Blister packs — subject to product review",
      "Bottles — subject to formulation",
      "Institutional packs — by enquiry"
    ],
    "shelfLifeMonths": null,
    "documentationProvided": [
      "Batch Certificate of Analysis",
      "Applicable manufacturing certificate",
      "Commercial invoice and packing list",
      "Certificate of origin",
      "Free Sale Certificate, where applicable",
      "MSDS and stability information, where applicable"
    ],
    "heroImage": null,
    "relatedServices": [
      "regulatory-dossier-support",
      "export-logistics-documentation"
    ],
    "specifications": [
      {
        "label": "Shelf life",
        "value": "Confirm against the selected product and batch"
      },
      {
        "label": "Primary materials",
        "value": "Product-specific; to be agreed in the specification"
      },
      {
        "label": "Labelling languages",
        "value": "Confirm destination requirements at enquiry"
      },
      {
        "label": "Batch coding",
        "value": "Batch number, manufacture and expiry details to be verified"
      }
    ]
  },
  {
    "slug": "branded-generics",
    "name": "Branded generics",
    "shortName": "Branded generics",
    "scope": "Market-specific portfolios, built around your brand.",
    "icon": "box",
    "rxClassified": true,
    "importLicenceRequired": true,
    "subGroups": [
      "Therapeutic portfolios",
      "Market-specific packaging",
      "Private label",
      "Retail presentation"
    ],
    "dosageForms": [
      "Tablets",
      "Capsules",
      "Oral liquids"
    ],
    "description": "Explore branded generic formulations for distributor-led portfolios and pharmacy channels. Prescription status, artwork and labelling must be checked against the destination market. A product-specific documentation review should cover the CoA, manufacturing credentials, stability data and applicable Free Sale Certificate.",
    "skuCount": null,
    "representativeMolecules": [
      {
        "name": "Paracetamol",
        "strengths": [
          "500 mg",
          "650 mg"
        ],
        "forms": [
          "Tablets"
        ]
      },
      {
        "name": "Amoxicillin",
        "strengths": [
          "250 mg",
          "500 mg"
        ],
        "forms": [
          "Capsules"
        ]
      },
      {
        "name": "Metformin",
        "strengths": [
          "500 mg",
          "850 mg"
        ],
        "forms": [
          "Tablets"
        ]
      },
      {
        "name": "Amlodipine",
        "strengths": [
          "5 mg",
          "10 mg"
        ],
        "forms": [
          "Tablets"
        ]
      },
      {
        "name": "Azithromycin",
        "strengths": [
          "250 mg",
          "500 mg"
        ],
        "forms": [
          "Tablets"
        ]
      },
      {
        "name": "Omeprazole",
        "strengths": [
          "20 mg"
        ],
        "forms": [
          "Capsules"
        ]
      }
    ],
    "packagingOptions": [
      "Blister packs — subject to product review",
      "Bottles — subject to formulation",
      "Institutional packs — by enquiry"
    ],
    "shelfLifeMonths": null,
    "documentationProvided": [
      "Batch Certificate of Analysis",
      "Applicable manufacturing certificate",
      "Commercial invoice and packing list",
      "Certificate of origin",
      "Free Sale Certificate, where applicable",
      "MSDS and stability information, where applicable"
    ],
    "heroImage": null,
    "relatedServices": [
      "regulatory-dossier-support",
      "export-logistics-documentation"
    ],
    "specifications": [
      {
        "label": "Shelf life",
        "value": "Confirm against the selected product and batch"
      },
      {
        "label": "Primary materials",
        "value": "Product-specific; to be agreed in the specification"
      },
      {
        "label": "Labelling languages",
        "value": "Confirm destination requirements at enquiry"
      },
      {
        "label": "Batch coding",
        "value": "Batch number, manufacture and expiry details to be verified"
      }
    ]
  },
  {
    "slug": "otc-products",
    "name": "OTC products",
    "shortName": "OTC healthcare",
    "scope": "Everyday healthcare for retail and institutional channels.",
    "icon": "cross",
    "rxClassified": false,
    "importLicenceRequired": false,
    "subGroups": [
      "Analgesics",
      "Antacids",
      "Cough and cold",
      "Topical care",
      "Oral care"
    ],
    "dosageForms": [
      "Tablets",
      "Oral liquids",
      "Creams",
      "Gels"
    ],
    "description": "Enquire about non-prescription product categories for everyday healthcare, including analgesics, antacids, oral care and topical preparations. OTC status is destination-dependent, not a universal exemption from import rules. Confirm product classification, CoA, safety information and applicable manufacturing and sale certificates for each enquiry.",
    "skuCount": null,
    "representativeMolecules": [],
    "packagingOptions": [
      "Blister packs — subject to product review",
      "Bottles — subject to formulation",
      "Institutional packs — by enquiry"
    ],
    "shelfLifeMonths": null,
    "documentationProvided": [
      "Batch Certificate of Analysis",
      "Applicable manufacturing certificate",
      "Commercial invoice and packing list",
      "Certificate of origin",
      "Free Sale Certificate, where applicable",
      "MSDS and stability information, where applicable"
    ],
    "heroImage": null,
    "relatedServices": [
      "regulatory-dossier-support",
      "export-logistics-documentation"
    ],
    "specifications": [
      {
        "label": "Shelf life",
        "value": "Confirm against the selected product and batch"
      },
      {
        "label": "Primary materials",
        "value": "Product-specific; to be agreed in the specification"
      },
      {
        "label": "Labelling languages",
        "value": "Confirm destination requirements at enquiry"
      },
      {
        "label": "Batch coding",
        "value": "Batch number, manufacture and expiry details to be verified"
      }
    ]
  },
  {
    "slug": "nutraceuticals",
    "name": "Nutraceuticals",
    "shortName": "Nutrition & wellness",
    "scope": "Vitamins, minerals and nutrition-focused formulations.",
    "icon": "leaf",
    "rxClassified": false,
    "importLicenceRequired": false,
    "subGroups": [
      "Vitamins",
      "Minerals",
      "Protein supplements",
      "Herbal extracts"
    ],
    "dosageForms": [
      "Tablets",
      "Capsules",
      "Powders",
      "Oral liquids"
    ],
    "description": "Explore vitamins, minerals, protein supplements and selected herbal preparations as a proposed sourcing category. Food-supplement and herbal classifications require product-specific review, including applicable FSSAI scope in India. Request composition, CoA, labelling information and applicable safety documentation; no efficacy claims are made here.",
    "skuCount": null,
    "representativeMolecules": [],
    "packagingOptions": [
      "Blister packs — subject to product review",
      "Bottles — subject to formulation",
      "Institutional packs — by enquiry"
    ],
    "shelfLifeMonths": null,
    "documentationProvided": [
      "Batch Certificate of Analysis",
      "Applicable manufacturing certificate",
      "Commercial invoice and packing list",
      "Certificate of origin",
      "Free Sale Certificate, where applicable",
      "MSDS and stability information, where applicable"
    ],
    "heroImage": null,
    "relatedServices": [
      "regulatory-dossier-support",
      "export-logistics-documentation"
    ],
    "specifications": [
      {
        "label": "Shelf life",
        "value": "Confirm against the selected product and batch"
      },
      {
        "label": "Primary materials",
        "value": "Product-specific; to be agreed in the specification"
      },
      {
        "label": "Labelling languages",
        "value": "Confirm destination requirements at enquiry"
      },
      {
        "label": "Batch coding",
        "value": "Batch number, manufacture and expiry details to be verified"
      }
    ]
  },
  {
    "slug": "surgical-diagnostics",
    "name": "Surgical & diagnostics",
    "shortName": "Surgical & diagnostics",
    "scope": "Consumables and clinical essentials for procurement teams.",
    "icon": "surgical",
    "rxClassified": false,
    "importLicenceRequired": false,
    "subGroups": [
      "Disposables",
      "Dressings",
      "Diagnostic kits",
      "Basic medical devices"
    ],
    "dosageForms": [
      "Sterile consumables",
      "Non-sterile consumables",
      "Diagnostic kits"
    ],
    "description": "Discuss consumables, disposables, diagnostic kits and basic medical devices against a defined procurement specification. Device classification and licensing requirements vary by product and destination. Confirm conformity evidence, sterility information where applicable, lot traceability and supporting technical documentation before procurement.",
    "skuCount": null,
    "representativeMolecules": [],
    "packagingOptions": [
      "Blister packs — subject to product review",
      "Bottles — subject to formulation",
      "Institutional packs — by enquiry"
    ],
    "shelfLifeMonths": null,
    "documentationProvided": [
      "Batch Certificate of Analysis",
      "Applicable manufacturing certificate",
      "Commercial invoice and packing list",
      "Certificate of origin",
      "Free Sale Certificate, where applicable",
      "MSDS and stability information, where applicable"
    ],
    "heroImage": null,
    "relatedServices": [
      "regulatory-dossier-support",
      "export-logistics-documentation"
    ],
    "specifications": [
      {
        "label": "Shelf life",
        "value": "Confirm against the selected product and batch"
      },
      {
        "label": "Primary materials",
        "value": "Product-specific; to be agreed in the specification"
      },
      {
        "label": "Labelling languages",
        "value": "Confirm destination requirements at enquiry"
      },
      {
        "label": "Batch coding",
        "value": "Batch number, manufacture and expiry details to be verified"
      }
    ]
  },
  {
    "slug": "personal-care-fmcg",
    "name": "Personal care & FMCG",
    "shortName": "Personal care",
    "scope": "Daily-use hygiene and personal-care categories.",
    "icon": "bottle",
    "rxClassified": false,
    "importLicenceRequired": false,
    "subGroups": [
      "Hygiene",
      "Skin care",
      "Hair care",
      "Antiseptics",
      "Sanitisers"
    ],
    "dosageForms": [
      "Liquids",
      "Creams",
      "Gels",
      "Wipes"
    ],
    "description": "Explore hygiene, skin and hair care, antiseptic and sanitiser product categories for distribution. Cosmetic, biocidal and medicinal classifications differ across markets and must be checked before supply. Documentation discussions should cover ingredient declarations, CoA, applicable MSDS and destination labelling requirements.",
    "skuCount": null,
    "representativeMolecules": [],
    "packagingOptions": [
      "Blister packs — subject to product review",
      "Bottles — subject to formulation",
      "Institutional packs — by enquiry"
    ],
    "shelfLifeMonths": null,
    "documentationProvided": [
      "Batch Certificate of Analysis",
      "Applicable manufacturing certificate",
      "Commercial invoice and packing list",
      "Certificate of origin",
      "Free Sale Certificate, where applicable",
      "MSDS and stability information, where applicable"
    ],
    "heroImage": null,
    "relatedServices": [
      "regulatory-dossier-support",
      "export-logistics-documentation"
    ],
    "specifications": [
      {
        "label": "Shelf life",
        "value": "Confirm against the selected product and batch"
      },
      {
        "label": "Primary materials",
        "value": "Product-specific; to be agreed in the specification"
      },
      {
        "label": "Labelling languages",
        "value": "Confirm destination requirements at enquiry"
      },
      {
        "label": "Batch coding",
        "value": "Batch number, manufacture and expiry details to be verified"
      }
    ]
  }
];
export const categories: ProductCategory[] = categorySchema.array().parse(data);
