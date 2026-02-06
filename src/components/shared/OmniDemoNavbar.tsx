import { useEffect, useState } from 'react';

type NavLink = { label: string; href: string };

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function OmniDemoNavbar({ onEnterStudio }: { onEnterStudio: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fade out the orange "Demonstration Environment" banner once the hero is passed
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // When hero is on screen -> show banner. When hero is off screen -> hide.
        setShowBanner(entry.isIntersecting);
      },
      {
        // Treat "hero is present" as "top portion of hero is visible"
        threshold: 0.05,
      }
    );

    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const links: NavLink[] = [
    { label: 'Features', href: '#features' },
    { label: 'Standards', href: '#standards' },
    { label: 'Why PQC', href: '#why' },
    { label: 'Waitlist', href: '#waitlist' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      {/* Controlled Access Banner */}
      <div
        className={[
          'bg-amber-900/90 border-b border-amber-700/50 px-4',
          'overflow-hidden transition-all duration-300 ease-out',
          showBanner
            ? 'max-h-16 py-2.5 opacity-100'
            : 'max-h-0 py-0 opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 text-center">
          <svg
            className="w-4 h-4 text-amber-300 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <p className="text-amber-100 text-xs sm:text-sm font-medium">
            <strong>Demonstration Environment</strong>
            <span className="hidden sm:inline"> — Production deployments available via vetted pilot access</span>
          </p>
        </div>
      </div>

      {/* Header */}
      <header
        className={[
          'border-b border-gray-800/30 bg-navy-900/50 backdrop-blur-xl transition-shadow duration-200',
          isScrolled || !showBanner ? 'shadow-lg shadow-black/20' : '',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <a
              href="https://omnituum.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              onClick={() => setMobileOpen(false)}
            >
              <img src="/omnituum-text-only-transparent.png" alt="Omnituum" className="h-3 md:h-5 w-auto" />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="text-gray-400 hover:text-white transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={onEnterStudio}
                className="hidden md:inline-flex px-4 py-2 bg-pqc-600 hover:bg-pqc-500 rounded-lg text-sm font-medium transition-colors"
              >
                Try Demo
              </button>

              {/* Mobile toggle */}
              <button
                className="md:hidden p-2 text-white"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-gray-800/40">
              <div className="flex flex-col gap-2">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onEnterStudio();
                  }}
                  className="mt-2 px-4 py-3 bg-pqc-600 hover:bg-pqc-500 rounded-lg text-sm font-semibold transition-colors"
                >
                  Try Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
