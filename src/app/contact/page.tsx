export const metadata = {
  title: "Contact — Meraz",
  description: "Get in touch with the Meraz team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
        Contact
      </p>
      <h1 className="mt-2 text-4xl font-semibold text-neutral-900">
        Get in Touch
      </h1>
      <p className="mt-8 text-base leading-relaxed text-neutral-600">
        Have a question about an order, sizing, or anything else? We&apos;d
        love to hear from you.
      </p>
      <div className="mt-10 space-y-4 border-t border-neutral-200 pt-8">
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            Email
          </p>
          <p className="mt-1 text-base text-neutral-900">
            amimeraz1098@gmail.com
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            bKash (Payments)
          </p>
          <p className="mt-1 text-base text-neutral-900">01309432441</p>
        </div>
      </div>
    </div>
  );
}
