// Real product, pricing, and variant data pulled from jbracks.com.au's public
// Storefront JSON endpoints (/products/<handle>.json) — not invented. Variant
// IDs are numeric Shopify IDs; toVariantGid() converts them for the
// Storefront GraphQL API used in lib/shopify.ts.
//
// The price/compareAtPrice fields below are a fallback snapshot only — once
// NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN/TOKEN are set, getLiveBikeRackData() in
// bikeRacksLive.ts overwrites them with live values fetched from Shopify, so
// this file never needs manual repricing. All prices are AUD.

export function toVariantGid(id: number): string {
  return `gid://shopify/ProductVariant/${id}`;
}

export type Color = "Black" | "Velo Turquoise" | "Leaf Green";

export const colors: { name: Color; hex: string }[] = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "Velo Turquoise", hex: "#2ec4c6" },
  { name: "Leaf Green", hex: "#5a8f3c" },
];

export type RackSize = {
  bikes: 4 | 5 | 6;
  label: string;
  sublabel: string;
  badge?: string;
  handle: string;
  price: number;
  compareAtPrice: number;
  imagesByColor: Record<Color, string[]>;
  // Stand-only bundle (rack + Shed Stand)
  standBundle: { handle: string; price: number; compareAtPrice: number; variants: Record<Color, number> };
  // Full bundle (rack + Shed Stand + Slow-Fold Strut)
  fullBundle: { handle: string; price: number; compareAtPrice: number; variants: Record<Color, number> };
  variants: Record<Color, number>;
};

const CDN = "https://cdn.shopify.com/s/files/1/0694/1117/6660/files";

// Shared "benefit" lifestyle photos — not tied to any specific color, so on
// the real product page Shopify appends the same set to the end of every
// variant's gallery (they carry empty variant_ids). Same 6 images/URLs
// across all three sizes.
const benefitImages = [
  `${CDN}/jb-racks_ready_in_seconds.webp?v=1784529004`,
  `${CDN}/jb-racks_park_and_ride.webp?v=1784528949`,
  `${CDN}/jb-racks_cheap_adventures.webp?v=1784528956`,
  `${CDN}/jb-racks_fits_almost_any_vehicle.webp?v=1784528995`,
  `${CDN}/jb-racks_easy_to_attach.webp?v=1784529021`,
  `${CDN}/jb-racks_take_the_whole_crew.webp?v=1784528980`,
];

export const rackSizes: RackSize[] = [
  {
    bikes: 4,
    label: "4 Bikes",
    sublabel: "Small families",
    handle: "4-e-bike-rack",
    price: 850,
    compareAtPrice: 950,
    imagesByColor: {
      Black: [
        `${CDN}/4-bike-rack-black-new-photo-1-1.webp?v=1781659158`,
        `${CDN}/4-bike-rack-black-new-photo-1.png?v=1772585640`,
        `${CDN}/4-bike-rack-black-new-photo-2.png?v=1773111793`,
        `${CDN}/4-bike-rack-black-new-photo-3.png?v=1773111793`,
        `${CDN}/4-bike-rack-black-new-photo-5.png?v=1773111793`,
        `${CDN}/4-bike-rack-black-new-photo-4.png?v=1773111793`,
        ...benefitImages,
      ],
      "Velo Turquoise": [
        `${CDN}/4-velo-black-plate.webp?v=1773111793`,
        `${CDN}/4-bike-rack-velo-new-photo-2.png?v=1773111793`,
        `${CDN}/4-bike-rack-velo-new-photo-3.png?v=1773111793`,
        `${CDN}/4-bike-rack-velo-new-photo-4.png?v=1773111793`,
        `${CDN}/4-bike-rack-velo-new-photo-5.png?v=1773111793`,
        ...benefitImages,
      ],
      "Leaf Green": [
        `${CDN}/4-bike-leaf-green-velo-straps-black-top-plate.webp?v=1774311053`,
        `${CDN}/4-bike-leaf-green-3.webp?v=1774311053`,
        `${CDN}/4-bike-leaf-green-2.webp?v=1774311053`,
        `${CDN}/4-bike-leaf-green-5.webp?v=1774311053`,
        `${CDN}/4-bike-leaf-green-4.webp?v=1774311053`,
        ...benefitImages,
      ],
    },
    variants: { Black: 51043382821183, "Velo Turquoise": 51041178714431, "Leaf Green": 51480592220479 },
    standBundle: {
      handle: "4-bike-rack-and-stand-bundle",
      price: 950,
      compareAtPrice: 1250,
      variants: { Black: 54011216298303, "Velo Turquoise": 54011216331071, "Leaf Green": 54011216363839 },
    },
    fullBundle: {
      handle: "4-bike-rack-strut-and-stand-bundle",
      price: 1050,
      compareAtPrice: 1500,
      variants: { Black: 51300629709119, "Velo Turquoise": 51300629807423, "Leaf Green": 51520618987839 },
    },
  },
  {
    bikes: 5,
    label: "5 Bikes",
    sublabel: "Room to grow",
    badge: "Most Popular",
    handle: "5-e-bike-rack",
    price: 850,
    compareAtPrice: 950,
    imagesByColor: {
      Black: [
        `${CDN}/5-bike-rack-black-new-photo-1_2de2334d-a7a1-4113-9225-3adcaf9e4bd6.webp?v=1772584840`,
        `${CDN}/5-bike-rack-black-new-photo-1.png?v=1772586819`,
        `${CDN}/5-bike-rack-black-new-photo-3.png?v=1772586819`,
        `${CDN}/5-bike-rack-black-new-photo-2.png?v=1772586819`,
        `${CDN}/5-bike-rack-black-new-photo-5.png?v=1772586819`,
        `${CDN}/5-bike-rack-black-new-photo-4.png?v=1772586819`,
        ...benefitImages,
      ],
      "Velo Turquoise": [
        `${CDN}/5-velo-black-plate_87296b08-1358-4e38-a88c-80a4137b5ddf.webp?v=1772586819`,
        `${CDN}/5-bike-rack-velo-new-photo-2.png?v=1772586819`,
        `${CDN}/5-bike-rack-velo-new-photo-3.png?v=1772586819`,
        `${CDN}/5-bike-rack-velo-new-photo-4.png?v=1772586819`,
        `${CDN}/5-bike-rack-velo-new-photo-5.png?v=1772586819`,
        ...benefitImages,
      ],
      "Leaf Green": [
        `${CDN}/5-bike-leaf-green-velo-straps-black-top-plate.webp?v=1774311079`,
        `${CDN}/5-bike-leaf-green-2.webp?v=1774311079`,
        `${CDN}/5-bike-leaf-green-3.webp?v=1774311079`,
        `${CDN}/5-bike-leaf-green-5.webp?v=1774311079`,
        `${CDN}/5-bike-leaf-green-4.webp?v=1774311079`,
        ...benefitImages,
      ],
    },
    variants: { Black: 51043406184767, "Velo Turquoise": 50824881996095, "Leaf Green": 51480585568575 },
    standBundle: {
      handle: "5-bike-rack-and-stand-bundle",
      price: 950,
      compareAtPrice: 1250,
      variants: { Black: 54011220001087, "Velo Turquoise": 54011220033855, "Leaf Green": 54011220066623 },
    },
    fullBundle: {
      handle: "5-bike-rack-strut-and-stand-bundle",
      price: 1050,
      compareAtPrice: 1500,
      variants: { Black: 51300653171007, "Velo Turquoise": 51300653269311, "Leaf Green": 51520617840959 },
    },
  },
  {
    bikes: 6,
    label: "6 Bikes",
    sublabel: "The whole crew",
    handle: "6-e-bike-rack",
    price: 850,
    compareAtPrice: 950,
    imagesByColor: {
      Black: [
        `${CDN}/6-bike-rack-black-new-photo-1_43f5e1c9-1783-44b6-b132-7e8c47027995.webp?v=1767759172`,
        `${CDN}/6-bike-rack-black-new-photo-1a.png?v=1767759172`,
        `${CDN}/6-bike-rack-black-new-photo-2.png?v=1772584719`,
        `${CDN}/6-bike-rack-black-new-photo-3.png?v=1772584719`,
        `${CDN}/6-bike-rack-black-new-photo-4.png?v=1772584719`,
        `${CDN}/6-bike-rack-black-new-photo-5.png?v=1772584719`,
        ...benefitImages,
      ],
      "Velo Turquoise": [
        `${CDN}/6-velo-black-plate.webp?v=1772584719`,
        `${CDN}/6-bike-rack-velo-new-photo-2.png?v=1772584719`,
        `${CDN}/6-bike-rack-velo-new-photo-3.png?v=1772584719`,
        `${CDN}/6-bike-rack-velo-new-photo-4.png?v=1772584719`,
        `${CDN}/6-bike-rack-velo-new-photo-5.png?v=1772584719`,
        ...benefitImages,
      ],
      "Leaf Green": [
        `${CDN}/6-bike-leaf-green-velo-strap-black-top-plate.webp?v=1774311111`,
        `${CDN}/6-bike-leaf-green-2.webp?v=1774311111`,
        `${CDN}/6-bike-leaf-green-3.webp?v=1774311111`,
        `${CDN}/6-bike-leaf-green-4.webp?v=1774311111`,
        `${CDN}/6-bike-leaf-green-5.webp?v=1774311111`,
        ...benefitImages,
      ],
    },
    variants: { Black: 50817377894719, "Velo Turquoise": 50817379303743, "Leaf Green": 51480593334591 },
    standBundle: {
      handle: "6-bike-rack-and-stand-bundle",
      price: 950,
      compareAtPrice: 1250,
      variants: { Black: 54011225211199, "Velo Turquoise": 54011225243967, "Leaf Green": 54011225276735 },
    },
    fullBundle: {
      handle: "6-bike-rack-strut-and-stand-bundle",
      price: 1050,
      compareAtPrice: 1500,
      variants: { Black: 51300656873791, "Velo Turquoise": 51300656972095, "Leaf Green": 51520617513279 },
    },
  },
];

export type Addons = typeof addons;

// AU store CDN — add-on photos come from the AU products themselves.
const AU_CDN = "https://cdn.shopify.com/s/files/1/0833/3767/5071/files";

// The AU store sells the Shed Stand and Slow-Fold Strut to rack buyers
// through real bundle SKUs (rack + stand, rack + stand + strut — see
// standBundle/fullBundle above) rather than an upsell-app discount, so
// garageStand.price and slowFoldStrut.price here are the *in-bundle*
// prices: the step from rack → stand bundle ($850 → $950) and from stand
// bundle → full bundle ($950 → $1,050). bikeRacksLive.ts recomputes both
// from the live bundle prices, so they never drift from what checkout
// charges. compareAtPrice is each product's standalone RRP.
//
// There's no rack + strut-only bundle on the AU store, so a strut added
// *without* the stand is its own cart line at the full standalone price —
// that's slowFoldStrut.standalonePrice, which BuyBox shows/charges in that
// case. The garageStand key name is kept from the US build so components
// stay shared; the AU store calls it the Shed Stand.
export const addons = {
  garageStand: {
    name: "Shed Stand",
    note: "Stores your rack off the car when it's not in use",
    price: 100,
    compareAtPrice: 300,
    variantId: 47062530523455,
    image: `${AU_CDN}/shed-stand-5_178877ed-7918-4362-b84a-553aaaa89ca5.webp?v=1773812348`,
  },
  slowFoldStrut: {
    name: "Slow-Fold Strut",
    note: "Gas-assisted, controlled fold — no more bumper slams",
    price: 100,
    compareAtPrice: 250,
    standalonePrice: 250,
    variantId: 51584743670079,
    image: `${AU_CDN}/twin-fold-strut-featured.webp?v=1766116279`,
  },
  swingArm: {
    name: "Swing Arm",
    note: "Full boot access without unloading a single bike",
    price: 499,
    variantId: 50918002950463,
    image: `${AU_CDN}/swing-arm-jb-racks.webp?v=1764917182`,
  },
};

// Real aggregate review data for the 4 Vertical Bike Rack (Okendo, from
// jbracks.com.au's live product page and reviews API — not estimated).
export const reviewStats = {
  average: 4.7,
  count: 196,
  fiveStarCount: 147,
  percentRecommended: 95,
};

// Real customer quotes, sourced from jbracks.com.au's own reviews.
export const reviews = [
  { name: "Roger", quote: "Very surprised at the quality for the price and looks great. I was a little unsure about JB racks but now happy I went with it." },
  { name: "Dale W.", quote: "Great rack! Just took it out for the first time fully loaded, and it handled everything with ease." },
  { name: "Austin E.", quote: "Awesome rack. Plenty of play in the hitch so a stabilizer is a must. Material is sturdy and feels high quality." },
  { name: "Rowan B.", quote: "Very happy with the rack, better than I expected. Customer service were helpful as needed some help with build." },
  { name: "Andrew S.", quote: "Easy to load and unload and looks great. So, I def needed to get a hitch clamp for it, but other than that, it's perfect." },
  { name: "Helen M.", quote: "Very good for the money, our e-bikes much easier to transport now." },
];

export const faqs = [
  {
    question: "What size hitch do I need?",
    answer: "A 50mm (2\") Class III tow bar receiver — the most common tow hitch in Australia. The 450mm hitch bar clears rear-mounted spare wheels.",
  },
  {
    question: "What's the weight capacity?",
    answer: "Each wheel holder carries up to 30 kg, with 110 kg of total combined capacity — rated for e-bikes.",
  },
  {
    question: "Will it fit my bike?",
    answer: "Fits 21–29\" wheels and tyres up to 3\" wide, covering most standard and plus-size setups.",
  },
  {
    question: "Is shipping really free?",
    answer: "Yes — free shipping to major cities and major regional areas, with delivery typically in 4–8 business days.",
  },
  {
    question: "How long does assembly take?",
    answer: "Most riders finish in 30-45 minutes. We provide a full assembly video to walk you through it.",
  },
  {
    question: "What if something's not right?",
    answer: "Every rack is backed by a 4-year warranty and our support team — contact us and we'll sort it out.",
  },
];
