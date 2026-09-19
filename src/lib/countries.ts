import { countries } from "@/content/countries";
export const countryOptions = countries;
export const countryName = (code: string) =>
  countryOptions.find((country) => country.code === code)?.name ?? code;
