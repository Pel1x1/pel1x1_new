import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import WebGLBackground from '@/components/WebGLBackground';
import { projects, type Project } from '@/data/projects';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [currentImg, setCurrentImg] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) scale3d(1.005,1.005,1.005)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)');
  };

  const nextImg = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImg((c) => (c + 1) % project.images.length);
  };
  const prevImg = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setCurrentImg((c) => (c - 1 + project.images.length) % project.images.length);
  };

  return (
    <div
      ref={ref}
      className="project-card reveal"
      style={{ transform, transition: 'transform 0.2s ease-out', '--i': index } as CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-img-wrap">
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #1a1a24, #0f0f18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.5 }}>
            {project.title}
          </span>
        </div>
        <img
          src={project.images[currentImg]}
          alt={project.title}
          style={{ position: 'relative', zIndex: 1 }}
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
        />
        <div className="project-img-overlay" />

        {project.images.length > 1 && (
          <>
            <button className="img-nav prev" onClick={prevImg} aria-label="Previous">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button className="img-nav next" onClick={nextImg} aria-label="Next">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
            <div className="img-dots">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  className={`img-dot${i === currentImg ? ' active' : ''}`}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImg(i); }}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="project-body">
        <div className="project-title">{project.title}</div>
        <div className="project-desc">{project.description}</div>
        <div className="project-tags">
          {project.technologies.map((t) => (
            <span key={t} className="project-tag">{t}</span>
          ))}
        </div>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
          Открыть сайт
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <WebGLBackground />
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(80px, 10vh, 120px) var(--gap) var(--section-pad)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Link to="/" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Назад
          </Link>

          <div className="page-header reveal">
            <h1 className="t-h1">
              Наши <span className="accent-text">проекты</span>
            </h1>
            <div className="page-header-line" />
          </div>

          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
