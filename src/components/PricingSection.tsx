import TiltCard from './TiltCard';
import type { CSSProperties } from 'react';

const plans = [
  {
    title: 'Минимум',
    price: 'от 25.000₽',
    duration: '1 неделя',
    desc: 'Идеально для стартапов и малого бизнеса',
    features: ['Уникальный дизайн', '1 страница', 'Адаптивная вёрстка', 'SEO базовая настройка', 'Форма обратной связи'],
    accent: false,
  },
  {
    title: 'Стандарт',
    price: 'от 60.000₽',
    duration: 'от 3х недель',
    desc: 'Полноценный сайт для бизнеса',
    features: ['Уникальный дизайн', 'До 5 страниц', 'Адаптивная вёрстка', 'CMS для управления', 'SEO оптимизация', 'Аналитика', 'Форма обратной связи'],
    accent: true,
  },
  {
    title: 'Премиум',
    price: 'от 120.000₽',
    duration: 'от 3 до 8 недель',
    desc: 'Комплексное решение с расширенным функционалом',
    features: ['Уникальный дизайн', 'Неограниченно страниц', 'Адаптивная вёрстка', 'CMS + интеграции', 'E-commerce функции', 'SEO продвижение', 'Аналитика + отчёты', 'Техподдержка 3 месяца'],
    accent: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section" style={{ position: 'relative' }}>
      <div className="orb orb-purple" style={{
        width: 500, height: 500, bottom: '-10%', left: '20%', opacity: 0.06,
      }} />

      <div className="section-inner">
        <div className="section-header reveal" style={{ textAlign: 'center' }}>
          <span className="t-caption" style={{ color: 'var(--accent)', marginBottom: 12, display: 'block' }}>04</span>
          <h2 className="t-h1" style={{ marginBottom: 8 }}>
            <span className="accent-text">Цены</span>
          </h2>
          <div className="accent-line" style={{ margin: '0 auto' }} />
        </div>

        <div style={styles.grid}>
          {plans.map((plan, i) => (
            <TiltCard key={i} index={i}>
              <div className="glass-card" style={{
                ...styles.card,
                borderColor: plan.accent ? '#ffd3ff30' : undefined,
              }}>
                {plan.accent && (
                  <div style={styles.popular}>
                    <span className="t-caption" style={{ fontSize: '0.65rem', color: '#050507' }}>Популярный</span>
                  </div>
                )}

                <div style={{ marginBottom: '24px' }}>
                  <h3 className="t-h2 accent-text" style={{ marginBottom: '8px' }}>{plan.title}</h3>
                  <div className="t-h1" style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', marginBottom: '4px' }}>
                    {plan.price}
                  </div>
                  <span className="t-caption">{plan.duration}</span>
                </div>

                <p className="t-body" style={{ color: 'var(--fg-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
                  {plan.desc}
                </p>

                <div style={styles.features}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={styles.feature}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="t-body" style={{ fontSize: '0.85rem' }}>{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://t.me/k_k0stya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={plan.accent ? 'btn-primary' : 'btn-outline'}
                  style={{ marginTop: 'auto', justifyContent: 'center', width: '100%' }}
                >
                  Заказать
                </a>
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    alignItems: 'stretch',
  },
  card: {
    padding: 'clamp(24px, 3vw, 36px)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  popular: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'var(--gradient)',
    padding: '4px 12px',
    borderRadius: '100px',
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '28px',
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
};
