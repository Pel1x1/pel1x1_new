import TiltCard from './TiltCard';
import type { CSSProperties } from 'react';

const testimonials = [
  {
    name: 'Загородный комплекс «Звёздный»',
    role: 'Гостиничный бизнес',
    text: 'Ребята сделали нам отличный сайт с бронированием. Всё работает быстро, гости легко находят нужную информацию. Рекомендуем!',
    initials: 'ЗК',
  },
  {
    name: '«НЮКТА» Постельное бельё',
    role: 'E-commerce',
    text: 'Стильный дизайн, который идеально передаёт настроение нашего бренда. Продажи через сайт выросли в 2 раза после запуска.',
    initials: 'НК',
  },
  {
    name: '«Даймонд» Клининг',
    role: 'Сфера услуг',
    text: 'Быстро, качественно и без лишней суеты. Сайт полностью соответствует нашим ожиданиям. Удобная форма заявки работает отлично.',
    initials: 'ДК',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section" style={{ position: 'relative' }}>
      <div className="orb orb-pink" style={{
        width: 350, height: 350, top: '15%', left: '-8%', opacity: 0.07,
      }} />

      <div className="section-inner">
        <div className="section-header reveal" style={{ textAlign: 'center' }}>
          <span className="t-caption" style={{ color: 'var(--accent)', marginBottom: 12, display: 'block' }}>05</span>
          <h2 className="t-h1" style={{ marginBottom: 8 }}>
            Что говорят <span className="accent-text">клиенты</span>
          </h2>
          <div className="accent-line" style={{ margin: '0 auto' }} />
        </div>

        <div style={styles.grid} className="stagger">
          {testimonials.map((t, i) => (
            <TiltCard key={i} index={i}>
              <div className="glass-card" style={styles.card}>
                <div style={styles.quote}>"</div>
                <p className="t-body" style={{ color: 'var(--fg-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '24px', flex: 1 }}>
                  {t.text}
                </p>
                <div style={styles.author}>
                  <div style={styles.avatar}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{t.initials}</span>
                  </div>
                  <div>
                    <div className="t-h3" style={{ fontSize: '0.9rem' }}>{t.name}</div>
                    <span className="t-caption" style={{ fontSize: '0.65rem' }}>{t.role}</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    padding: 'clamp(28px, 3vw, 36px)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  quote: {
    fontFamily: 'Georgia, serif',
    fontSize: '4rem',
    lineHeight: 1,
    background: 'var(--gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '-10px',
    opacity: 0.6,
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderTop: '1px solid var(--border)',
    paddingTop: '16px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#ffd3ff15',
    border: '1px solid #ffd3ff30',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--accent)',
    flexShrink: 0,
  },
};
