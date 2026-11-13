import type { ProductReview } from "@/lib/verticalRackReviews";
import { findHighlight } from "@/lib/reviewHighlight";

// Cream review card for /lp-demo-black-friday's review column (the US
// app's tinted ReviewCard). Kept separate from ReviewsCarousel so the
// carousel on the other AU pages is unchanged.
function highlightBody(body: string, override?: string) {
  const target = override ?? findHighlight(body);
  if (!target) return body;
  const index = body.indexOf(target);
  if (index === -1) return body;
  return (
    <>
      {body.slice(0, index)}
      <mark className="rounded bg-brand-yellow/60 px-1 py-0.5 font-semibold text-brand-black">{target}</mark>
      {body.slice(index + target.length)}
    </>
  );
}

export function BfReviewCard({ review, highlight }: { review: ProductReview; highlight?: string }) {
  // Variants are stored as "Colour / Colour" — the first half is enough.
  const colour = review.variant?.split(" / ")[0];
  return (
    <div className="flex flex-col rounded-xl bg-brand-cream p-6 lg:p-8">
      <div className="mb-3 text-[15px] tracking-[2px] text-brand-star" aria-hidden>
        {"★".repeat(review.rating)}
        {"☆".repeat(5 - review.rating)}
      </div>
      {review.title && (
        <h3 className="text-[18px] font-extrabold uppercase leading-[1.15] tracking-tight text-brand-black sm:text-[22px]">{review.title}</h3>
      )}
      <p className="mt-3 flex-1 text-[16px] leading-[1.7] text-brand-black/80 lg:text-[17px]">&ldquo;{highlightBody(review.body, highlight)}&rdquo;</p>
      <div className="mt-5 border-t border-brand-black/10 pt-4 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-brand-black/70">
        <span className="text-brand-black">{review.author}</span> / Verified buyer
        {colour && <span className="text-brand-black/60"> / {colour}</span>}
      </div>
    </div>
  );
}
