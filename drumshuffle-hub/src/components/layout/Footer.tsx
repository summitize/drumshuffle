import Link from "next/link";
import { Drum, Github, Youtube, Music } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

const SOCIAL_LINKS = [
  { label: "GitHub",  href: "https://github.com/drumshuffle", icon: Github },
  { label: "YouTube", href: "https://youtube.com/@drumshuffle", icon: Youtube },
  { label: "BandLab", href: "https://bandlab.com/drumshuffle",  icon: Music },
];

const FOOTER_SECTIONS = [
  {
    title: "Platform",
    links: [
      { label: "Drum Simulator", href: "/simulator" },
      { label: "Sample Store",   href: "/store" },
      { label: "Lessons",        href: "/lessons" },
      { label: "Metronome",      href: "/metronome" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord",    href: "/community" },
      { label: "Blog",       href: "/blog" },
      { label: "Challenges", href: "/challenges" },
      { label: "Showcase",   href: "/showcase" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",   href: "/about" },
      { label: "Careers",  href: "/careers" },
      { label: "Privacy",  href: "/privacy" },
      { label: "Terms",    href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-night-950">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center">
                <Drum className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-lg">
                  Drum<span className="gradient-text">Shuffle</span>
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-night-500">Hub</span>
              </div>
            </Link>
            <p className="text-night-400 text-sm leading-relaxed max-w-xs mb-6">
              The ultimate online drumming platform. Practice, learn, and connect with drummers worldwide.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-night-400 hover:text-brand-400 hover:border-brand-500/30 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-display font-semibold text-sm text-white mb-4">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-night-400 hover:text-brand-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-night-500">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-night-600">
            Built with <span className="text-brand-500">&hearts;</span> for drummers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
