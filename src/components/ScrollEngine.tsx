import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function ScrollEngine() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Reveal elements ──
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Reveal-left elements ──
      gsap.utils.toArray<HTMLElement>('.reveal-left').forEach((el) => {
        gsap.fromTo(el,
          { x: -50, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Stagger children ──
      gsap.utils.toArray<HTMLElement>('.stagger').forEach((parent) => {
        const children = parent.children;
        gsap.fromTo(children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: parent,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Fast ScrambleText on section headings ──
      gsap.utils.toArray<HTMLElement>('.section-header h2, .page-header h1').forEach((heading) => {
        const accentSpan = heading.querySelector('.accent-text');
        if (accentSpan) {
          const originalText = accentSpan.textContent || '';
          gsap.fromTo(accentSpan,
            { opacity: 0.3 },
            {
              opacity: 1,
              duration: 0.6,
              ease: 'none',
              scrollTrigger: {
                trigger: heading,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              scrambleText: {
                text: originalText,
                chars: 'абвгдеж░▓█◆●',
                speed: 0.9,
                revealDelay: 0.1,
              },
            }
          );
        }
      });

      // ── Accent line grow ──
      gsap.utils.toArray<HTMLElement>('.accent-line').forEach((line) => {
        gsap.fromTo(line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Section separators draw on scroll ──
      gsap.utils.toArray<HTMLElement>('.section-sep').forEach((sep) => {
        gsap.fromTo(sep,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sep,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Parallax orbs (scrub-based) ──
      gsap.utils.toArray<HTMLElement>('.orb').forEach((orb) => {
        const speed = orb.classList.contains('orb-pink') ? 80 : -50;
        gsap.to(orb, {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: orb.closest('.section') || orb.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });

      // ── Magnetic effect on CTA buttons ──
      gsap.utils.toArray<HTMLElement>('.btn-primary, .btn-outline').forEach((btn) => {
        let bounds: DOMRect;

        const onEnter = () => { bounds = btn.getBoundingClientRect(); };
        const onLeave = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        };
        const onMove = (e: MouseEvent) => {
          if (!bounds) return;
          const x = e.clientX - bounds.left - bounds.width / 2;
          const y = e.clientY - bounds.top - bounds.height / 2;
          gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.2, ease: 'power2.out' });
        };

        btn.addEventListener('mouseenter', onEnter);
        btn.addEventListener('mouseleave', onLeave);
        btn.addEventListener('mousemove', onMove as EventListener);
      });

      // ── Card hover glow-follow effect ──
      gsap.utils.toArray<HTMLElement>('.card-hover-glow').forEach((card) => {
        const glow = document.createElement('div');
        glow.className = 'card-glow-orb';
        card.appendChild(glow);

        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          gsap.to(glow, { left: x, top: y, duration: 0.3, ease: 'power2.out' });
        };
        const onEnter = () => { gsap.to(glow, { opacity: 1, scale: 1, duration: 0.3 }); };
        const onLeave = () => { gsap.to(glow, { opacity: 0, scale: 0.5, duration: 0.3 }); };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
      });

    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return null;
}
