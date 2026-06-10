import { useState } from "react";
import SIL from "../assets/SilMascot.png";
import Logo from "../assets/SilLogo.svg";


// ============================================================
// design-tokens.js
// ============================================================
const T = {
  bg: '#FAF5EF',
  charcoal: '#360A0A',
  sage: '#729651',
  terra: '#882608',
  orange: '#FF8D00',
  yellow: '#FFB806',
  head: "'Bowlby One SC', sans-serif",
  body: "'Fredoka', sans-serif",
};

const B = {
  w1: '2% 95% 3% 95% / 95% 4% 92% 5%',
  w2: '95% 4% 97% 5% / 4% 94% 3% 95%',
  organic: '40% 60% 70% 30% / 40% 50% 60% 50%',
};

// ============================================================
// UI Strings Dictionary
// ============================================================
const UI = {
  welcomeTitle: { en: "Welcome to S.I.L", nl: "Welkom bij S.I.L" },
  missionTitle: { en: "Our Mission", nl: "Onze Missie" },
  missionDesc: { en: "Designing structural movement from a deep foundation of Broad Prosperity.", nl: "Structurele beweging ontwerpen vanuit een diepe basis van Brede Welvaart." },
  spaceTitle: { en: "The Space", nl: "De Ruimte" },
  spaceDesc: { en: "A lifelike learning environment where community members and students give back to grow.", nl: "Een levensechte leeromgeving waar wijkbewoners en studenten samenwerken om te groeien." },
  gardenTitle: { en: "Broad Prosperity Garden", nl: "Brede Welvaart Tuin" },
  gardenSub: { en: "The root of our garden.", nl: "De wortel van onze tuin." },
  gardenTap: { en: "↓ tap any patch to explore ↓", nl: "↓ tik op een vakje om te ontdekken ↓" },
  learnTitle: { en: "What you will learn", nl: "Wat je zult leren" },
  learnDesc: { en: "Every patch requires different tools. Nurture long-term solutions, lay down the groundwork, and watch major impact start from a single seed.", nl: "Elk vakje vereist ander gereedschap. Voed langetermijnoplossingen, leg de basis, en zie grote impact beginnen bij een enkel zaadje." },
  bubble: { en: "Time to plant some new ideas!", nl: "Tijd om nieuwe ideeën te planten!" },
  activeProj: { en: "🌱 Active Projects", nl: "🌱 Actieve Projecten" },
};

// ============================================================
// pillars.data.js (Bilingual + Thematic Images)
// ============================================================
const PILLARS = [
  {
    name: { en: 'Livelihood Security', nl: 'Bestaanszekerheid' },
    color: T.charcoal,
    pattern: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)',
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80', // Safe, warm residential housing
    tagline: { en: 'Solid ground to grow from.', nl: 'Vaste grond om op te bouwen.' },
    description: {
      en: 'Working toward a future where everyone has enough: income, housing, and the security to plan ahead without fear of the next bill.',
      nl: 'Werken aan een toekomst waarin iedereen genoeg heeft: inkomen, huisvesting en de zekerheid om vooruit te plannen zonder angst voor de volgende rekening.'
    },
    projects: {
      en: ['Debt relief navigation', 'Emergency support network', 'Cooperative housing pilots'],
      nl: ['Schuldhulp navigatie', 'Noodhulp netwerk', 'Coöperatieve woonpilots']
    },
    stat: { label: { en: 'households stabilised', nl: 'huishoudens gestabiliseerd' }, value: '120' },
  },
  {
    name: { en: 'Inclusion', nl: 'Inclusie' },
    color: T.bg,
    pattern: `repeating-linear-gradient(-45deg, ${T.sage}, ${T.sage} 10px, transparent 10px, transparent 20px)`,
    icon: '🌍',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80', // Diverse group of people collaborating
    tagline: { en: 'Every seed belongs here.', nl: 'Elk zaadje hoort hier.' },
    description: {
      en: 'Actively dismantling barriers so that all people — especially those pushed to the margins — feel seen, valued, and genuinely welcomed.',
      nl: 'Het actief afbreken van barrières zodat alle mensen — vooral degenen die naar de marge zijn gedrukt — zich gezien, gewaardeerd en oprecht welkom voelen.'
    },
    projects: {
      en: ['Accessibility audits', 'Safe space certification', 'Language buddy system'],
      nl: ['Toegankelijkheidsscans', 'Veilige ruimte certificering', 'Taalbuddy systeem']
    },
    stat: { label: { en: 'languages spoken', nl: 'talen gesproken' }, value: '14' },
  },
  {
    name: { en: 'Environment & Living Space', nl: 'Milieu & Leefomgeving' },
    color: T.sage,
    pattern: 'radial-gradient(rgba(255,255,255,0.3) 3px, transparent 3px)',
    icon: '🌿',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80', // Hands planting in soil
    tagline: { en: 'A healthy garden is a healthy life.', nl: 'Een gezonde tuin is een gezond leven.' },
    description: {
      en: 'Grounding all our work in ecological responsibility and healthy public spaces. We focus on reducing our collective footprint while creating environments where people can breathe, move, play, and truly thrive.',
      nl: 'Al ons werk baseren op ecologische verantwoordelijkheid en gezonde openbare ruimtes. We richten ons op het verkleinen van onze voetafdruk en creëren plekken waar mensen kunnen ademen, bewegen en bloeien.'
    },
    projects: {
      en: ['Urban composting program', 'Public space redesign', 'Clean air advocacy'],
      nl: ['Stedelijk composteringsprogramma', 'Herinrichting openbare ruimte', 'Schone lucht campagnes']
    },
    stat: { label: { en: 'green m² & waste diverted', nl: 'groene m² & afval omgeleid' }, value: '890m² / 2.4t' },
  },
  {
    name: { en: 'Social Cohesion', nl: 'Sociale Cohesie' },
    color: T.terra,
    pattern: `radial-gradient(rgba(255,255,255,0.15) 2px, transparent 2px)`,
    icon: '🤝',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80', // People laughing together at a table
    tagline: { en: 'Roots that intertwine.', nl: 'Wortels die verstrengelen.' },
    description: {
      en: 'Weaving the threads of community together — building trust, solidarity, and a shared sense of belonging across generations and diverse backgrounds.',
      nl: 'De draden van de gemeenschap samenweven — bouwen aan vertrouwen, solidariteit en een gedeeld gevoel van verbondenheid over generaties en achtergronden heen.'
    },
    projects: {
      en: ['Neighbourhood kitchen dinners', 'Inter-generational storytelling', 'Street garden collectives'],
      nl: ['Buurtkeuken diners', 'Intergenerationele verhalen', 'Straattuin collectieven']
    },
    stat: { label: { en: 'community events held', nl: 'buurtevenementen georganiseerd' }, value: '58' },
  },
  {
    name: { en: 'Participation', nl: 'Participatie' },
    color: T.orange,
    pattern: null,
    icon: '🗳️',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80', // Active community workshop/post-its
    tagline: { en: 'Your voice is a seed.', nl: 'Jouw stem is een zaadje.' },
    description: {
      en: 'Empowering residents to actively co-create the neighbourhood\'s future through dialogue, design sprints, and direct civic action.',
      nl: 'Bewoners in staat stellen om actief mee te creëren aan de toekomst van de wijk door middel van dialoog, design sprints en directe burgeractie.'
    },
    projects: {
      en: ['Community design sprints', 'Participatory budgeting', 'Resident innovation board'],
      nl: ['Gemeenschap design sprints', 'Participatief budgetteren', 'Bewoners innovatieraad']
    },
    stat: { label: { en: 'voices heard', nl: 'stemmen gehoord' }, value: '1,200+' },
  },
  {
    name: { en: 'Equal Opportunities', nl: 'Kansengelijkheid' },
    color: T.yellow,
    pattern: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)',
    icon: '🌻',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80', // Group studying/learning together
    tagline: { en: 'Equal roots, equal fruits.', nl: 'Gelijke wortels, gelijke vruchten.' },
    description: {
      en: 'Ensuring that every person — regardless of background — has an equal shot at education, work, and well-being. We break down the systemic barriers that keep people from reaching their potential.',
      nl: 'Ervoor zorgen dat ieder mens — ongeacht achtergrond — een gelijke kans heeft op onderwijs, werk en welzijn. We breken systemische barrières af.'
    },
    projects: {
      en: ['Neighbourhood tutoring circles', 'Skills exchange workshops', 'Fair access coaching program'],
      nl: ['Buurt bijlescirkels', 'Vaardigheden uitwisseling', 'Eerlijke toegang coaching']
    },
    stat: { label: { en: 'residents supported', nl: 'bewoners ondersteund' }, value: '340+' },
  },
];

// ============================================================
// styles.js
// ============================================================
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bowlby+One+SC&family=Fredoka:wght@400;600&display=swap');

  /* Ensure smooth scrolling for anchor links */
  html {
    scroll-behavior: smooth;
  }

  @keyframes silBob {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-12px) rotate(2deg); }
  }
  @keyframes bubbleFloat {
    0%, 100% { transform: translateX(-50%) translateY(0px) rotate(-1deg); }
    50%       { transform: translateX(-50%) translateY(-6px) rotate(-1deg); }
  }
  @keyframes patchFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }
  @keyframes overlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes modalIn {
    from { opacity: 0; transform: translateY(28px) rotate(-1deg) scale(0.96); }
    to   { opacity: 1; transform: translateY(0px)  rotate(-1deg) scale(1);   }
  }
`;

// ============================================================
// Components
// ============================================================

const InfoCard = ({ title, description, accentColor, rotation = 0, image }) => (
  <div style={{
    backgroundColor: '#fff',
    padding: '2rem',
    border: `6px solid ${T.charcoal}`,
    borderRadius: rotation < 0 ? B.w1 : B.w2,
    boxShadow: `8px 8px 0px ${T.charcoal}`,
    transform: `rotate(${rotation}deg)`,
  }}>
    {image ? (
      <img src={image} alt={title} style={{
        width: '100%',
        height: '180px',
        objectFit: 'cover',
        borderRadius: rotation < 0 ? B.w2 : B.w1,
        border: `4px solid ${T.charcoal}`,
        marginBottom: '1.5rem',
        backgroundColor: accentColor
      }} />
    ) : (
      <div style={{
        backgroundColor: accentColor,
        height: '160px',
        borderRadius: rotation < 0 ? B.w2 : B.w1,
        border: `4px solid ${T.charcoal}`,
        marginBottom: '1.5rem',
        backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(0,0,0,0.08) 10px,rgba(0,0,0,0.08) 20px)',
      }} />
    )}

    <h3 style={{ fontFamily: T.head, fontSize: '1.5rem', margin: '0 0 0.5rem', color: T.charcoal }}>
      {title}
    </h3>
    <p style={{ margin: 0, fontWeight: 600, fontFamily: T.body, lineHeight: 1.55 }}>
      {description}
    </p>
  </div>
);

const GardenPillar = ({ pillar, index, onClick, lang }) => {
  const [hovered, setHovered] = useState(false);
  const rotation = index % 2 === 0 ? '3deg' : '-3deg';
  const lightBg = pillar.color === T.bg || pillar.color === T.yellow;
  const labelColor = lightBg ? T.charcoal : T.bg;
  const borderCol = pillar.color === T.bg ? T.charcoal : T.bg;

  return (
    <div style={{ animation: `patchFloat ${2 + index * 0.18}s ease-in-out ${index * 0.1}s infinite`, display: 'inline-block' }}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => onClick(pillar)}
        onKeyDown={e => e.key === 'Enter' && onClick(pillar)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          backgroundColor: pillar.color,
          backgroundImage: pillar.pattern || undefined,
          backgroundSize: '15px 15px',
          border: `5px solid ${borderCol}`,
          borderRadius: index % 2 === 0 ? B.organic : B.w1,
          padding: '1.25rem 1rem',
          width: 'clamp(140px, 18vw, 195px)',
          minHeight: '115px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: '6px',
          boxShadow: hovered ? `10px 10px 0px ${borderCol}` : `6px 6px 0px ${borderCol}`,
          cursor: 'pointer',
          transform: hovered ? 'scale(1.08) translateY(-4px) rotate(0deg)' : `rotate(${rotation})`,
          transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease',
        }}
      >
        <span style={{ fontSize: '2rem', lineHeight: 1 }}>{pillar.icon}</span>
        <h4 style={{ fontFamily: T.head, fontSize: '0.85rem', margin: 0, lineHeight: 1.2, color: labelColor, textShadow: lightBg ? 'none' : `2px 2px 0px ${T.charcoal}` }}>
          {pillar.name[lang]}
        </h4>
      </div>
    </div>
  );
};

const PillarModal = ({ pillar, onClose, lang }) => {
  if (!pillar) return null;

  const lightBg = pillar.color === T.bg || pillar.color === T.yellow;
  const textColor = lightBg ? T.charcoal : T.bg;
  const shadowCol = lightBg ? T.charcoal : 'rgba(0,0,0,0.3)';

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(54,10,10,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1.5rem', backdropFilter: 'blur(2px)', animation: 'overlayIn 0.2s ease' }}>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: pillar.color, backgroundImage: pillar.pattern || undefined, backgroundSize: '20px 20px', border: `8px solid ${T.charcoal}`, borderRadius: B.w1, boxShadow: `18px 18px 0px ${T.charcoal}`, padding: 'clamp(1.75rem,5vw,3rem)', maxWidth: '540px', width: '100%', maxHeight: '88vh', overflowY: 'auto', position: 'relative', animation: 'modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1)', transform: 'rotate(-1deg)' }}>

        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: T.charcoal, color: T.bg, border: `4px solid ${textColor}`, borderRadius: B.w2, width: '40px', height: '40px', fontSize: '1.1rem', cursor: 'pointer', fontFamily: T.head, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `4px 4px 0px ${textColor}` }}>✕</button>

        <div style={{ marginBottom: '1.25rem', paddingRight: '2.5rem' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem', lineHeight: 1 }}>{pillar.icon}</span>
          <h2 style={{ fontFamily: T.head, fontSize: 'clamp(1.6rem,4vw,2.2rem)', margin: '0 0 4px', color: textColor, textShadow: lightBg ? 'none' : `3px 3px 0px ${shadowCol}` }}>
            {pillar.name[lang]}
          </h2>
          <p style={{ fontFamily: T.body, fontSize: '1rem', margin: 0, color: textColor, opacity: 0.9, fontWeight: 600, fontStyle: 'italic' }}>
            "{pillar.tagline[lang]}"
          </p>
        </div>

        {pillar.image && (
          <img src={pillar.image} alt={pillar.name[lang]} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: B.w2, border: `4px solid ${textColor}`, boxShadow: `4px 4px 0px ${textColor}`, marginBottom: '1.5rem' }} />
        )}

        <div style={{ height: '4px', marginBottom: '1.25rem', backgroundImage: `repeating-linear-gradient(90deg,${textColor} 0,${textColor} 12px,transparent 12px,transparent 18px)`, borderRadius: '2px', opacity: 0.5 }} />

        <p style={{ fontSize: '1.05rem', lineHeight: 1.65, fontWeight: 600, fontFamily: T.body, color: textColor, margin: '0 0 1.75rem' }}>
          {pillar.description[lang]}
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: lightBg ? T.charcoal : T.bg, color: lightBg ? T.bg : T.charcoal, borderRadius: B.w2, padding: '6px 16px', marginBottom: '1.5rem', border: `3px solid ${textColor}`, boxShadow: `4px 4px 0px ${textColor}` }}>
          <span style={{ fontFamily: T.head, fontSize: '1.3rem', lineHeight: 1 }}>{pillar.stat.value}</span>
          <span style={{ fontFamily: T.body, fontSize: '0.85rem', fontWeight: 600, opacity: 0.85 }}>{pillar.stat.label[lang]}</span>
        </div>

        <div style={{ backgroundColor: lightBg ? 'rgba(54,10,10,0.05)' : 'rgba(255,255,255,0.1)', border: `4px solid ${textColor}`, borderRadius: B.w2, padding: '1.25rem 1.5rem' }}>
          <h3 style={{ fontFamily: T.head, fontSize: '1rem', margin: '0 0 0.875rem', color: textColor, textShadow: lightBg ? 'none' : `2px 2px 0px ${shadowCol}` }}>
            {UI.activeProj[lang]}
          </h3>
          {pillar.projects[lang].map((project, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: i < pillar.projects[lang].length - 1 ? '0.625rem' : 0 }}>
              <div style={{ backgroundColor: textColor, color: lightBg ? T.bg : T.charcoal, borderRadius: '50%', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.head, fontSize: '0.75rem', flexShrink: 0 }}>
                {i + 1}
              </div>
              <span style={{ fontWeight: 600, color: textColor, fontFamily: T.body, fontSize: '0.95rem' }}>
                {project}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN PAGE VIEW
// ============================================================
const SILHomePage = () => {
  const [activePillar, setActivePillar] = useState(null);
  const [lang, setLang] = useState('nl'); // 'nl' or 'en'

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* Added id="top" for the logo scroll-to-top functionality */}
      <div id="top" style={{
        backgroundColor: T.bg,
        backgroundImage: `radial-gradient(${T.terra} 1.5px,transparent 1.5px),radial-gradient(${T.terra} 1.5px,transparent 1.5px)`,
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 20px 20px',
        color: T.charcoal,
        fontFamily: T.body,
        minHeight: '100vh',
        padding: '2vw',
        overflowX: 'hidden',
        position: 'relative',
      }}>

        {/* ── TOP NAVIGATION UTILITIES ──────────────────────── */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2vw',
          padding: '0 1rem'
        }}>

          {/* ── LOGO (TOP CENTER, CLICK TO TOP) ──────────────── */}
          <div style={{ flex: 1 }} />

          <a href="#top" aria-label="Return to top" style={{
            display: 'block',
            width: '100%',
            maxWidth: '600px', /* Caps the growth at 600px */
            margin: '0 auto',  /* Centers it if the parent is wider than 600px */
            transition: 'transform 0.2s ease',
            cursor: 'pointer'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05) rotate(-2deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            <img src={Logo} alt="SIL Logo" style={{
              width: '100%',
              height: 'auto', /* Keeps the original proportions */
              display: 'block'
            }} />
          </a>

          {/* ── LANGUAGE TOGGLE ───────────────────────────────── */}
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={() => setLang(lang === 'nl' ? 'en' : 'nl')}
              style={{
                backgroundColor: T.yellow,
                border: `4px solid ${T.charcoal}`,
                borderRadius: B.w1,
                padding: '8px 16px',
                fontFamily: T.head,
                fontSize: '1rem',
                color: T.charcoal,
                cursor: 'pointer',
                boxShadow: `4px 4px 0px ${T.charcoal}`,
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseDown={e => {
                e.currentTarget.style.transform = 'translate(2px, 2px)';
                e.currentTarget.style.boxShadow = `2px 2px 0px ${T.charcoal}`;
              }}
              onMouseUp={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = `4px 4px 0px ${T.charcoal}`;
              }}
            >
              {lang === 'nl' ? '🇳🇱 NL ⇄ EN' : '🇬🇧 EN ⇄ NL'}
            </button>
          </div>
        </div>

        {/* ── HEADER ────────────────────────────────────────── */}
        <header style={{ textAlign: 'center', marginBottom: '4vw', padding: '0 1rem' }}>
          <h1 style={{
            fontFamily: T.head,
            fontSize: 'clamp(3rem,7vw,5rem)',
            color: T.bg,
            margin: 0,
            textShadow: `5px 5px 0px ${T.charcoal},-2px -2px 0px ${T.terra},8px 8px 0px ${T.yellow}`,
            WebkitTextStroke: `2px ${T.charcoal}`,
          }}>
            SOCIAL INNOVATION LAB
          </h1>
        </header>

        {/* ── SECTION 1 · THE HOUSE ─────────────────────────── */}
        <section style={{ margin: '0 auto 6vw', maxWidth: '1100px', width: '100%' }}>
          <svg viewBox="0 0 1000 120" width="100%" preserveAspectRatio="none"
            style={{ display: 'block', marginBottom: '-10px', filter: 'drop-shadow(8px 8px 0px rgba(54,10,10,0.2))' }}>
            <path d="M 20 110 Q 250 10 500 20 T 980 110"
              fill="none" stroke={T.charcoal} strokeWidth="14" strokeLinecap="round" />
          </svg>

          <div style={{
            border: `8px solid ${T.charcoal}`,
            borderTop: 'none',
            padding: 'clamp(2rem,5vw,4rem)',
            backgroundColor: T.bg,
            borderRadius: '0 0 40px 40px / 0 0 15px 15px',
            boxShadow: `15px 15px 0px ${T.sage},30px 30px 0px rgba(114,150,81,0.3)`,
          }}>
            <h2 style={{ fontFamily: T.head, textAlign: 'center', fontSize: 'clamp(2rem,4vw,3rem)', margin: '0 0 3rem', color: T.charcoal, textShadow: `3px 3px 0px ${T.yellow}` }}>
              {UI.welcomeTitle[lang]}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '3rem' }}>
              <InfoCard
                title={UI.missionTitle[lang]}
                description={UI.missionDesc[lang]}
                accentColor={T.terra}
                rotation={-1}
                image="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80" // Restored specific mission image
              />
              <InfoCard
                title={UI.spaceTitle[lang]}
                description={UI.spaceDesc[lang]}
                accentColor={T.orange}
                rotation={2}
                image="https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80"
              />
            </div>
          </div>
        </section>

        {/* ── SECTION 2 · THE GARDEN ────────────────────────── */}
        <section style={{ margin: '0 auto 6vw', maxWidth: '1200px', width: '100%', paddingTop: '3rem' }}>
          <div style={{
            backgroundColor: T.charcoal,
            padding: '0 clamp(2rem,5vw,4rem) clamp(2rem,5vw,4rem)',
            borderRadius: B.w1,
            border: `8px solid ${T.charcoal}`,
            boxShadow: `15px 15px 0px ${T.terra}`,
          }}>

            {/* ── SIGNPOST STUCK IN THE DIRT ── */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-3.5rem', marginBottom: '2rem' }}>
              <div style={{ backgroundColor: T.bg, border: `6px solid ${T.charcoal}`, borderRadius: B.w2, padding: '1.5rem 2.5rem', textAlign: 'center', transform: 'rotate(-3deg)', boxShadow: `8px 8px 0px ${T.orange}`, zIndex: 2, position: 'relative' }}>
                <h3 style={{ fontFamily: T.head, fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', margin: '0 0 8px', color: T.charcoal }}>
                  {UI.gardenTitle[lang]}
                </h3>
                <p style={{ margin: 0, fontWeight: 'bold', fontFamily: T.body, fontSize: '1.05rem', color: T.charcoal }}>
                  {UI.gardenSub[lang]}
                </p>
              </div>
              <div style={{ width: '32px', height: '60px', backgroundColor: T.terra, borderLeft: `6px solid ${T.charcoal}`, borderRight: `6px solid ${T.charcoal}`, marginTop: '-10px', zIndex: 1, position: 'relative' }} />
            </div>

            <p style={{ textAlign: 'center', color: T.bg, opacity: 0.65, fontWeight: 600, margin: '0 0 2.5rem', fontSize: '0.95rem', fontFamily: T.body, letterSpacing: '0.05em' }}>
              {UI.gardenTap[lang]}
            </p>

            {/* Pillar patches */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
              {PILLARS.map((pillar, index) => (
                <GardenPillar key={index} pillar={pillar} index={index} onClick={setActivePillar} lang={lang} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3 · MASCOT ────────────────────────────── */}
        <section style={{
          margin: '0 auto 4vw',
          maxWidth: '1100px',
          width: '100%',
          backgroundColor: T.yellow,
          color: T.charcoal,
          padding: 'clamp(2rem,5vw,4rem)',
          borderRadius: B.w2,
          border: `8px solid ${T.charcoal}`,
          boxShadow: `12px 12px 0px ${T.charcoal}`,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '3rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          transform: 'rotate(-1deg)',
          overflow: 'visible'
        }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontFamily: T.head, fontSize: 'clamp(2rem,4vw,3rem)', margin: '0 0 1.5rem' }}>
              {UI.learnTitle[lang]}
            </h2>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.65, margin: 0, fontWeight: 600, fontFamily: T.body }}>
              {UI.learnDesc[lang]}
            </p>
          </div>

          {/* ── RESPONSIVE MASCOT CONTAINER (Max 600px) ────────── */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            paddingTop: 'clamp(3rem, 12vw, 6rem)', /* Dynamic space for the bubble */
            width: '100%',
            maxWidth: '600px', /* Caps the growth at 600px */
            margin: '0 auto',
            overflow: 'visible' /* Crucial so arms don't clip */
          }}>
            {/* Speech Bubble */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)', /* Keeps bubble perfectly centered */
              backgroundColor: '#fff',
              color: T.charcoal,
              padding: 'clamp(10px, 2vw, 18px) clamp(16px, 3vw, 24px)',
              borderRadius: B.w1,
              border: `clamp(3px, 0.8vw, 6px) solid ${T.charcoal}`,
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)',
              fontFamily: T.body,
              boxShadow: `clamp(4px, 1vw, 8px) clamp(4px, 1vw, 8px) 0px ${T.charcoal}`,
              whiteSpace: 'nowrap',
              zIndex: 2,
              animation: 'bubbleFloat 1.8s ease-in-out infinite'
            }}>
              {UI.bubble[lang]}
              {/* Bubble Tail */}
              <div style={{
                position: 'absolute',
                bottom: 'calc(clamp(3px, 0.8vw, 6px) * -2.5)', /* Drops tail below dynamic border */
                left: '40%',
                width: 0, height: 0,
                borderLeft: 'clamp(8px, 2vw, 16px) solid transparent',
                borderRight: 'clamp(4px, 1vw, 8px) solid transparent',
                borderTop: `clamp(12px, 3vw, 24px) solid ${T.charcoal}`,
                transform: 'rotate(15deg)'
              }} />
            </div>

            {/* Mascot Visual Box */}
            <div style={{
              width: '100%',
              /* Removed the fixed aspect-ratio so the box wraps exactly to the content */
              backgroundColor: T.sage,
              borderRadius: B.w2,
              border: `clamp(4px, 1vw, 8px) solid ${T.charcoal}`,
              boxShadow: `clamp(6px, 1.5vw, 12px) clamp(6px, 1.5vw, 12px) 0px ${T.charcoal}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start', /* Align content starting from the top */
              paddingTop: 'clamp(10px, 2vw, 20px)', /* Hugs the top with 10-20px padding */
              paddingBottom: 'clamp(10px, 2vw, 20px)',
              backgroundImage: 'repeating-radial-gradient(circle,transparent,transparent 10px,rgba(0,0,0,0.04) 10px,rgba(0,0,0,0.04) 20px)',
              animation: 'silBob 1.5s ease-in-out infinite',
              position: 'relative',
              overflow: 'visible',
            }}>
              {/* Mascot Image */}
              <img src={SIL} alt="SIL Mascot" style={{
                /* Relative flow dictates the box height so it hugs nicely */
                position: 'relative',
                transform: 'scaleX(-1)', /* Mirrored */
                width: '140%', /* Wide enough to break out of the side borders */
                height: 'auto',
                display: 'block',
                zIndex: 1,
                filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.15))',
                marginBottom: '10px'
              }} />

              <p style={{
                fontFamily: T.head,
                color: T.charcoal,
                margin: 0,
                fontSize: 'clamp(1.5rem, 5vw, 3rem)', /* Text grows with box */
                position: 'relative',
                zIndex: 0,
                lineHeight: 1
              }}>SIL</p>
            </div>
          </div>
        </section>

      </div>

      <PillarModal pillar={activePillar} onClose={() => setActivePillar(null)} lang={lang} />
    </>
  );
};

export default SILHomePage;