import { useRef, useState, useEffect, type CSSProperties } from 'react';

const steps = [
  { num: '01', title: 'Брифинг', text: 'Обсуждаем задачи, целевую аудиторию, бюджет и сроки. Формируем ТЗ.' },
  { num: '02', title: 'Дизайн', text: 'Создаём прототипы и UI-дизайн. Согласовываем каждый экран с вами.' },
  { num: '03', title: 'Разработка', text: 'Пишем чистый код. Адаптивная вёрстка, SEO, интеграции, CMS и CRM.' },
  { num: '04', title: 'Запуск', text: 'Тестирование, деплой и передача проекта. Поддержка после запуска в любое время. ' },
];

function ProcessCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        ...styles.card,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${index * 0.15}s`,
      }}
    >
      <div style={{
        ...styles.dot,
        animation: visible ? `procPulse 2s ${index * 0.2}s infinite` : 'none',
      }}>
        <div style={styles.dotCore} />
      </div>

      <div style={{
        ...styles.bigNum,
        animation: visible ? `procNumReveal 0.6s ${index * 0.15 + 0.2}s cubic-bezier(0.16,1,0.3,1) both` : 'none',
      }}>{step.num}</div>

      <h3 className="t-h2" style={{ marginBottom: 6, fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}>{step.title}</h3>
      <p className="t-body" style={{ color: 'var(--fg-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>{step.text}</p>
    </div>
  );
}

export default function ProcessSection() {
  return (
    <section id="process" className="section" style={{ position: 'relative' }}>
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
          <div style={styles.connectLine} />
          {steps.map((step, i) => (
            <ProcessCard key={i} step={step} index={i} />
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
    transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), border-color 0.3s',
    zIndex: 1,
    cursor: 'default',
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
    top: '-6px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--bg)',
    zIndex: 2,
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
