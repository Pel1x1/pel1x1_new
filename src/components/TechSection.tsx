import { useState, useRef, useCallback, type CSSProperties } from 'react';
import { gsap } from '@/lib/gsap';

const categories = [
  {
    title: 'Frontend',
    techs: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js'],
    icon: '</>',
    desc: 'Современные адаптивные интерфейсы с плавной анимацией',
  },
  {
    title: 'Backend',
    techs: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST API'],
    icon: '{ }',
    desc: 'Масштабируемая серверная архитектура',
  },
  {
    title: 'Design',
    techs: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Blender'],
    icon: '◆',
    desc: 'UI/UX от концепции до реализации',
  },
  {
    title: 'DevOps',
    techs: ['Docker', 'AWS', 'Git', 'SEO', 'Analytics'],
    icon: '⚡',
    desc: 'Развертывание и оптимизация',
  },
];

export default function TechSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = categories[activeIdx];

  const switchTab = useCallback((idx: number) => {
    if (idx === activeIdx || !panelRef.current) {
      setActiveIdx(idx);
      return;
    }

    const panel = panelRef.current;
    const dir = idx > activeIdx ? 1 : -1;

    gsap.to(panel, {
      opacity: 0,
      x: -20 * dir,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIdx(idx);
        gsap.fromTo(panel,
          { opacity: 0, x: 20 * dir },
          { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
        );

        // Stagger tech items
        requestAnimationFrame(() => {
          const items = panel.querySelectorAll('.tech-item');
          gsap.fromTo(items,
            { opacity: 0, x: 25 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
          );
        });
      },
    });
  }, [activeIdx]);

  return (
    <section id="tech" className="section" style={{ position: 'relative' }}>
      <style>{`
        .tech-tab {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          background: transparent;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s;
          color: var(--fg);
          font-family: var(--font-body);
        }
        .tech-tab:hover:not(.tech-tab--active) {
          border-color: #ffffff30;
          background: #ffffff04;
        }
        .tech-tab--active {
          background: #ffffff06;
          border-color: #ffd3ff40;
        }
        .tech-tab__icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff08;
          border-radius: 10px;
          font-size: 0.85rem;
          font-family: var(--font-mono);
          color: var(--fg-muted);
          transition: background 0.25s, color 0.25s;
          flex-shrink: 0;
        }
        .tech-tab--active .tech-tab__icon {
          background: #ffd3ff18;
          color: var(--accent);
        }
        .tech-tab__label {
          font-family: var(--font-head);
          font-weight: 400;
          font-size: clamp(0.85rem, 1.5vw, 1.1rem);
          color: var(--fg-muted);
          transition: color 0.25s;
        }
        .tech-tab:hover:not(.tech-tab--active) .tech-tab__label {
          color: var(--fg);
        }
        .tech-tab--active .tech-tab__label {
          font-weight: 600;
          color: var(--fg);
        }
      `}</style>

      <div className="orb orb-pink" style={{
        width: 400, height: 400, bottom: '5%', left: '-10%', opacity: 0.08,
      }} />

      <div className="section-inner">
        <div className="section-header reveal" style={{ textAlign: 'center' }}>
          <span className="t-caption" style={{ color: 'var(--accent)', marginBottom: 12, display: 'block' }}>02</span>
          <h2 className="t-h1" style={{ marginBottom: 8 }}>
            <span className="accent-text">Технологии</span>
          </h2>
          <div className="accent-line" style={{ margin: '0 auto' }} />
        </div>

        <div className="reveal" style={styles.selector}>
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => switchTab(i)}
              className={`tech-tab${i === activeIdx ? ' tech-tab--active' : ''}`}
            >
              <span className="tech-tab__icon">{cat.icon}</span>
              <span className="tech-tab__label">{cat.title}</span>
            </button>
          ))}
        </div>

        <div ref={panelRef} className="reveal" style={styles.panel}>
          <div style={styles.panelLeft}>
            <div style={styles.bigNum}>{String(activeIdx + 1).padStart(2, '0')}</div>
            <h3 className="t-h1" style={{ marginBottom: 8 }}>{active.title}</h3>
            <p className="t-body" style={{ color: 'var(--fg-muted)', maxWidth: 340 }}>{active.desc}</p>
          </div>
          <div style={styles.panelRight}>
            {active.techs.map((t, j) => (
              <div key={`${activeIdx}-${j}`} className="tech-item" style={styles.techItem}>
                <div style={styles.techDot} />
                <span className="t-mono" style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', color: 'var(--fg)' }}>
                  {t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  selector: {
    display: 'flex',
    gap: '12px',
    marginBottom: '40px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  panel: {
    display: 'flex',
    gap: 'clamp(2rem, 5vw, 4rem)',
    alignItems: 'center',
    padding: 'clamp(32px, 5vw, 48px)',
    background: '#0c0c10',
    border: '1px solid var(--border-h)',
    borderRadius: 'var(--radius)',
    minHeight: '240px',
    flexWrap: 'wrap',
  },
  panelLeft: { flex: '1 1 280px' },
  bigNum: {
    fontFamily: 'var(--font-head)',
    fontSize: 'clamp(3rem, 6vw, 5rem)',
    fontWeight: 700,
    lineHeight: 1,
    background: 'var(--gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    opacity: 0.3,
    marginBottom: '8px',
  },
  panelRight: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  techItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '10px 0',
    borderBottom: '1px solid #ffffff08',
  },
  techDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--accent)',
    flexShrink: 0,
  },
};
