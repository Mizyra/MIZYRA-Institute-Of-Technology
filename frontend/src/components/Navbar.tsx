"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#programs", label: "Programs" },
  { href: "/#research", label: "Research & Labs" },
  { href: "/apply", label: "Admissions" },
  { href: "/#industry", label: "Industry" },
  { href: "/blog", label: "News & Events" },
  { href: "/#about", label: "About" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={clsx("fixed top-0 left-0 right-0 z-50 w-full transition-all")}>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 z-0">
          <span className="floating-element absolute left-6 top-3 h-12 w-12 rounded-full bg-moonGreen/18 blur-2xl" />
          <span className="floating-element-reverse absolute right-10 top-2 h-14 w-14 rounded-full bg-moonGold/22 blur-2xl" />
          <span className="absolute right-28 top-6 h-2 w-2 rounded-full bg-moonGreen/70 animate-pulse" />
          <span className="absolute right-36 top-7 h-px w-16 bg-gradient-to-r from-transparent via-moonGold/60 to-transparent opacity-70" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
          <div
            className={clsx(
              "relative rounded-b-[28px] rounded-t-none border border-moonBorder/60 bg-moonCard/70 backdrop-blur-xl transition-all after:absolute after:inset-x-6 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-moonGreen/40 after:to-transparent",
              scrolled ? "py-2 shadow-lg shadow-black/40" : "py-3"
            )}
          >
            <div className="flex items-center justify-between px-4 md:px-6">
              <Link href="/#home" className="flex min-w-0 items-center gap-2 font-display text-base font-semibold uppercase tracking-[0.16em] text-moonInk/80">
                <Image
                  src="/logo1.png"
                  alt="MIZYRA Institute of Technology logo"
                  width={80}
                  height={60}
                  className="h-14 w-20 object-contain"
                  priority
                />
                <span className="min-w-0 leading-tight sm:whitespace-nowrap">MIZYRA Institute of Technology</span>
              </Link>

              <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-[10px] font-semibold uppercase tracking-[0.18em] text-moonInk/70 transition hover:text-moonGreen after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-moonGreen/70 after:transition-all hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/apply"
                  className="neo-btn-primary btn-glow gold-shimmer rounded-full px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:shadow-glow"
                >
                  Request Information
                </Link>
              </nav>

              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={() => setOpen((value) => !value)}
                  aria-label="Toggle menu"
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  className="rounded-full border border-moonBorder/70 p-2 text-moonInk"
                >
                  {open ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>

          <div
            id="mobile-menu"
            className={clsx(
              "md:hidden overflow-hidden transition-all duration-300",
              open ? "max-h-96 mt-3 opacity-100" : "pointer-events-none max-h-0 opacity-0"
            )}
          >
            <nav className="rounded-2xl border border-moonBorder/60 bg-moonCard/90 px-4 py-4 shadow-lg" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-moonInk/80"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/#contact"
                  className="neo-btn-primary gold-shimmer rounded-full px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em]"
                  onClick={() => setOpen(false)}
                >
                  Get Quote
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
