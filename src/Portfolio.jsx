import { useState, useEffect, useRef } from 'react';

function Portfolio() {
  const [view, setView] = useState('categories');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsDarkMode(localStorage.getItem('darkMode') === 'true');
    const customHandler = (e) => setIsDarkMode(e.detail);
    window.addEventListener('storage', handler);
    window.addEventListener('darkModeChanged', customHandler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('darkModeChanged', customHandler);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const photoPlaceholders = [
    '/assets/photography/1.webp',
    '/assets/photography/2.webp',
    '/assets/photography/3.webp',
    '/assets/photography/4.webp',
    '/assets/photography/5.webp',
    '/assets/photography/6.webp',
    '/assets/photography/7.webp',
    '/assets/photography/8.webp',
    '/assets/photography/9.webp',
    '/assets/photography/10.webp',
    '/assets/photography/11.webp',
    '/assets/photography/12.webp',
    '/assets/photography/13.webp',
    '/assets/photography/14.webp',
    '/assets/photography/15.webp',
    '/assets/photography/16.webp',
    '/assets/photography/17.webp',
    '/assets/photography/18.webp',
    '/assets/photography/19.webp',
    '/assets/photography/20.webp',
    '/assets/photography/21.webp',
    '/assets/photography/22.webp',
    '/assets/photography/23.webp',
    '/assets/photography/24.webp',
    '/assets/photography/25.webp',
    '/assets/photography/26.webp',
    '/assets/photography/27.webp',
    '/assets/photography/28.webp',
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [modalIdx, setModalIdx] = useState(null);

  const [hoveredIdx, setHoveredIdx] = useState(null);

  const [fadeInPhotos, setFadeInPhotos] = useState(Array(photoPlaceholders.length).fill(false));

  useEffect(() => {
    if (view === 'photography') {
      setFadeInPhotos(Array(photoPlaceholders.length).fill(false));
      photoPlaceholders.forEach((_, i) => {
        setTimeout(() => {
          setFadeInPhotos(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 100 + i * 60);
      });
    }
  }, [view, photoPlaceholders.length]);

  return (
    <>
      <style>{`
        .photo-fadein-wrapper {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.7s cubic-bezier(.23,1.02,.53,.97), transform 0.7s cubic-bezier(.23,1.02,.53,.97);
        }
        .photo-fadein-wrapper.photo-hidden {
          opacity: 0;
          transform: translateY(30px);
        }
        .photo-square {
          width: 220px;
          aspect-ratio: 1/1;
          overflow: hidden;
          border-radius: 18px;
          box-shadow: 0 2px 12px #0002;
          background: #222;
          cursor: pointer;
          position: relative;
          transition: box-shadow 0.22s cubic-bezier(.23,1.02,.53,.97), transform 0.22s cubic-bezier(.23,1.02,.53,.97);
          will-change: transform, box-shadow;
        }
        .photo-square.pop {
          transform: translateY(-8px) scale(1.05); /* reduced pop effect */
          box-shadow: 0 8px 24px 0 #0005, 0 2px 12px #0002;
          z-index: 2;
        }
      `}</style>
      <header>
        <nav>
          <ul className="navbar">
            <div className="mode-button" id="mode-button" onClick={() => {
              const newMode = !isDarkMode;
              setIsDarkMode(newMode);
              localStorage.setItem('darkMode', newMode);
              window.dispatchEvent(new CustomEvent('darkModeChanged', { detail: newMode }));
            }}>
              <img src={isDarkMode ? 'https://i.imgur.com/C0R5Nns.png' : 'https://i.imgur.com/Li8FKFW.png'} alt={isDarkMode ? 'Sun' : 'Moon'} className="icon" id={isDarkMode ? 'sun-icon' : 'moon-icon'} />
            </div>
            <li className="home-button">
              <a href="/">Home</a>
            </li>
          </ul>
        </nav>
      </header>

      <main style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32 }}>
        {view === 'categories' && (
          <div style={{ width: '100%', maxWidth: 900, display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              style={{
                flex: 1,
                minWidth: '220px',
                minHeight: '180px',
                background: isDarkMode ? '#23272e' : '#f3f3f3',
                border: '2px solid #bbb',
                borderRadius: '18px',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: isDarkMode ? '#fff' : '#222',
                boxShadow: '0 2px 12px #0001',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onClick={() => setView('photography')}
            >
              Photography
            </button>
            <button
              style={{
                flex: 1,
                minWidth: '220px',
                minHeight: '180px',
                background: isDarkMode ? '#23272e' : '#f3f3f3',
                border: '2px solid #bbb',
                borderRadius: '18px',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#aaa',
                boxShadow: '0 2px 12px #0001',
                cursor: 'not-allowed',
                opacity: 0.6,
              }}
              disabled
            >
              Programming
            </button>
            <button
              style={{
                flex: 1,
                minWidth: '220px',
                minHeight: '180px',
                background: isDarkMode ? '#23272e' : '#f3f3f3',
                border: '2px solid #bbb',
                borderRadius: '18px',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#aaa',
                boxShadow: '0 2px 12px #0001',
                cursor: 'not-allowed',
                opacity: 0.6,
              }}
              disabled
            >
              3D Art
            </button>
          </div>
        )}

        {view === 'photography' && (
          <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 500 }}>
            <button
              style={{
                alignSelf: 'flex-start',
                marginBottom: '24px',
                background: 'none',
                border: 'none',
                color: '#0077cc',
                fontSize: '1.1rem',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0,
              }}
              onClick={() => setView('categories')}
            >
              ← Back to categories
            </button>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '32px',
                width: '100%',
                justifyItems: 'center',
              }}
            >
              <style>{photoPlaceholders.map((_, i) => `.photo-fadein-wrapper.photo-fadein-${i} { transition-delay: ${i * 60}ms !important; }`).join('\n')}</style>
              {photoPlaceholders.map((src, i) => (
                <div key={src} style={{ width: '100%', maxWidth: 320, display: 'flex', justifyContent: 'center' }}>
                  <div
                    className={
                      `photo-fadein-wrapper${fadeInPhotos[i] ? ` photo-fadein-${i}` : ' photo-hidden'}`
                    }
                  >
                    <div
                      className={`photo-square${hoveredIdx === i ? ' pop' : ''}`}
                      onMouseEnter={() => setHoveredIdx(i)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      onClick={() => { setModalImg(src); setModalIdx(i); setModalOpen(true); }}
                    >
                      <img
                        src={src}
                        alt={`Photography ${i+1}`}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          borderRadius: 18,
                          display: 'block',
                          transition: 'transform 0.2s',
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {modalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.85)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
              cursor: 'zoom-out',
            }}
            onClick={() => setModalOpen(false)}
          >
            {/* Left arrow */}
            <button
              onClick={e => {
                e.stopPropagation();
                const newIdx = (modalIdx - 1 + photoPlaceholders.length) % photoPlaceholders.length;
                setModalIdx(newIdx);
                setModalImg(photoPlaceholders[newIdx]);
              }}
              style={{
                position: 'absolute',
                left: 32,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10001,
              }}
              aria-label="Previous photo"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="14" fill="#222"/>
                <path d="M17 8L11 14L17 20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <img
              src={modalImg}
              alt="Big view"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                borderRadius: 18,
                boxShadow: '0 8px 32px #000a',
                background: '#222',
                cursor: 'auto',
              }}
              onClick={e => e.stopPropagation()}
            />
            {/* Right arrow */}
            <button
              onClick={e => {
                e.stopPropagation();
                const newIdx = (modalIdx + 1) % photoPlaceholders.length;
                setModalIdx(newIdx);
                setModalImg(photoPlaceholders[newIdx]);
              }}
              style={{
                position: 'absolute',
                right: 32,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10001,
              }}
              aria-label="Next photo"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="14" fill="#222"/>
                <path d="M11 8L17 14L11 20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {/* Close X icon */}
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'fixed',
                top: 32,
                right: 40,
                background: 'rgba(0,0,0,0.6)',
                border: 'none',
                borderRadius: '50%',
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10000,
              }}
              aria-label="Close big view"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="14" fill="#222"/>
                <path d="M9 9L19 19M19 9L9 19" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default Portfolio;



