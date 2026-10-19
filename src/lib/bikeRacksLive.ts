// Server-only: fetches live price/compare-at-price for every rack, bundle,
// and add-on variant from the Shopify Storefront API and merges it over the
// static fallback data in bikeRacks.ts. Falls back to the static snapshot
// whenever Shopify isn't configured yet or the request fails, so the page
// never breaks for lack of credentials.

import { rackSizes as staticRackSizes, addons as staticAddons, type RackSize, type Addons } from "./bikeRacks";
import { getVariantPrices, isShopifyConfigured, type LiveVariantPrice } from "./shopify";

function pricedFields(
  live: Map<number, LiveVariantPrice>,
  variantId: number,
  fallbackPrice: number,
  fallbackCompareAtPrice: number
): { price: number; compareAtPrice: number } {
  const match = live.get(variantId);
  return {
    price: match?.price ?? fallbackPrice,
    compareAtPrice: match?.compareAtPrice ?? fallbackCompareAtPrice,
  };
}

function pricedPriceOnly(live: Map<number, LiveVariantPrice>, variantId: number, fallbackPrice: number): number {
  return live.get(variantId)?.price ?? fallbackPrice;
}

export type LiveBikeRackData = {
  rackSizes: RackSize[];
  addons: Addons;
  // Numeric variant IDs the merchant has flagged out_of_stock via the
  // "stock_status" metafield — checked by BuyBox before allowing a
  // selection/purchase, regardless of which page renders it.
  outOfStockVariantIds: Set<number>;
};

export async function getLiveBikeRackData(): Promise<LiveBikeRackData> {
  if (!isShopifyConfigured) {
    return { rackSizes: staticRackSizes, addons: staticAddons, outOfStockVariantIds: new Set() };
  }

  const variantIds = [
    ...staticRackSizes.flatMap((s) => [
      ...Object.values(s.variants),
      ...Object.values(s.standBundle.variants),
      ...Object.values(s.fullBundle.variants),
    ]),
    ...Object.values(staticAddons).map((a) => a.variantId),
  ];

  let live: Map<number, LiveVariantPrice>;
  try {
    live = await getVariantPrices(variantIds);
  } catch {
    // Shopify unreachable/misconfigured — keep showing the static snapshot.
    return { rackSizes: staticRackSizes, addons: staticAddons, outOfStockVariantIds: new Set() };
  }

  const outOfStockVariantIds = new Set<number>();
  for (const [id, v] of live) {
    if (v.manuallyOutOfStock) outOfStockVariantIds.add(id);
  }

  // All three colors share one price per product on the live store, so the
  // Black variant's price represents the whole size/bundle.
  const rackSizes: RackSize[] = staticRackSizes.map((s) => ({
    ...s,
    ...pricedFields(live, s.variants.Black, s.price, s.compareAtPrice),
    standBundle: {
      ...s.standBundle,
      ...pricedFields(live, s.standBundle.variants.Black, s.standBundle.price, s.standBundle.compareAtPrice),
    },
    fullBundle: {
      ...s.fullBundle,
      ...pricedFields(live, s.fullBundle.variants.Black, s.fullBundle.price, s.fullBundle.compareAtPrice),
    },
  }));

  // garageStand and slowFoldStrut show their *in-bundle* price — what the
  // AU store's real bundle SKUs actually add on top of the rack — so
  // they're derived from the live bundle prices rather than read off their
  // own variants (which resolve to the standalone RRP): stand = stand
  // bundle − rack, strut = full bundle − stand bundle. All sizes share one
  // price per product, so the 4-bike rack's numbers stand in for all three.
  // The strut's standalonePrice (charged when it's added without the
  // stand, since there's no rack + strut-only bundle) *is* its own
  // variant's live price.
  const base = rackSizes[0];
  const standInBundle = base.standBundle.price - base.price;
  const strutInBundle = base.fullBundle.price - base.standBundle.price;
  const addons: Addons = {
    garageStand: {
      ...staticAddons.garageStand,
      price: standInBundle > 0 ? standInBundle : staticAddons.garageStand.price,
    },
    slowFoldStrut: {
      ...staticAddons.slowFoldStrut,
      price: strutInBundle > 0 ? strutInBundle : staticAddons.slowFoldStrut.price,
      standalonePrice: pricedPriceOnly(live, staticAddons.slowFoldStrut.variantId, staticAddons.slowFoldStrut.standalonePrice),
    },
    swingArm: {
      ...staticAddons.swingArm,
      price: pricedPriceOnly(live, staticAddons.swingArm.variantId, staticAddons.swingArm.price),
    },
  };

  return { rackSizes, addons, outOfStockVariantIds };
}
