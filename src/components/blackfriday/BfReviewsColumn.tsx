import { productReviews } from "@/lib/verticalRackReviews";
import { reviewStats } from "@/lib/bikeRacks";
import { BfReviewCard } from "./BfReviewCard";

// 15 hand-picked five-star AU reviews (from verticalRackReviews.ts, the AU
// store's Okendo feed), stacked in a single container-width column.
// Audited for sale-detracting sentiment: anything mentioning assembly or
// instruction trouble, missing/damaged parts, delivery delays, weight, fit
// issues or "wish it had…" suggestions was left out, even when rated 5
// stars. Matched by author + title (not array index) so edits to
// verticalRackReviews.ts can't silently swap in a different review.
// `highlight` overrides the automatic pick where it would miss or land on
// the wrong sentence.
const picks: { author: string; title: string; highlight?: string }[] = [
  { author: "Scott G.", title: "Great Bike Rack" },
  { author: "Lizzie A.", title: "High quality product incredible service", highlight: "The build quality is great and the ease of use is a dream." },
  { author: "Graeme V.", title: "Awesome Product", highlight: "No vibration or noise while driving" },
  { author: "Jayden L.", title: "Easy loading", highlight: "It makes loading the bikes way easier and makes it easier to get out on the bike more." },
  {
    author: "Ryan J.",
    title: "4 bike rack",
    highlight: "The price is excellent, the story behind them is inspiring, the rack itself is strong and durable",
  },
  { author: "Thomas G.", title: "Nice rack" },
  { author: "Carl Z.", title: "Super fast delivery, great product 👍" },
  { author: "Justin V.", title: "Superb Product and Service." },
  { author: "Sally D.", title: "Very Happy" },
  { author: "David B.", title: "JB 5 Bike Rack" },
  { author: "Shaun T.", title: "In racks" },
  { author: "Danie S.", title: "4 Bike Rack" },
  { author: "Roger S.", title: "Very Nice" },
  { author: "Sam T.", title: "6 bike car rack" },
  { author: "Shannon D.", title: "Easy in/out, Stable" },
];

const curatedReviews = picks.flatMap((p) => {
  const review = productReviews.find((r) => r.author === p.author && r.title === p.title && r.rating === 5);
  return review ? [{ review, highlight: p.highlight }] : [];
});

export function BfReviewsColumn() {
  return (
    // White section with brand-cream cards (same cream as the closing CTA),
    // so each review reads as its own block.
    <div className="border-t border-brand-line bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-[1000px] px-5">
        <div className="mx-auto mb-3 max-w-[62ch] text-center">
          <div className="mb-2.5 text-sm font-bold text-brand-green-dark">VERIFIED REVIEWS</div>
          <h2 className="text-3xl font-extrabold uppercase leading-[1.14] tracking-tighter text-brand-black sm:text-5xl">What riders are saying</h2>
        </div>
        <p className="mb-8 text-center text-sm text-brand-black/70">
          <span className="text-brand-star">★★★★★</span> {reviewStats.average}/5 average · {reviewStats.percentRecommended}% would recommend
        </p>

        <div className="flex flex-col gap-4">
          {curatedReviews.map(({ review, highlight }) => (
            <BfReviewCard key={`${review.author}-${review.title}`} review={review} highlight={highlight} />
          ))}
        </div>
      </div>
    </div>
  );
}
