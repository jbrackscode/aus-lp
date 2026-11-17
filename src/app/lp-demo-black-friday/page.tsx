import type { Metadata } from "next";
import { BfComparisonTable } from "@/components/blackfriday/BfComparisonTable";
import { InUseMarquee } from "@/components/bikeracks/InUseMarquee";
import { BfReviewsColumn } from "@/components/blackfriday/BfReviewsColumn";
import { FAQ } from "@/components/lp/FAQ";
import { Footer } from "@/components/lp/Footer";
import { BlackFridayBar } from "@/components/blackfriday/BlackFridayBar";
import { ArticleHeader } from "@/components/blackfriday/ArticleHeader";
import { ArticleReason } from "@/components/blackfriday/ArticleReason";
import { EditorsNote } from "@/components/blackfriday/EditorsNote";
import { BlackFridayOffer } from "@/components/blackfriday/BlackFridayOffer";
import { BlackFridayMarquee } from "@/components/blackfriday/BlackFridayMarquee";
import { BlackFridayClosing } from "@/components/blackfriday/BlackFridayClosing";
import { NextSteps } from "@/components/blackfriday/NextSteps";
import { StickySaleBar } from "@/components/blackfriday/StickySaleBar";
import { featureRows, product, testimonials } from "@/lib/config";
import { getLiveBikeRackData } from "@/lib/bikeRacksLive";
import { getBlackFridayOffer, saleCtaLabel } from "@/lib/blackFriday";
import { getVisibleReviewPhotos } from "@/lib/okendo";

// AU version of the US app's /lp-demo-black-friday: AUD pricing from the
// AU store, AU reviews/photos (AU Okendo account), Sydney-time sale window,
// metric specs and AU shipping/Afterpay copy.
//
// Black Friday advertorial built from /lp-demonstration-videos' content.
// Reads as an article first (problem headline, "5 reasons" line, summary, five
// numbered reasons with the same videos and real owner
// quotes), with the sale kept to the top strip, a soft editor's note
// mid-article, and the full offer (countdown + sale-progress bar) low on
// the page — then customer photos, reviews and the FAQ. Every offer number
// comes from live Shopify pricing via getBlackFridayOffer.
export const metadata: Metadata = {
  title: "5 Reasons 20,000+ Riders Swear by Vertical Bike Racks - JB Racks",
  description:
    "Why Aussie riders are switching to vertical tow bar bike racks - plus JB Racks' Black Friday sale on every rack size. E-bike rated, 4-year warranty, free metro shipping.",
};

// Same 5-minute ISR as the other buy-box pages — pricing comes from the same
// live (cached) Shopify data instead of a static number.
export const revalidate = 300;

// Verbatim excerpts from 5-star AU reviews in verticalRackReviews.ts,
// matched to the reason they back up.
const reasonQuotes = [
  { text: "Easy to load bikes on and off.", author: "Scott G." },
  { text: "Highly recommend JB racks especially for value for money.", author: "Lizzie A." },
  { text: "Peace of mind that my bikes will be 100% secured.", author: "Kelvin L." },
  { text: "Fits well. No issues. Perfect design.", author: "Russell W." },
  // Reason 05 is the e-bike reason (see reasonRows below). The only AU
  // 5-star review mentioning e-bikes also says the rack is heavy with them
  // loaded, so this is Helen M.'s testimonial from the store's own
  // marketing (config.ts testimonials), quoted verbatim.
  {
    text: testimonials.find((t) => t.name === "Helen M.")?.quote ?? "",
    author: "Helen M.",
  },
];

// Short topic labels for each reason's inset count ("01 / FAST LOADING"),
// in featureRows order.
const reasonKickers = ["Fast loading", "Value", "Bike protection", "Vehicle fit", "E-bike ready"];

// featureRows' fifth row ("Arrive. Unload. Ride.") repeats the first
// ("Unload Fast. Ride Sooner."), so this page swaps it for e-bike capacity.
// Specs are the AU product page's: 30 kg per wheel holder, 110 kg total.
// Same clip as before. featureRows itself is shared with the
// /lp-demonstration pages, so the swap happens here.
const reasonRows = featureRows.map((row, i) =>
  i === 4
    ? {
        ...row,
        title: "Built for Heavy E-Bikes",
        body: "Each wheel holder is rated to 30 kg, with 110 kg of total capacity across the rack - enough for e-bikes and adult mountain bikes. And you roll each bike onto its holder, so there's no hoisting a heavy e-bike above your head.",
      }
    : row,
);

export default async function LpDemoBlackFridayPage() {
  // Customer photos are checked against Okendo's public feed so any photo
  // hidden in Okendo never reaches the "racks in use" strip.
  const [{ rackSizes }, photos] = await Promise.all([getLiveBikeRackData(), getVisibleReviewPhotos()]);
  const offer = getBlackFridayOffer(rackSizes);

  const reasons = reasonRows.map((row, i) => (
    <ArticleReason
      key={row.title}
      number={i + 1}
      kicker={reasonKickers[i]}
      title={row.title}
      // This page uses hyphens, not em dashes; featureRows is shared with
      // the /lp-demonstration pages, so it's swapped here rather than there.
      body={row.body.replaceAll(" — ", " - ")}
      image={row.image}
      // Light 560x560 encodes of the same square clips plus a first-frame
      // poster each, in /videos/bf — ~1.1 MB total vs ~11.6 MB for the
      // 1080p originals the other pages use.
      video={row.video.replace("/videos/", "/videos/bf/")}
      poster={row.video.replace("/videos/", "/videos/bf/").replace(/\.mp4$/, ".webp")}
      quote={reasonQuotes[i]}
    />
  ));

  return (
    <>
      <BlackFridayBar offer={offer} />
      <main className="bg-white">
        <ArticleHeader offer={offer} />

        {reasons.slice(0, 2)}
        <EditorsNote offer={offer} />
        {reasons.slice(2)}

        <div className="mt-14">
          <BfComparisonTable price={offer.price} ctaHref={product.productUrl} ctaLabel={saleCtaLabel(offer)} ctaShowPrice={false} />
        </div>

        {/* The article hands over to the sale here: the store's Black
            Friday logo band leads straight into the offer block. */}
        <BlackFridayMarquee />
        <BlackFridayOffer offer={offer} />

        <InUseMarquee photos={photos} />
        <BfReviewsColumn />

        <section className="pb-[39px] pt-[30px] sm:pb-[52px] sm:pt-10">
          <div className="mx-auto max-w-[1000px] px-5">
            <h2 className="mb-6 text-center text-3xl font-extrabold uppercase tracking-tighter leading-[1.14] text-brand-black sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <FAQ />
          </div>
        </section>

        {/* How to order: size → colour → add to cart, right before the
            final CTA sends them to the product page. */}
        <NextSteps rackSizes={rackSizes} offer={offer} />

        {/* Every "Shop the Sale" button on this page goes to the 4-bike rack's
            product page on the store rather than straight to checkout. */}
        <BlackFridayClosing offer={offer} />
      </main>
      <Footer />
      {/* Mobile sticky offer bar, plus room under the footer so the bar
          never covers its last line. */}
      <StickySaleBar offer={offer} />
      <div className="h-20 bg-brand-black sm:hidden" aria-hidden />
    </>
  );
}
