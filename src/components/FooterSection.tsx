import { useRef, useEffect, type CSSProperties } from 'react';
import { gsap } from '@/lib/gsap';

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cta = sectionRef.current?.querySelector('.footer-cta');
      const title = cta?.querySelector('.footer-cta-title');
      const line = cta?.querySelector('.footer-cta-line');
      const desc = cta?.querySelector('.footer-cta-desc');
      const btns = cta?.querySelector('.footer-cta-btns');
      const contacts = cta?.querySelectorAll('.footer-contact');

      if (cta) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cta,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(cta,
          { opacity: 0, y: 40, scale: 0.93 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
        );

        if (title) {
          tl.fromTo(title,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.4'
          );
        }

        if (line) {
          tl.fromTo(line,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.4, ease: 'power2.out' },
            '-=0.2'
          );
        }

        if (desc) {
          tl.fromTo(desc,
            { opacity: 0 },
            {
              opacity: 1, duration: 0.5,
              scrambleText: {
                text: (desc as HTMLElement).textContent || '',
                chars: 'абвгде░▓█',
                speed: 0.9,
                revealDelay: 0.1,
              },
            },
            '-=0.2'
          );
        }

        if (btns) {
          tl.fromTo(btns.children,
            { opacity: 0, y: 15, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)' },
            '-=0.2'
          );
        }

        if (contacts?.length) {
          tl.fromTo(contacts,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out' },
            '-=0.2'
          );
        }

        // Breathing border glow
        gsap.to(cta, {
          boxShadow: '0 0 40px #ffd3ff06, inset 0 0 30px #ffd3ff03',
          repeat: -1,
          yoyo: true,
          duration: 3,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: cta,
            start: 'top 85%',
            toggleActions: 'play pause resume pause',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={sectionRef} id="contact" className="section" style={{ position: 'relative', paddingBottom: '40px' }}>
      <div className="section-inner">
        <div className="footer-cta" style={styles.cta}>
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 'clamp(20px, 4vw, 32px)' }}>
            <div>
              <h2 className="footer-cta-title" style={{
                fontFamily: 'var(--font-head)', fontWeight: 700,
                fontSize: 'clamp(2rem, 5vw, 3.2rem)', letterSpacing: '0.04em',
                color: 'var(--accent)', lineHeight: 1.1, marginBottom: '12px',
              }}>
                Нужен сайт?
              </h2>
              <div className="footer-cta-line" style={{ width: '70px', height: '2px', background: 'var(--gradient)', borderRadius: '1px', marginBottom: '12px' }} />
              <p className="footer-cta-desc t-caption" style={{ color: 'var(--fg)', letterSpacing: '0.15em' }}>
                Обсудим вашу идею и предложим решение
              </p>
            </div>

            <div className="footer-cta-btns" style={styles.ctaButtons}>
              <a href="https://t.me/k_k0stya" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Написать в Telegram
              </a>
              <a href="mailto:k.konstantin2212@gmail.com" className="btn-outline">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Email
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="tel:+79778609072" className="footer-contact" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--fg)', transition: 'color 0.3s' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="t-mono" style={{ fontSize: '0.8rem' }}>+7 (977) 860-90-72</span>
              </a>
              <a href="mailto:k.konstantin2212@gmail.com" className="footer-contact" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--fg)', transition: 'color 0.3s' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="t-mono" style={{ fontSize: '0.8rem' }}>k.konstantin2212@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div style={styles.bottom}>
          <div style={styles.bottomLeft}>
            <span className="t-h3" style={{ fontSize: '1rem' }}>
              K <span style={{ fontSize: '0.7em', opacity: 0.6 }}>&</span> K
            </span>
            <span className="t-caption" style={{ fontSize: '0.65rem' }}>
              © {new Date().getFullYear()} — Web решения для бизнеса
            </span>
          </div>
          <div style={styles.bottomRight}>
            <a href="tel:+79778609072" style={styles.footerLink} className="t-mono">
              +7 (977) 860-90-72
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, CSSProperties> = {
  cta: {
    position: 'relative',
    width: 'min(520px, 90vw)',
    margin: '0 auto 60px',
    padding: 'clamp(28px, 5vw, 48px)',
    background: '#0c0c10',
    border: '1px solid var(--border-h)',
    borderRadius: 'var(--radius)',
    overflow: 'hidden',
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    paddingTop: '20px',
    borderTop: '1px solid var(--border)',
  },
  bottomLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  bottomRight: {
    display: 'flex',
    gap: '24px',
  },
  footerLink: {
    color: 'var(--fg-muted)',
    fontSize: '0.8rem',
    transition: 'color 0.3s',
  },
};
