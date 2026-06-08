import { useRef, useEffect, type CSSProperties } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const steps = [
  { num: '01', title: 'Брифинг', text: 'Обсуждаем задачи, целевую аудиторию, бюджет и сроки. Формируем ТЗ.' },
  { num: '02', title: 'Дизайн', text: 'Создаём прототипы и UI-дизайн. Согласовываем каждый экран с вами.' },
  { num: '03', title: 'Разработка', text: 'Пишем чистый код. Адаптивная вёрстка, SEO, интеграции, CMS и CRM.' },
  { num: '04', title: 'Запуск', text: 'Тестирование, деплой и передача проекта. Поддержка после запуска в любое время.' },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 70%',
              scrub: 1,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>('.process-card').forEach((card, i) => {
        const dot = card.querySelector('.process-dot');
        const num = card.querySelector('.process-num');
        const title = card.querySelector('.process-title');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(card,
          { opacity: 0, y: 60, scale: 0.85 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
          }
        );

        if (dot) {
          tl.fromTo(dot,
            { scale: 0 },
            { scale: 1, duration: 0.4, ease: 'back.out(3)' },
            '-=0.4'
          );
        }

        if (num) {
          tl.fromTo(num,
            { opacity: 0, scale: 0.3, y: 20 },
            { opacity: 0.25, scale: 1, y: 0, duration: 0.6, ease: 'back.out(2)' },
            '-=0.3'
          );
        }

        if (title) {
          tl.fromTo(title,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            '-=0.3'
          );
        }

        // Hover: border glow pulse
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            borderColor: '#ffd3ff30',
            boxShadow: '0 10px 40px #00000040, 0 0 20px #ffd3ff08',
            y: -4, duration: 0.3, ease: 'power2.out',
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            borderColor: 'rgba(255,255,255,0.07)',
            boxShadow: 'none',
            y: 0, duration: 0.3, ease: 'power2.out',
          });
        });
      });

      gsap.utils.toArray<HTMLElement>('.process-dot').forEach((dot, i) => {
        gsap.to(dot, {
          boxShadow: '0 0 0 8px #ffd3ff00',
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          delay: i * 0.3,
          ease: 'sine.inOut',
          scrollTrigger: {
            trigger: dot,
            start: 'top 85%',
            toggleActions: 'play pause resume pause',
          },
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="section" style={{ position: 'relative' }}>
      <div className="orb orb-pink" style={{
        width: 300, height: 300, top: '20%', right: '-8%', opacity: 0.08,
      }} />

      <div className="section-inner">
        <div className="section-header reveal" style={{ textAlign: 'center' }}>
          <span className="t-caption" style={{ color: 'var(--accent)', marginBottom: 12, display: 'block' }}>03</span>
          <h2 className="t-h1" style={{ marginBottom: 8 }}>
            Процесс <span className="accent-text">работы</span>
          </h2>
          <div className="accent-line" style={{ margin: '0 auto' }} />
        </div>

        <div style={styles.track}>
          <div ref={lineRef} style={styles.connectLine} />
          {steps.map((step, i) => (
            <div key={i} className="process-card" style={styles.card}>
              <div className="process-dot" style={styles.dot}>
                <div style={styles.dotCore} />
              </div>

              <div className="process-num" style={styles.bigNum}>{step.num}</div>

              <h3 className="process-title t-h2" style={{ marginBottom: 6, fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}>{step.title}</h3>
              <p className="t-body" style={{ color: 'var(--fg-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  track: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    alignItems: 'start',
  },
  connectLine: {
    position: 'absolute',
    top: '24px',
    left: '10%',
    right: '10%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent), transparent)',
    opacity: 0.2,
    zIndex: 0,
  },
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '32px 20px 24px',
    background: '#0c0c10',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    zIndex: 1,
    cursor: 'default',
    overflow: 'hidden',
    transition: 'border-color 0.3s',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '2px solid var(--accent)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '-5px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--bg)',
    zIndex: 2,
    boxShadow: '0 0 0 0 #ffd3ff30',
  },
  dotCore: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'var(--accent)',
  },
  bigNum: {
    fontFamily: 'var(--font-head)',
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    fontWeight: 700,
    lineHeight: 1,
    background: 'var(--gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    opacity: 0.25,
    margin: '12px 0 8px',
  },
};
