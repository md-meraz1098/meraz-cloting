import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    href: "#",
    label: "Instagram",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8.25A5.25 5.25 0 0 1 8.25 3h7.5A5.25 5.25 0 0 1 21 8.25v7.5A5.25 5.25 0 0 1 15.75 21h-7.5A5.25 5.25 0 0 1 3 15.75v-7.5Zm9 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Zm5-1.125a.875.875 0 1 1-1.75 0 .875.875 0 0 1 1.75 0Z"
      />
    ),
  },
  {
    href: "#",
    label: "Facebook",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.25 8.25V6.375c0-.621.504-1.125 1.125-1.125h1.875V2.25h-2.625A3.75 3.75 0 0 0 10.875 6v2.25H8.25V11.25h2.625V21.75h3.375V11.25h2.625l.375-3H14.25Z"
      />
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="text-lg font-semibold tracking-[0.2em] text-neutral-900"
            >
              MERAZ
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
              Timeless essentials, tailored for you — crafted from premium
              materials, made to last beyond the season.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    className="h-4 w-4"
                  >
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-900">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-500">
              <li>
                <a
                  href="mailto:amimeraz1098@gmail.com"
                  className="transition-colors hover:text-neutral-900"
                >
                  amimeraz1098@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801309432441"
                  className="transition-colors hover:text-neutral-900"
                >
                  +880 1309-432441
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-neutral-200 pt-8 text-center sm:text-left">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Meraz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
