"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Copy of FeatureMedia from the US app's FeatureRow (lazy loading, poster,
// IntersectionObserver play/pause) for /lp-demo-black-friday only, so the
// other AU pages' FeatureRow stays as it is.

type FeatureMediaProps = {
  image: string;
  video?: string;
  // Overrides the default square crop.
  aspect?: string;
  // Still frame shown instantly while the video loads (instead of the
  // "Loading video…" placeholder).
  poster?: string;
  // Don't download the video until it's near the viewport, and pause it
  // while it's off screen. Without this the video autoplays with
  // preload="auto" — every clip on the page downloads on first load.
  lazy?: boolean;
};

// The image/video tile on its own — also used by ArticleReason on
// /lp-demo-black-friday (with a poster, lazy loading and the lighter
// /videos/bf encodes).
export function FeatureMedia({ image, video, aspect = "aspect-square", poster, lazy = false }: FeatureMediaProps) {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!lazy || !el) return;
    // play() on a preload="none" video is what starts the download; the
    // margin gives it a head start so it's moving by the time it's seen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy, video]);

  return (
    <div className={`relative ${aspect} w-full overflow-hidden rounded-[12px] bg-brand-cream shadow-[0_4px_16px_rgba(0,0,0,0.08)]`}>
      {video ? (
        <>
          {!videoReady && !poster && (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-cream">
              <div className="flex items-center gap-2 rounded-full bg-brand-black/70 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                Loading video…
              </div>
            </div>
          )}
          <video
            ref={videoRef}
            src={video}
            poster={poster}
            autoPlay={!lazy}
            muted
            loop
            playsInline
            preload={lazy ? "none" : "auto"}
            onCanPlay={() => setVideoReady(true)}
            onLoadedData={() => setVideoReady(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoReady || poster ? "opacity-100" : "opacity-0"}`}
          />
        </>
      ) : (
        <Image src={image} alt="" fill sizes="(min-width: 640px) 500px, 100vw" className="object-cover" />
      )}
    </div>
  );
}
