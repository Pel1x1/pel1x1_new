import { useRef, useEffect, type CSSProperties } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const target = parseInt(el.dataset.count || '0', 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + (el.dataset.suffix || '');
          },
        });
      });

      const cards = gsap.utils.toArray<HTMLElement>('.about-value-card');
      cards.forEach((card, i) => {
        const icon = card.querySelector('.about-card-icon');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(card,
          { opacity: 0, x: 60, rotateY: -12, scale: 0.92 },
          {
            opacity: 1, x: 0, rotateY: 0, scale: 1,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power3.out',
          }
        );

        if (icon) {
          tl.fromTo(icon,
            { scale: 0, rotation: -180 },
            { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' },
            '-=0.35'
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section" style={{ position: 'relative' }}>
      <div className="orb orb-purple" style={{
        width: 350, height: 350, top: '10%', right: '-5%', opacity: 0.1,
      }} />

      <div className="section-inner">
        <div className="section-header reveal">
          <span className="t-caption" style={{ color: 'var(--accent)', marginBottom: 12, display: 'block' }}>01</span>
          <h2 className="t-h1" style={{ marginBottom: 8 }}>
            О <span className="accent-text">команде</span>
          </h2>
          <div className="accent-line" />
        </div>

        <div style={styles.grid} className="about-grid">
          <div className="reveal" style={styles.desc}>
            <p className="t-body" style={{ color: 'var(--fg-muted)', marginBottom: 20 }}>
              Мы — небольшая команда разработчиков и дизайнеров, которая создаёт современные
              веб-решения для бизнеса. От идеи до запуска — мы берём на себя весь процесс.
            </p>
            <p className="t-body" style={{ color: 'var(--fg-muted)', marginBottom: 32 }}>
              Каждый проект — это уникальный продукт, созданный под задачи клиента.
              Мы не используем шаблоны — только кастомная разработка с вниманием к деталям.
            </p>
            <div style={styles.stats}>
              {[
                { target: 10, suffix: '+', label: 'Проектов' },
                { target: 2, suffix: '+', label: 'Года опыта' },
                { target: 100, suffix: '%', label: 'Кастом' },
              ].map((s, i) => (
                <div key={i} className="reveal" style={{ ...styles.stat, '--i': i } as CSSProperties}>
                  <span className="t-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', lineHeight: 1 }}>
                    <span className="accent-text" data-count={s.target} data-suffix={s.suffix}>0{s.suffix}</span>
                  </span>
                  <span className="t-caption">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.cardsCol}>
            {[
              { icon: '⟐', title: 'Качество', text: 'Чистый код, продуманная архитектура и внимание к каждому пикселю.' },
              { icon: '◈', title: 'Скорость', text: 'Быстрый запуск без потери качества. Оптимизация под высокий перформанс.' },
              { icon: '⬡', title: 'Поддержка', text: 'Не бросаем после запуска. Сопровождаем и развиваем ваш продукт.' },
            ].map((card, i) => (
              <div key={i} className="glass-card about-value-card card-hover-glow" style={{ ...styles.card, '--i': i } as CSSProperties}>
                <span className="about-card-icon" style={styles.cardIcon}>{card.icon}</span>
                <div>
                  <h3 className="t-h3" style={{ marginBottom: 6 }}>{card.title}</h3>
                  <p className="t-body" style={{ color: 'var(--fg-muted)', fontSize: '0.9rem' }}>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'clamp(2rem, 5vw, 4rem)',
    alignItems: 'start',
  },
  desc: { paddingRight: '2rem' },
  stats: {
    display: 'flex',
    gap: 'clamp(1.5rem, 3vw, 3rem)',
    flexWrap: 'wrap',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  cardsCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  card: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: 'clamp(16px, 3vw, 24px)',
    perspective: '600px',
    position: 'relative',
    overflow: 'hidden',
  },
  cardIcon: {
    fontSize: '1.4rem',
    color: 'var(--accent)',
    flexShrink: 0,
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ffd3ff10',
    borderRadius: '10px',
  },
};
