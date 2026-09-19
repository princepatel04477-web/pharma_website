export type FormType = "contact" | "catalogue" | "trade";
export type FieldName =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "country"
  | "businessType"
  | "licenceHeld"
  | "categories"
  | "category"
  | "message"
  | "tradingName"
  | "city"
  | "website"
  | "year"
  | "licenceNumber"
  | "authority"
  | "expiry"
  | "volume"
  | "frequency"
  | "targetMarkets"
  | "incoterms"
  | "payment"
  | "role"
  | "whatsapp"
  | "method"
  | "timezone";
export interface FormField {
  name: FieldName;
  label: string;
  type:
    | "text"
    | "email"
    | "tel"
    | "select"
    | "textarea"
    | "categories"
    | "date"
    | "url"
    | "number";
  autoComplete?: string;
  options?: string[];
  optional?: boolean;
  step?: number;
  wide?: boolean;
}
export const formCopy = {
  preview:
    "Non-launch preview. Use test data only; do not upload a real licence or sensitive information.",
  required: "Required fields unless marked optional.",
  optional: "Optional",
  select: "Select an option",
  submit: "Send enquiry",
  catalogueSubmit: "Request catalogue",
  tradeSubmit: "Submit for review",
  submitting: "Sending…",
  next: "Continue",
  back: "Back",
  edit: "Edit",
  review: "Review your application",
  clear: "Clear saved draft",
  saved:
    "Text fields are saved in this browser session. Re-select your licence file after a refresh.",
  storageUnavailable:
    "Browser storage is unavailable. Keep this page open to retain your draft.",
  upload: "Licence copy",
  uploadHelp:
    "PDF, JPG or PNG · Maximum 3MB · Test documents only in this preview.",
  uploadError: "Choose a PDF, JPG or PNG no larger than 3MB.",
  uploadRequired: "Attach a licence copy before submitting.",
  fileReselect: "Files are not saved. Re-select your document after a refresh.",
  privacy: "Read the preview privacy notice",
  consent:
    "I have read the preview privacy notice and understand this is not an approved trading account.",
  success: "Enquiry received",
  successDetail:
    "Your information has been accepted for review. Submission does not confirm product availability or trade-account approval. A response window has not yet been verified for this preview.",
  catalogueSuccess:
    "The verified PDF is not available in this preview. Catalogue delivery requires a completed document and an agreed response window.",
  networkError:
    "The request could not be completed. Your entries are still here; please try again.",
  unavailable:
    "Email delivery is not configured for this preview. Your entries have not been sent. Keep your draft and contact the site owner for the verified enquiry channel.",
  failure:
    "We could not send this enquiry. Please retry, or use the verified direct contact channel if available.",
  invalid: "Please review the highlighted fields.",
  rateLimit: "Too many requests. Please wait ten minutes before trying again.",
  tooFast: "Please take a moment to review your details before submitting.",
  fileInvalid: "The file contents do not match an accepted PDF, JPG or PNG.",
  requiredError: "Please complete this field.",
  emailError: "Enter a valid email address.",
  companyEmail: "Please use your company email so we can verify your business.",
  phoneError: "Include the international country code, starting with +.",
  countryError: "Choose a country from the list.",
  categoryError: "Choose at least one product category.",
  consentError: "Please acknowledge the preview notice.",
  expired: "Use a current or future expiry date.",
  yearError: "Enter a valid establishment year.",
  urlError: "Enter a full website address beginning with https:// or http://.",
  honey: "Leave this field empty",
  reference: "Submission reference",
  noCategory: "General enquiry",
  fileLabel: "Attachment",
  map: "View Surat on a map",
  contactWindow:
    "Response timing will be confirmed once the business contact channels are verified.",
  licenceHelp:
    "For a licence in progress, use the general enquiry form instead of submitting a trade-account application.",
  tooLarge: "The submission is too large. Licence copies must be at most 3MB.",
  originError: "This submission origin is not allowed.",
  invalidRequest: "The submission could not be read.",
  duplicate:
    "This submission is already being processed. Please wait before retrying.",
};
const shared: FormField[] = [
  { name: "name", label: "Full name", type: "text", autoComplete: "name" },
  {
    name: "company",
    label: "Company / legal name",
    type: "text",
    autoComplete: "organization",
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "phone",
    label: "Phone with country code",
    type: "tel",
    autoComplete: "tel",
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    autoComplete: "country-name",
  },
];
export const contactFields: FormField[] = [
  ...shared,
  {
    name: "category",
    label: "Product category",
    type: "select",
    optional: true,
  },
  { name: "message", label: "Your requirements", type: "textarea", wide: true },
];
export const catalogueFields: FormField[] = [
  ...shared.map((field) =>
    field.name === "email" ? { ...field, label: "Business email" } : field,
  ),
  {
    name: "businessType",
    label: "Business type",
    type: "select",
    options: [
      "Importer",
      "Distributor",
      "Pharmacy chain",
      "Hospital or institution",
      "Tender agent",
      "Other",
    ],
  },
  {
    name: "licenceHeld",
    label: "Import licence held",
    type: "select",
    options: ["Yes", "In process", "No"],
  },
  {
    name: "categories",
    label: "Categories of interest",
    type: "categories",
    wide: true,
  },
];
export const tradeFields: FormField[] = [
  {
    name: "company",
    label: "Company legal name",
    type: "text",
    autoComplete: "organization",
    step: 0,
  },
  { name: "tradingName", label: "Trading name", type: "text", step: 0 },
  {
    name: "country",
    label: "Country",
    type: "select",
    autoComplete: "country-name",
    step: 0,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    autoComplete: "address-level2",
    step: 0,
  },
  {
    name: "website",
    label: "Company website",
    type: "url",
    autoComplete: "url",
    optional: true,
    step: 0,
  },
  { name: "year", label: "Year established", type: "number", step: 0 },
  {
    name: "licenceNumber",
    label: "Import / wholesale licence number",
    type: "text",
    step: 1,
  },
  { name: "authority", label: "Issuing authority", type: "text", step: 1 },
  { name: "expiry", label: "Licence expiry", type: "date", step: 1 },
  {
    name: "categories",
    label: "Product categories",
    type: "categories",
    wide: true,
    step: 2,
  },
  {
    name: "volume",
    label: "Annual procurement volume",
    type: "select",
    options: [
      "Exploratory enquiry",
      "Pilot orders",
      "Recurring commercial orders",
      "Institutional / tender programme",
      "To be discussed",
    ],
    step: 2,
  },
  {
    name: "frequency",
    label: "Order frequency",
    type: "select",
    options: ["One-off", "Monthly", "Quarterly", "Annual", "To be discussed"],
    step: 2,
  },
  { name: "targetMarkets", label: "Target markets", type: "text", step: 2 },
  {
    name: "incoterms",
    label: "Incoterms preference",
    type: "select",
    options: ["EXW", "FCA", "FOB", "CIF", "CIP", "DAP", "To be discussed"],
    step: 2,
  },
  {
    name: "payment",
    label: "Payment terms preference",
    type: "select",
    options: ["LC", "TT", "Other"],
    step: 2,
  },
  {
    name: "name",
    label: "Contact name",
    type: "text",
    autoComplete: "name",
    step: 3,
  },
  {
    name: "role",
    label: "Role",
    type: "text",
    autoComplete: "organization-title",
    step: 3,
  },
  {
    name: "email",
    label: "Contact email",
    type: "email",
    autoComplete: "email",
    step: 3,
  },
  {
    name: "phone",
    label: "Phone with country code",
    type: "tel",
    autoComplete: "tel",
    step: 3,
  },
  {
    name: "whatsapp",
    label: "WhatsApp with country code",
    type: "tel",
    optional: true,
    step: 3,
  },
  {
    name: "method",
    label: "Preferred contact method",
    type: "select",
    options: ["Email", "Phone", "WhatsApp"],
    step: 3,
  },
  {
    name: "timezone",
    label: "Time zone",
    type: "select",
    options: [
      "UTC",
      "Africa/Lagos",
      "Africa/Nairobi",
      "Africa/Accra",
      "Asia/Kolkata",
      "Asia/Dubai",
      "Asia/Tashkent",
      "Asia/Almaty",
      "Asia/Bangkok",
      "Asia/Manila",
      "America/Lima",
      "America/Guatemala",
      "Other — specify in follow-up",
    ],
    step: 3,
  },
];
export const tradeSteps = [
  { name: "Company details" },
  { name: "Regulatory" },
  { name: "Trade profile" },
  { name: "Contact & review" },
];
export const fieldsFor = (type: FormType): FormField[] =>
  type === "trade"
    ? tradeFields
    : type === "catalogue"
      ? catalogueFields
      : contactFields;
