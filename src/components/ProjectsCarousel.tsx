import { useRef, useState, useEffect, useCallback, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { projects, type Project } from '@/data/projects';

function CarouselCard({ project, index, dragRef }: {
  project: Project;
  index: number;
  dragRef: React.MutableRefObject<{ moved: boolean }>;
}) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      data-carousel-card
      className="reveal"
      style={{ ...pcStyles.card, '--i': index } as CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={pcStyles.cardImgWrap}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #1a1a24, #0f0f18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', opacity: 0.4, textAlign: 'center', padding: 16 }}>
            {project.title}
          </span>
        </div>
        {!imgError && (
          <img
            src={project.images[0]}
            alt={project.title}
            style={{
              ...pcStyles.cardImg,
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
            onError={() => setImgError(true)}
            draggable="false"
          />
        )}
        <div style={pcStyles.cardImgOverlay} />
        <div style={pcStyles.badge}>
          <span className="t-caption" style={{ fontSize: '0.6rem', color: 'var(--fg)' }}>{project.category}</span>
        </div>
      </div>

      <div style={pcStyles.cardBody}>
        <h3 style={{
          ...pcStyles.cardTitle,
          color: hovered ? 'var(--accent)' : 'var(--fg)',
        }}>{project.title}</h3>
        <div style={pcStyles.cardTags}>
          {project.technologies.map((t) => (
            <span key={t} style={pcStyles.cardTag}>{t}</span>
          ))}
        </div>
      </div>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        style={{ position: 'absolute', inset: 0, zIndex: 3 }}
        aria-label={project.title}
      />
    </div>
  );
}

export default function ProjectsCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0, dragging: false, moved: false });

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    root.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('[data-carousel-card]') as HTMLElement | null;
    const cardW = card?.offsetWidth || 380;
    el.scrollBy({ left: dir * (cardW + 20), behavior: 'smooth' });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current = { startX: e.clientX, scrollLeft: el.scrollLeft, dragging: true, moved: false };
    setIsDragging(true);
    el.style.scrollSnapType = 'none';
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    if (Math.abs(dx) > 3) dragState.current.moved = true;
    trackRef.current!.scrollLeft = dragState.current.scrollLeft - dx;
  };
  const onPointerUp = () => {
    dragState.current.dragging = false;
    setIsDragging(false);
    const el = trackRef.current;
    if (el) el.style.scrollSnapType = 'x mandatory';
  };

  return (
    <section ref={sectionRef} id="projects" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="orb orb-purple" style={{
        width: 400, height: 400, top: '10%', left: '-8%', opacity: 0.08,
      }} />

      <div className="section-inner">
        <div className="reveal" style={pcStyles.header}>
          <div>
            <span className="t-caption" style={{ color: 'var(--accent)', marginBottom: 12, display: 'block' }}>06</span>
            <h2 className="t-h1" style={{ marginBottom: 8 }}>
              Наши <span className="accent-text">проекты</span>
            </h2>
            <div className="accent-line" />
          </div>
          <div style={pcStyles.navRow}>
            <button onClick={() => scroll(-1)} style={{ ...pcStyles.navBtn, opacity: canScrollLeft ? 1 : 0.25 }} disabled={!canScrollLeft} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button onClick={() => scroll(1)} style={{ ...pcStyles.navBtn, opacity: canScrollRight ? 1 : 0.25 }} disabled={!canScrollRight} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="carousel-track"
        style={{ ...pcStyles.track, cursor: isDragging ? 'grabbing' : 'grab' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div style={{ flexShrink: 0, width: 'max(calc((100vw - 1200px) / 2), var(--gap))' }} />

        {projects.map((project, i) => (
          <CarouselCard key={project.id} project={project} index={i} dragRef={dragState} />
        ))}

        <div data-carousel-card style={pcStyles.ctaCard} className="reveal">
          <div style={pcStyles.ctaInner}>
            <span style={pcStyles.ctaIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
            <span className="t-h2" style={{ marginBottom: 4 }}>Все проекты</span>
            <span className="t-caption" style={{ color: 'var(--fg-muted)' }}>Смотреть портфолио</span>
            <Link to="/projects" style={pcStyles.ctaLink} aria-label="Все проекты" />
          </div>
        </div>

        <div style={{ flexShrink: 0, width: 'max(calc((100vw - 1200px) / 2), var(--gap))' }} />
      </div>

      <div className="section-inner">
        <div className="reveal" style={{ textAlign: 'center', marginTop: 'clamp(32px, 5vw, 48px)' }}>
          <Link to="/projects" className="btn-outline">
            Смотреть все проекты
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </Link>
        </div>
      </div>

      <div style={{ ...pcStyles.fadeEdge, left: 0, background: 'linear-gradient(90deg, var(--bg), transparent)' }} />
      <div style={{ ...pcStyles.fadeEdge, right: 0, background: 'linear-gradient(270deg, var(--bg), transparent)' }} />
    </section>
  );
}

const pcStyles: Record<string, CSSProperties> = {
  header: {
    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    gap: '20px', marginBottom: 'clamp(24px, 4vw, 40px)', flexWrap: 'wrap',
  },
  navRow: { display: 'flex', gap: '8px' },
  navBtn: {
    width: 44, height: 44, borderRadius: '50%', background: '#ffffff06',
    border: '1px solid var(--border)', color: 'var(--fg)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'border-color 0.3s, background 0.3s, opacity 0.3s',
  },
  track: {
    display: 'flex', gap: '20px', overflowX: 'auto', overflowY: 'hidden',
    scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch',
    paddingBottom: '8px', position: 'relative', userSelect: 'none',
  },
  fadeEdge: {
    position: 'absolute', top: 0, bottom: 0,
    width: 'clamp(20px, 3vw, 60px)', pointerEvents: 'none', zIndex: 4,
  },
  card: {
    flexShrink: 0, width: 'clamp(300px, 28vw, 380px)', background: '#0c0c10',
    border: '1px solid var(--border)', borderRadius: 'var(--radius)',
    overflow: 'hidden', position: 'relative', scrollSnapAlign: 'start',
    transition: 'border-color 0.4s, box-shadow 0.4s, transform 0.4s',
  },
  cardImgWrap: {
    position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden', background: '#0a0a0e',
  },
  cardImg: {
    width: '100%', height: '100%', objectFit: 'cover',
    position: 'relative', zIndex: 1,
    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)', pointerEvents: 'none',
  },
  cardImgOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(180deg, transparent 50%, #050507aa 100%)',
    pointerEvents: 'none', zIndex: 2,
  },
  badge: {
    position: 'absolute', top: 12, left: 12, padding: '4px 10px',
    background: '#050507aa', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid #ffffff15', borderRadius: 100, zIndex: 2,
  },
  cardBody: { padding: '16px 20px 20px' },
  cardTitle: {
    fontFamily: 'var(--font-head)', fontWeight: 600,
    fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', lineHeight: 1.3,
    marginBottom: 10, transition: 'color 0.3s',
  },
  cardTags: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  cardTag: {
    padding: '3px 10px', background: '#ffffff08', border: '1px solid var(--border)',
    borderRadius: 100, fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
    color: 'var(--fg-muted)', letterSpacing: '0.04em',
  },
  ctaCard: {
    flexShrink: 0, width: 'clamp(220px, 18vw, 280px)', background: '#0c0c10',
    border: '1px dashed var(--border-h)', borderRadius: 'var(--radius)',
    overflow: 'hidden', position: 'relative', scrollSnapAlign: 'start',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: 280, transition: 'border-color 0.4s',
  },
  ctaInner: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: 8, textAlign: 'center', padding: 24,
  },
  ctaIcon: {
    width: 56, height: 56, borderRadius: '50%', background: '#ffd3ff0a',
    border: '1px solid #ffd3ff20', display: 'flex', alignItems: 'center',
    justifyContent: 'center', marginBottom: 8,
    transition: 'background 0.3s, border-color 0.3s',
  },
  ctaLink: { position: 'absolute', inset: 0, zIndex: 2 },
};
