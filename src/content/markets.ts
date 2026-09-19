import { marketSchema, type Market } from './types';
const data: Market[] = [
  {
    "region": "Africa",
    "slug": "africa",
    "countries": [
      {
        "name": "Nigeria",
        "iso2": "NG"
      },
      {
        "name": "Kenya",
        "iso2": "KE"
      },
      {
        "name": "Ghana",
        "iso2": "GH"
      },
      {
        "name": "Tanzania",
        "iso2": "TZ"
      },
      {
        "name": "Uganda",
        "iso2": "UG"
      },
      {
        "name": "Ethiopia",
        "iso2": "ET"
      },
      {
        "name": "Zambia",
        "iso2": "ZM"
      },
      {
        "name": "Ivory Coast",
        "iso2": "CI"
      },
      {
        "name": "Cameroon",
        "iso2": "CM"
      },
      {
        "name": "Senegal",
        "iso2": "SN"
      },
      {
        "name": "Mozambique",
        "iso2": "MZ"
      },
      {
        "name": "Rwanda",
        "iso2": "RW"
      }
    ],
    "registrationSupport": "Discuss the destination authority’s requirements with the local importer before preparing a dossier. A filing brief can cover available CTD/ACTD documents, artwork, stability information and sample requirements. Local registration, permits and authorised representation remain the importer’s responsibility.",
    "notes": "Markets for enquiry planning; this list is not evidence of completed shipments or product registrations."
  },
  {
    "region": "CIS & Central Asia",
    "slug": "cis-central-asia",
    "countries": [
      {
        "name": "Uzbekistan",
        "iso2": "UZ"
      },
      {
        "name": "Kazakhstan",
        "iso2": "KZ"
      },
      {
        "name": "Kyrgyzstan",
        "iso2": "KG"
      },
      {
        "name": "Tajikistan",
        "iso2": "TJ"
      },
      {
        "name": "Azerbaijan",
        "iso2": "AZ"
      },
      {
        "name": "Georgia",
        "iso2": "GE"
      },
      {
        "name": "Armenia",
        "iso2": "AM"
      },
      {
        "name": "Belarus",
        "iso2": "BY"
      }
    ],
    "registrationSupport": "Discuss the destination authority’s requirements with the local importer before preparing a dossier. A filing brief can cover available CTD/ACTD documents, artwork, stability information and sample requirements. Local registration, permits and authorised representation remain the importer’s responsibility.",
    "notes": "Markets for enquiry planning; this list is not evidence of completed shipments or product registrations."
  },
  {
    "region": "South & Southeast Asia",
    "slug": "south-southeast-asia",
    "countries": [
      {
        "name": "Vietnam",
        "iso2": "VN"
      },
      {
        "name": "Philippines",
        "iso2": "PH"
      },
      {
        "name": "Cambodia",
        "iso2": "KH"
      },
      {
        "name": "Myanmar",
        "iso2": "MM"
      },
      {
        "name": "Sri Lanka",
        "iso2": "LK"
      },
      {
        "name": "Nepal",
        "iso2": "NP"
      },
      {
        "name": "Bangladesh",
        "iso2": "BD"
      }
    ],
    "registrationSupport": "Discuss the destination authority’s requirements with the local importer before preparing a dossier. A filing brief can cover available CTD/ACTD documents, artwork, stability information and sample requirements. Local registration, permits and authorised representation remain the importer’s responsibility.",
    "notes": "Markets for enquiry planning; this list is not evidence of completed shipments or product registrations."
  },
  {
    "region": "Latin America",
    "slug": "latin-america",
    "countries": [
      {
        "name": "Peru",
        "iso2": "PE"
      },
      {
        "name": "Bolivia",
        "iso2": "BO"
      },
      {
        "name": "Ecuador",
        "iso2": "EC"
      },
      {
        "name": "Guatemala",
        "iso2": "GT"
      },
      {
        "name": "Dominican Republic",
        "iso2": "DO"
      },
      {
        "name": "Paraguay",
        "iso2": "PY"
      }
    ],
    "registrationSupport": "Discuss the destination authority’s requirements with the local importer before preparing a dossier. A filing brief can cover available CTD/ACTD documents, artwork, stability information and sample requirements. Local registration, permits and authorised representation remain the importer’s responsibility.",
    "notes": "Markets for enquiry planning; this list is not evidence of completed shipments or product registrations."
  }
];
export const markets: Market[] = marketSchema.array().parse(data);
