import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'О нас', href: '#about' },
    { label: 'Технологии', href: '#tech' },
    { label: 'Процесс', href: '#process' },
    { label: 'Цены', href: '#pricing' },
    { label: 'Проекты', href: '/projects', isRoute: true },
    { label: 'Контакт', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a
        href="#hero"
        className="nav-brand"
        onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
      >
        K <span style={{ fontSize: '0.6em', opacity: 0.5 }}>&</span> K
      </a>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map((l, i) => (
          <li key={i}>
            {l.isRoute ? (
              <Link
                to={l.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'var(--accent)',
                  border: '1px solid #ffd3ff30',
                  borderRadius: '100px',
                  padding: '5px 14px',
                  marginTop: '-5px',
                  transition: 'background 0.3s, color 0.3s, border-color 0.3s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#ffd3ff12';
                  e.currentTarget.style.borderColor = '#ffd3ff60';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#ffd3ff30';
                }}
              >
                {l.label}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4, verticalAlign: 'middle', display: 'inline' }}>
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
            ) : (
              <a
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(l.href); }}
              >
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>

      <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span style={menuOpen ? { transform: 'rotate(45deg) translate(4px, 4px)' } : {}} />
        <span style={menuOpen ? { opacity: 0 } : {}} />
        <span style={menuOpen ? { transform: 'rotate(-45deg) translate(4px, -4px)' } : {}} />
      </button>
    </nav>
  );
}