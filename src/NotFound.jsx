import React, { useEffect } from "react";

const pixelFont = `
@font-face {
  font-family: 'PressStart2P';
  src: url('https://fonts.gstatic.com/s/pressstart2p/v12/e3t4euO8KNyE0bM6oGQ8wm0l.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
`;

function NotFound() {
  const [isMobile, setIsMobile] = React.useState(false);
  useEffect(() => {
    function handleKey(e) {
      if (isMobile) return;
      if (e.key === 'Escape') {
        window.history.back();
      } else if (e.key === 'Enter') {
        window.location.href = '/';
      }
    }
    function checkMobile() {
      setIsMobile(window.matchMedia('(max-width: 700px), (pointer: coarse)').matches);
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('keydown', handleKey);
    };
  }, [isMobile]);
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: `#0c1c4c url('/assets/404Background.gif') center center / cover no-repeat fixed`,
        color: '#fff',
        fontFamily: "'PressStart2P', 'Consolas', 'monospace'",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
        fontSize: '1.1rem',
        letterSpacing: 0.5,
        userSelect: 'none',
        position: 'relative',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(19, 19, 19, 0.72)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />
      <style>{pixelFont}</style>
      <div style={{
        background: 'rgba(12,28,76,0.98)',
        border: '2px solid #1a2a6c',
        borderRadius: 12,
        padding: '36px 32px 32px 32px',
        boxShadow: '0 8px 48px #000a',
        maxWidth: 600,
        width: '90vw',
        margin: '0 auto',
        textAlign: 'left',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ color: '#4ec3ff', fontSize: '1.1em', marginBottom: 18, textShadow: '0 0 4px #0008' }}>
          TOPROM ERROR 0x00000404
        </div>
        <div style={{ color: '#fff', fontSize: '1.05em', marginBottom: 18 }}>
          PAGE_NOT_FOUND — The page you're looking for was lost in time, like tears in the rain.
        </div>
        <div style={{ color: '#ffb347', marginBottom: 18 }}>
          A fatal exception has occurred in module <b>navigation.exe</b>.<br/>
          Attempted to access a route that does not exist.
        </div>
        <div style={{ color: '#fff', marginBottom: 18 }}>
          INITIATING MEMORY DUMP...<br/>
          <span style={{ color: '#4ec3ff' }}>&gt; Saving stack trace to /page/missing.html</span><br/>
          <span style={{ color: '#4ec3ff' }}>&gt; Surfacing redirect protocol...</span>
        </div>
        <div style={{ color: '#fff', marginTop: 32, fontSize: '0.95em', borderTop: '1px solid #2a3a7c', paddingTop: 18 }}>
          {isMobile ? (
            <span
              style={{ color: '#4ec3ff', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => { window.location.href = '/'; }}
            >
              Tap here to go to the homepage
            </span>
          ) : (
            <>
              Press <span style={{ color: '#4ec3ff' }}>Esc</span> to return to the previous page.<br/>
              Press <span style={{ color: '#4ec3ff' }}>Enter</span> to go home.
            </>
          )}
        </div>
      </div>
      <a
        href="https://www.reddit.com/user/__UsernameChecksOut/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: 10,
          right: 16,
          fontSize: '0.82em',
          color: 'rgba(200,220,255,0.13)',
          textShadow: '0 0 2px #0008',
          fontFamily: "'PressStart2P', 'Consolas', 'monospace'",
          letterSpacing: 0.5,
          zIndex: 10,
          textDecoration: 'none',
          pointerEvents: 'auto',
          transition: 'color 0.2s',
        }}
        onMouseOver={e => e.currentTarget.style.color = 'rgba(200,220,255,0.32)'}
        onMouseOut={e => e.currentTarget.style.color = 'rgba(200,220,255,0.13)'}
      >
        Art by u/__UsernameChecksOut
      </a>
    </div>
  );
}

export default NotFound;