import type { Product } from "../types";
import { bags } from "./bags";
import { banners } from "./banners";
import { packaging } from "./packaging";
import { brochures, businessCards, calendars } from "./print-collateral";
import { capsHats, clothing, clothingTags } from "./apparel";
import { envelopes, flyersPosters, invitations } from "./paper-goods";
import { souvenirs } from "./souvenirs";
import { stationery, campaignMaterials } from "./stationery";

/**
 * Every product record, published or not.
 *
 * Prices, specifications and delivery times are transcribed from the
 * PrintPalash price list. Where the source contained a typo, a contradiction
 * or an implausible figure, the value was preserved or withheld and the issue
 * recorded in that product's `dataReview` array — never silently corrected.
 * Run `getDataReviewItems()` from the repository to list them all.
 */
export const ALL_PRODUCTS: Product[] = [
  ...bags,
  ...banners,
  ...packaging,
  ...brochures,
  ...businessCards,
  ...calendars,
  ...campaignMaterials,
  ...capsHats,
  ...clothing,
  ...clothingTags,
  ...envelopes,
  ...souvenirs,
  ...flyersPosters,
  ...invitations,
  ...stationery,
];
