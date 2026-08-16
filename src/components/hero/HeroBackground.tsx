/**
 * Video lives at public/videos/hero-video.mp4. No poster/fallback image —
 * the hero section's own solid background shows until the video is ready,
 * so there's nothing to flash before playback starts.
 *
 * preload="auto" so the video starts fetching as soon as possible instead
 * of waiting, minimizing the gap before it takes over.
 */
export default function HeroBackground() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src="/videos/hero-video.mp4" type="video/mp4" />
    </video>
  );
}
