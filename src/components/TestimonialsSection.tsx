import { useRef, useEffect, type CSSProperties } from 'react';
import TiltCard from './TiltCard';
import { gsap } from '@/lib/gsap';

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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rotations = [-3, 0, 3];

      gsap.utils.toArray<HTMLElement>('.testimonial-card').forEach((card, i) => {
        const quote = card.querySelector('.testimonial-quote');
        const author = card.querySelector('.testimonial-author');
        const avatar = card.querySelector('.testimonial-avatar');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(card,
          { opacity: 0, y: 50, rotation: rotations[i] || 0, scale: 0.9 },
          {
            opacity: 1, y: 0, rotation: 0, scale: 1,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
          }
        );

        if (quote) {
          tl.fromTo(quote,
            { scale: 0.3, opacity: 0 },
            { scale: 1, opacity: 0.6, duration: 0.5, ease: 'elastic.out(1, 0.5)' },
            '-=0.5'
          );
        }

        if (author) {
          tl.fromTo(author,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
            '-=0.2'
          );
        }

        if (avatar) {
          tl.fromTo(avatar,
            { scale: 0, rotation: -90 },
            { scale: 1, rotation: 0, duration: 0.4, ease: 'back.out(2)' },
            '-=0.3'
          );
        }

        // Hover
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            boxShadow: '0 16px 50px #00000050, 0 0 25px #ffd3ff08',
            borderColor: '#ffd3ff20',
            duration: 0.3, ease: 'power2.out',
          });
          if (quote) gsap.to(quote, { scale: 1.15, opacity: 0.8, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            boxShadow: 'none',
            borderColor: 'rgba(255,255,255,0.07)',
            duration: 0.3, ease: 'power2.out',
          });
          if (quote) gsap.to(quote, { scale: 1, opacity: 0.6, duration: 0.3, ease: 'power2.out' });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="section" style={{ position: 'relative' }}>
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

        <div style={styles.grid}>
          {testimonials.map((t, i) => (
            <TiltCard key={i} index={i}>
              <div className="glass-card testimonial-card card-hover-glow" style={styles.card}>
                <div className="testimonial-quote" style={styles.quote}>"</div>
                <p className="t-body" style={{ color: 'var(--fg-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '24px', flex: 1 }}>
                  {t.text}
                </p>
                <div className="testimonial-author" style={styles.author}>
                  <div className="testimonial-avatar" style={styles.avatar}>
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
    overflow: 'hidden',
    transition: 'border-color 0.3s, box-shadow 0.3s',
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
    transformOrigin: 'left top',
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
