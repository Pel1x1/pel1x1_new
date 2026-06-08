import { useRef, useState, useEffect, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '@/lib/gsap';

const brandChars = ['K', ' ', '&', ' ', 'K'];

export default function HeroSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      if (cardRef.current) {
        gsap.set(cardRef.current, { opacity: 0, scale: 0.92, y: 30 });
        tl.to(cardRef.current, {
          opacity: 1, scale: 1, y: 0,
          duration: 1, ease: 'power3.out',
        });
      }

      const chars = sectionRef.current?.querySelectorAll('.hero-char');
      if (chars?.length) {
        gsap.set(chars, { opacity: 0, y: 40, rotateX: -90, display: 'inline-block' });
        tl.to(chars, {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.6, stagger: 0.07,
          ease: 'back.out(2)',
        }, '-=0.5');
      }

      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
        tl.to(lineRef.current, {
          scaleX: 1, duration: 0.5, ease: 'power2.out',
        }, '-=0.2');
      }

      if (taglineRef.current) {
        const originalText = taglineRef.current.textContent || '';
        gsap.set(taglineRef.current, { opacity: 1 });
        tl.fromTo(taglineRef.current,
          { opacity: 0 },
          {
            opacity: 1, duration: 0.7,
            scrambleText: {
              text: originalText,
              chars: 'абвгдежз░▒▓█',
              speed: 0.9,
              revealDelay: 0.1,
            },
          }, '-=0.15'
        );
      }

      if (navRef.current) {
        const links = navRef.current.children;
        gsap.set(links, { opacity: 0, y: 20 });
        tl.to(links, {
          opacity: 1, y: 0,
          duration: 0.4, stagger: 0.07,
          ease: 'power2.out',
        }, '-=0.4');
      }

      if (contactRef.current) {
        const items = contactRef.current.children;
        gsap.set(items, { opacity: 0, x: -15 });
        tl.to(items, {
          opacity: 1, x: 0,
          duration: 0.4, stagger: 0.08,
          ease: 'power2.out',
        }, '-=0.2');
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (e.clientX - cx) / (rect.width / 2);
    const y = (e.clientY - cy) / (rect.height / 2);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  const parallaxOffset = scrollY * 0.3;
  const cardRotateX = mousePos.y * -3;
  const cardRotateY = mousePos.x * 3;

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={styles.section}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="orb orb-pink" style={{
        width: 500, height: 500, top: -100, left: -150,
        transform: `translateY(${parallaxOffset * 0.3}px)`,
      }} />
      <div className="orb orb-purple" style={{
        width: 400, height: 400, bottom: -100, right: -100,
        transform: `translateY(${-parallaxOffset * 0.2}px)`,
      }} />

      <div style={styles.gridBg} />

      <div style={styles.content}>
        <div
          ref={cardRef}
          className="tilt-card"
          style={{
            ...styles.cardWrapper,
            transform: `perspective(1200px) rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg) translateY(${-parallaxOffset * 0.15}px)`,
          }}
        >
          <div style={styles.card}>
            <div style={{
              ...styles.cardGlow,
              background: `radial-gradient(circle at ${50 + mousePos.x * 15}% ${50 + mousePos.y * 15}%, #ffd3ff10 0%, transparent 60%)`,
            }} />

            <div style={styles.cardInner}>
              <div>
                <h1 style={styles.brandName}>
                  {brandChars.map((ch, i) => (
                    <span
                      key={i}
                      className="hero-char"
                      style={ch === '&' ? styles.ampersand : undefined}
                    >
                      {ch}
                    </span>
                  ))}
                </h1>
                <div ref={lineRef} style={styles.brandLine} />
                <p ref={taglineRef} className="t-caption" style={styles.tagline}>
                  Web решения для бизнеса
                </p>
              </div>

              <nav ref={navRef} style={styles.cardNav}>
                {[
                  { label: 'Проекты', href: '/projects', isRoute: true },
                  { label: 'Технологии', href: '#tech' },
                  { label: 'Цены', href: '#pricing' },
                ].map((item, i) =>
                  item.isRoute ? (
                    <Link key={i} to={item.href} style={styles.cardLink} className="card-nav-link">
                      <span className="t-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <a
                      key={i}
                      href={item.href}
                      style={styles.cardLink}
                      className="card-nav-link"
                      onClick={(e) => {
                        e.preventDefault();
                        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      <span className="t-mono" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {item.label}
                      </span>
                    </a>
                  )
                )}
              </nav>

              <div ref={contactRef} style={styles.contactRow}>
                <a href="https://t.me/k_k0stya" target="_blank" rel="noopener noreferrer" style={styles.contactItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span className="t-mono" style={{ fontSize: '0.8rem' }}>@k_k0stya</span>
                </a>
                <a href="mailto:k.konstantin2212@gmail.com" style={styles.contactItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="t-mono" style={{ fontSize: '0.8rem' }}>k.konstantin2212@gmail.com</span>
                </a>
                <a href="tel:+79778609072" style={styles.contactItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="t-mono" style={{ fontSize: '0.8rem' }}>+7 (977) 860-90-72</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  section: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: 'var(--gap)',
  },
  gridBg: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(#ffffff06 1px, transparent 1px),
      linear-gradient(90deg, #ffffff06 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
    maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 70%)',
    WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 70%)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
    zIndex: 2,
  },
  cardWrapper: {
    transformStyle: 'preserve-3d',
    transition: 'transform 0.12s ease-out',
  },
  card: {
    position: 'relative',
    width: 'min(520px, 90vw)',
    padding: 'clamp(28px, 5vw, 48px)',
    background: '#0c0c10',
    border: '1px solid var(--border-h)',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    borderRadius: 'inherit',
  },
  cardInner: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(20px, 4vw, 32px)',
  },
  brandName: {
    fontFamily: 'var(--font-head)',
    fontWeight: 700,
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    letterSpacing: '0.04em',
    color: 'var(--accent)',
    lineHeight: 1.1,
    perspective: '500px',
  },
  ampersand: {
    fontSize: '0.6em',
    opacity: 0.7,
    fontWeight: 400,
  },
  brandLine: {
    width: '70px',
    height: '2px',
    background: 'var(--gradient)',
    margin: '12px 0',
    borderRadius: '1px',
  },
  tagline: {
    color: 'var(--fg)',
    letterSpacing: '0.15em',
  },
  cardNav: {
    display: 'flex',
    gap: 'clamp(16px, 4vw, 32px)',
    flexWrap: 'wrap',
  },
  cardLink: {
    color: 'var(--fg-muted)',
    transition: 'color 0.3s',
    position: 'relative',
    paddingBottom: '2px',
  },
  contactRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: 'var(--fg)',
    transition: 'color 0.3s',
  },
};
