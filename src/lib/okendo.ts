import { reviewPhotos, type ReviewPhoto } from "./reviewPhotos";

// Okendo's public reviews API for the 4 Bike Rack — the same feed the
// jbracks.com.au product page widget reads (AU Okendo account). It only returns approved reviews
// and only the media that hasn't been hidden in the Okendo dashboard (there
// is no "hidden" flag; hidden media is simply left out).
const OKENDO_API = "https://api.okendo.io/v1";
const FIRST_PAGE = "/stores/442d4e28-7f23-47f9-ae79-9c376bb2d2c3/products/shopify-10011049394495/reviews?limit=25&orderBy=date%20desc";
// ~200 reviews today; a cap keeps a runaway nextUrl chain from hanging a render.
const MAX_PAGES = 20;

type OkendoPage = {
  nextUrl?: string;
  reviews?: { media?: { largeUrl?: string }[] }[];
};

// Okendo image URLs share a per-image UUID across sizes/store prefixes.
const imageId = (url: string) => url.split("/").pop()?.split(".")[0] ?? url;

// reviewPhotos filtered to the photos Okendo still shows publicly, so a
// photo hidden in Okendo drops off the page at the next ISR refresh without
// a code change. Responses are cached for an hour. On any API failure it
// falls back to the static list (which has already had hidden photos
// removed by hand) rather than showing nothing.
export async function getVisibleReviewPhotos(): Promise<ReviewPhoto[]> {
  try {
    const visible = new Set<string>();
    let next: string | undefined = FIRST_PAGE;
    for (let page = 0; next && page < MAX_PAGES; page++) {
      const res: Response = await fetch(OKENDO_API + next, { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error(`Okendo ${res.status}`);
      const data: OkendoPage = await res.json();
      for (const review of data.reviews ?? []) {
        for (const media of review.media ?? []) if (media.largeUrl) visible.add(imageId(media.largeUrl));
      }
      next = data.nextUrl;
    }
    // An empty result almost certainly means a bad response, not that every
    // photo was hidden — don't wipe the strip on that.
    if (visible.size === 0) return reviewPhotos;
    return reviewPhotos.filter((photo) => visible.has(imageId(photo.src)));
  } catch {
    return reviewPhotos;
  }
}
