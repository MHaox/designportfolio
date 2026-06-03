import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SIL_MVP = () => {
  const silRef = useRef(null);

  // Apply GSAP animation for Sil's gentle, kindhearted bounce
  useEffect(() => {
    const silElement = silRef.current;
    
    gsap.to(silElement, {
      y: -12,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      gsap.killTweensOf(silElement);
    };
  }, []);

  // Theme Styles based on the Branding Kit
  const theme = {
    bg: '#FAF5EF',
    charcoal: '#360A0A',
    sage: '#729651',
    terracotta: '#882608',
    orange: '#FF8D00',
    yellow: '#FFB806',
    fonts: {
      head: "'Bowlby One SC', sans-serif",
      body: "'Fredoka', sans-serif",
    }
  };

  return (
    <div style={{ backgroundColor: theme.bg, color: theme.charcoal, fontFamily: theme.fonts.body, minHeight: '100vh', padding: '2rem' }}>
      
      {/* HEADER SECTION */}
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontFamily: theme.fonts.head, fontSize: '3rem', color: theme.charcoal, margin: 0 }}>
          SOCIAL INNOVATION LAB
        </h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto' }}>
          Combining student ingenuity with local, systemic societal issues to build a more equal, thriving, and livable community.
        </p>
      </header>

      {/* THE ROOFLINE & WELCOME SECTION */}
      <section style={{ position: 'relative', margin: '0 auto', maxWidth: '1000px' }}>
        {/* Abstract Roofline Shape */}
        <div style={{
          width: '0', height: '0', 
          borderLeft: '500px solid transparent',
          borderRight: '500px solid transparent',
          borderBottom: `60px solid ${theme.charcoal}`,
          margin: '0 auto'
        }}></div>
        
        <div style={{ 
          border: `8px solid ${theme.charcoal}`, 
          borderTop: 'none',
          padding: '3rem', 
          backgroundColor: '#fff',
          borderRadius: '0 0 16px 16px' 
        }}>
          <h2 style={{ fontFamily: theme.fonts.head, textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>
            Welcome to S.I.L
          </h2>

          {/* INFO CARDS (Grid Layout) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Card 1 */}
            <div style={{ backgroundColor: theme.bg, padding: '1.5rem', borderRadius: '12px', border: `2px solid ${theme.charcoal}` }}>
              <div style={{ backgroundColor: theme.sage, height: '150px', borderRadius: '8px', marginBottom: '1rem' }}></div>
              <h3 style={{ fontFamily: theme.fonts.head, color: theme.terracotta }}>Our Mission</h3>
              <p>Designing movement from a foundation of Broad Prosperity.</p>
            </div>
            {/* Card 2 */}
            <div style={{ backgroundColor: theme.bg, padding: '1.5rem', borderRadius: '12px', border: `2px solid ${theme.charcoal}` }}>
              <div style={{ backgroundColor: theme.yellow, height: '150px', borderRadius: '8px', marginBottom: '1rem' }}></div>
              <h3 style={{ fontFamily: theme.fonts.head, color: theme.orange }}>The Environment</h3>
              <p>A lifelike learning environment where everyone gives back to grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GARDEN OF BROAD PROSPERITY (Placeholder for Interactive Map) */}
      <section style={{ margin: '4rem auto', maxWidth: '1000px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: theme.fonts.head, fontSize: '2.5rem', color: theme.sage }}>
          Garden of Broad Prosperity
        </h2>
        <div style={{ 
          height: '300px', 
          backgroundColor: theme.charcoal, 
          borderRadius: '16px', 
          marginTop: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.bg
        }}>
          <p>[ Interactive Isometric Node Map Component Goes Here ]</p>
        </div>
      </section>

      {/* WHAT YOU WILL LEARN & SIL MASCOT */}
      <section style={{ 
        margin: '4rem auto', 
        maxWidth: '1000px', 
        backgroundColor: theme.terracotta, 
        color: theme.bg,
        padding: '3rem',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '60%' }}>
          <h2 style={{ fontFamily: theme.fonts.head, fontSize: '2.5rem' }}>What you will learn</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
            Nurture long-term solutions, lay down the groundwork, and watch great things start from a single seed.
          </p>
        </div>

        {/* Sil The Mascot Wrapper */}
        <div 
          ref={silRef}
          style={{ 
            width: '180px', 
            height: '240px', 
            backgroundColor: theme.sage, 
            borderRadius: '100px 100px 20px 20px',
            border: `6px solid ${theme.charcoal}`,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Speech Bubble */}
          <div style={{
            position: 'absolute',
            top: '-60px',
            right: '-80px',
            backgroundColor: theme.bg,
            color: theme.charcoal,
            padding: '10px 15px',
            borderRadius: '20px',
            border: `3px solid ${theme.charcoal}`,
            fontWeight: 'bold',
            whiteSpace: 'nowrap'
          }}>
            Need help planting ideas?
          </div>
          <span style={{ fontSize: '4rem' }}>🌱</span>
          <p style={{ fontFamily: theme.fonts.head, color: theme.charcoal, margin: '10px 0 0 0' }}>SIL</p>
        </div>
      </section>

    </div>
  );
};

export default SIL_MVP;