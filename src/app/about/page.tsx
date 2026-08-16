export const metadata = {
  title: "About — Meraz",
  description: "The story behind Meraz's tailored, timeless essentials.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
        About Us
      </p>
      <h1 className="mt-2 text-4xl font-semibold text-neutral-900">
        Crafted for the Long Wear
      </h1>
      <p className="mt-8 text-base leading-relaxed text-neutral-600">
        Meraz was founded on a simple idea: clothing should be made well
        enough to last, and designed simply enough to never go out of style.
        Every piece in our collection is chosen for its fabric, construction,
        and fit — built to be worn for years, not seasons.
      </p>
      <p className="mt-6 text-base leading-relaxed text-neutral-600">
        We work with a small set of mills and makers who share our
        obsession with quality, and we keep our collection deliberately
        small so that every piece earns its place in your wardrobe.
      </p>
    </div>
  );
}
