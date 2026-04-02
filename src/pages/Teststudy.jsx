/*
 * CMD Bus Ride — NHL Stenden · Communication & Multimedia Design
 * Single-file React component
 *
 * DEPENDENCIES:
 *   • React 18        (react, react-dom)
 *   • Google Fonts    Syne + Space Grotesk  (loaded via @import in <style>)
 *
 * HOW TO RUN:
 *   1. npx create-react-app cmd-bus && cd cmd-bus
 *   2. Replace src/App.js content with this file
 *   3. npm start
 *
 *   — or paste directly into https://codesandbox.io (React template)
 */

import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const STOPS = [
  {
    id: "P1",
    label: "Halte P1",
    title: "Propedeuse",
    subtitle: "Jaar 1 — Ontdekken & Fundament",
    color: "#FF6B35",
    accent: "#FF8C5A",
    icon: "🎨",
    year: "Jaar 1",
    content: {
      tagline: "Je stapt in. De reis begint — breed, gestructureerd en vol ontdekking.",
      description:
        "In het propedeusejaar maak je kennis met alle competenties van CMD in een breed en gestructureerd programma. Je leert betekenisvolle digitale producten ontwerpen met tekst, beeld, video en geluid. Leren doe je door te doen: je werkt aan opdrachten voor échte opdrachtgevers en bouwt zo meteen aan je portfolio. Je maakt deel uit van een community van medestudenten en docenten.",
      subjects: [
        { name: "Visual Design", desc: "Typografie, kleur, compositie — de basisgrammatica van design." },
        { name: "Film & Motion Design", desc: "Videobeelden, animatie en bewegend beeld als communicatiemiddel." },
        { name: "Interactive Design", desc: "Klikbare prototypes, gebruikerservaring en interactie." },
        { name: "Game Development", desc: "Spelontwerp en digitale interactieve omgevingen." },
        { name: "Design Challenges", desc: "Real-life vraagstukken uit de praktijk, samen met medestudenten opgelost." },
        { name: "Community & Portfolio", desc: "Samen werken, elkaars werk bespreken en expo's organiseren." },
      ],
      outcome: "Behaal je propedeuse en verdien je ticket voor de hoofdfase.",
      seats: "Volle bus — iedereen start hier, breed en samen.",
    },
  },
  {
    id: "P2",
    label: "Halte P2",
    title: "Hoofdfase — Verdieping",
    subtitle: "Jaar 2 — Specialiseren & Studio's",
    color: "#6C63FF",
    accent: "#9B95FF",
    icon: "🧠",
    year: "Jaar 2",
    content: {
      tagline: "De bus rijdt door. Jij kiest je eigen route.",
      description:
        "Vanaf jaar 2 kies jij zelf welke studio's je volgt en aan welke competenties je werkt. Het onderwijs is vraaggestuurd: de leercontext wordt aangeleverd door de praktijk. Per semester kies je een minor van 30 EC. Je werkt zelfstandig én in multidisciplinaire projectteams en bouwt verder aan je portfolio met echte klantprojecten.",
      subjects: [
        { name: "Zelfgekozen Studio's", desc: "Bijv. Visual Design, Film & Motion, Interactive Design of Game Development." },
        { name: "Minor (30 EC per semester)", desc: "Jij kiest welke competenties je dat semester verder ontwikkelt." },
        { name: "Klantprojecten", desc: "Opdrachten voor échte opdrachtgevers — recht in je portfolio." },
        { name: "Onderzoek & Reflectie", desc: "Praktijkgericht onderzoek en kritisch terugkijken op je eigen werk." },
        { name: "Persoonlijke Profilering", desc: "T-shaped skills: brede basis + eigen specialisatie bouwen." },
        { name: "Community-events", desc: "Excursies, broedplaatsen voor ondernemerschap, expo's voor en door studenten." },
      ],
      outcome: "Een groeiend portfolio en een duidelijker beeld van jouw designidentiteit.",
      seats: "Je ontdekt wie er naast je zit — strategen, makers, onderzoekers.",
    },
  },
  {
    id: "P3",
    label: "Halte P3",
    title: "Stage + Minor",
    subtitle: "Jaar 3 — Uitstappen & Verbreden",
    color: "#00C9A7",
    accent: "#00E5BF",
    icon: "🌍",
    year: "Jaar 3",
    content: {
      tagline: "De bus stopt. Jij ontdekt de wereld buiten de school.",
      description:
        "Jaar 3 draait om stage en verbreding. Je loopt vijf maanden stage in binnen- of buitenland — jij kiest zelf een plek die past bij jouw ambities. Daarna verbreed je je horizon met een minor: van exchange bij een partnerinstelling in Europa tot de Grand Tour in Zuid-Afrika, Bali of Thailand. Er zijn meer dan 100 minors beschikbaar via NHL Stenden.",
      subjects: [
        { name: "Stage (5 maanden, 30 EC)", desc: "Werken bij een bedrijf in binnen- of buitenland — alvast proeven aan je carrière." },
        { name: "Exchange Minor", desc: "Studeren bij een Europese partnerinstelling via RUN-EU." },
        { name: "Grand Tour", desc: "Minor in Zuid-Afrika, Bali of Bangkok (Design Asia)." },
        { name: "Kies op Maat / NHL Stenden minors", desc: "Bijv. Concept Academy, Design for Impact of Entrepreneurship: Business Design." },
        { name: "Internationalisering", desc: "Interculturele vaardigheden en een globaal netwerk opbouwen." },
        { name: "Ondernemerschap", desc: "Broedplaatsen voor freelance en eigen initiatieven vanuit de CMD-community." },
      ],
      outcome: "Vijf maanden praktijkervaring én een verbreding die jouw profiel scherpt.",
      seats: "Sommige reizigers stappen over. Nieuwe passagiers instappen vanuit het werkveld.",
    },
  },
  {
    id: "P4",
    label: "Halte P4",
    title: "Afstuderen",
    subtitle: "Jaar 4 — Jij rijdt de bus",
    color: "#FFD166",
    accent: "#FFE08A",
    icon: "🎓",
    year: "Jaar 4",
    content: {
      tagline: "Jouw stijl, jouw product, jouw toekomst.",
      description:
        "Het vierde jaar staat in het teken van voorbereiding op je afstuderen en het afstuderen zelf. Bij CMD bepaal jij hoe jouw afstudeerproject eruitziet: binnen een bedrijf of een eigen project — alles kan. De afstudeerfase duurt vijf maanden. Je ontwikkelt een product op hbo-niveau waarmee je aantoont dat je zelfstandig als ontwerper kunt denken en werken.",
      subjects: [
        { name: "Voorbereiding afstuderen", desc: "Onderzoeksvaardigheden verdiepen en je afstudeeropdracht uitwerken." },
        { name: "Afstudeerproject (5 maanden)", desc: "Eigen product ontwikkelen: binnen een bedrijf of als zelfstandig project." },
        { name: "Hbo-bachelor niveau aantonen", desc: "Je toont aan dat je op hbo-niveau denkt, werkt en reflecteert." },
        { name: "Eindpresentatie & Expo", desc: "Presenteer je werk aan de buitenwereld op de CMD-afstudeershow." },
        { name: "Carrièrestart", desc: "Veel studenten gebruiken hun stageplek als springplank naar een vaste baan." },
        { name: "Vervolgmogelijkheden", desc: "Master Serious Gaming, Design Driven Innovation of Health Innovation." },
      ],
      outcome: "Bachelor of Communication & Multimedia Design — opgeleid tot eigenwijze multimediaspecialist.",
      seats: "Eindhalte. Je stapt hier uit als professional.",
    },
  },
];

const ROAD_POSITIONS = [9, 33, 58, 82]; // % across the road

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CMDBusRide() {
  const [busPos, setBusPos] = useState(5);
  const [activeStop, setActiveStop] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [riding, setRiding] = useState(false);
  const [arrivedAt, setArrivedAt] = useState(null);
  const animRef = useRef(null);
  const startRef = useRef(null);
  const busPosRef = useRef(5);

  const animateBusTo = (targetPct, onDone) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const startPct = busPosRef.current;
    const duration = Math.abs(targetPct - startPct) * 16 + 350;
    startRef.current = null;
    setRiding(true);

    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(elapsed / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const current = startPct + (targetPct - startPct) * ease;
      busPosRef.current = current;
      setBusPos(current);
      if (t < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        busPosRef.current = targetPct;
        setBusPos(targetPct);
        setRiding(false);
        if (onDone) onDone();
      }
    };
    animRef.current = requestAnimationFrame(step);
  };

  const handleStopClick = (stop, idx) => {
    if (riding) return;
    const target = ROAD_POSITIONS[idx];
    animateBusTo(target, () => {
      setArrivedAt(stop.id);
      setActiveStop(stop);
      setModalOpen(true);
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setActiveStop(null), 300);
  };

  const handleNext = (nextStop, nextIdx) => {
    closeModal();
    setTimeout(() => handleStopClick(nextStop, nextIdx), 320);
  };

  return (
    <div style={styles.page}>
      <style>{globalCSS}</style>

      {/* Starfield */}
      <div style={styles.starField} aria-hidden="true">
        {Array.from({ length: 38 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: i % 5 === 0 ? 3 : 2,
              height: i % 5 === 0 ? 3 : 2,
              borderRadius: "50%",
              background: `rgba(255,255,255,${0.25 + (i % 4) * 0.14})`,
              left: `${(i * 43 + 7) % 100}%`,
              top: `${(i * 31 + 5) % 55}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div style={styles.header}>
        <span style={styles.headerTag}>NHL Stenden Hogeschool · Leeuwarden</span>
        <h1 style={styles.title}>
          Communication &amp;<br />Multimedia Design
        </h1>
        <p style={styles.subtitle}>Jij bepaalt wat je leert — klik een bushalte om in te stappen</p>
      </div>

      {/* Road Scene */}
      <div style={styles.roadScene}>
        {/* City silhouette */}
        <div style={styles.cityLine} aria-hidden="true">
          {[60, 88, 44, 72, 108, 52, 82, 38, 68, 92, 62, 48].map((h, i) => (
            <div
              key={i}
              style={{
                width: i % 3 === 0 ? 36 : 26,
                height: h,
                background: `rgba(255,255,255,${0.03 + (i % 4) * 0.013})`,
                borderRadius: "3px 3px 0 0",
                flexShrink: 0,
                position: "relative",
              }}
            >
              {h > 60 && (
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "rgba(255,220,120,0.35)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Road */}
        <div style={styles.road}>
          {/* Centre dashes */}
          <div style={styles.roadDashTrack}>
            <div className="road-dash-row">
              {Array.from({ length: 22 }).map((_, i) => (
                <span key={i} className="road-dash" />
              ))}
            </div>
          </div>

          {/* Bus stops */}
          {STOPS.map((stop, idx) => (
            <button
              key={stop.id}
              className={`stop-btn${arrivedAt === stop.id ? " arrived" : ""}`}
              style={{ left: `${ROAD_POSITIONS[idx]}%` }}
              onClick={() => handleStopClick(stop, idx)}
              aria-label={`Ga naar ${stop.title}`}
              disabled={riding}
            >
              <div className="stop-sign" style={{ background: stop.color }}>
                {stop.id}
              </div>
              <div className="stop-pole" />
              <span className="stop-label">{stop.label}</span>
            </button>
          ))}

          {/* The Bus */}
          <div
            style={{
              position: "absolute",
              bottom: 10,
              left: `calc(${busPos}% - 54px)`,
              zIndex: 20,
            }}
          >
            <BusSVG riding={riding} />
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={styles.stopNav}>
        {STOPS.map((stop, idx) => (
          <button
            key={stop.id}
            className="snbtn"
            style={{
              borderColor: arrivedAt === stop.id ? stop.color : "rgba(0,80,50,0.2)",
              color: arrivedAt === stop.id ? "#033d25" : "rgba(0,50,30,0.6)",
              background: arrivedAt === stop.id ? "rgba(0,80,50,0.15)" : "rgba(0,80,50,0.07)",
            }}
            onClick={() => handleStopClick(stop, idx)}
            disabled={riding}
          >
            <span style={{ fontSize: 17 }}>{stop.icon}</span>
            <span style={{ fontSize: 11, fontWeight: 500 }}>{stop.title}</span>
            <span style={{ fontSize: 10, opacity: 0.55 }}>{stop.year}</span>
          </button>
        ))}
      </div>

      {/* Riding badge */}
      {riding && <div style={styles.ridingBadge}>🚌 &nbsp;Volgende halte…</div>}

      {/* Modal */}
      {modalOpen && activeStop && (
        <StopModal
          stop={activeStop}
          allStops={STOPS}
          onClose={closeModal}
          onNavigate={handleNext}
        />
      )}
    </div>
  );
}

// ─── Bus SVG ──────────────────────────────────────────────────────────────────

function BusSVG({ riding }) {
  return (
    <svg
      width="108"
      height="58"
      viewBox="0 0 108 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: riding ? "drop-shadow(0 0 10px rgba(255,200,100,0.5))" : "none", transition: "filter 0.3s" }}
    >
      {/* Body */}
      <rect x="4" y="10" width="96" height="36" rx="7" fill="#1A2744" />
      <rect x="4" y="10" width="96" height="36" rx="7" stroke="#3B4F7A" strokeWidth="1.5" />
      {/* Front */}
      <path d="M97 16 Q107 18 107 28 Q107 37 97 39 L97 16Z" fill="#1A2744" stroke="#3B4F7A" strokeWidth="1.5" />
      {/* Roof stripe */}
      <rect x="4" y="10" width="96" height="9" rx="7" fill="#FF6B35" opacity="0.8" />
      <rect x="4" y="17" width="96" height="2" fill="#FF6B35" opacity="0.35" />

      {/* Windows */}
      {[17, 35, 52, 68].map((x, i) => (
        <rect
          key={i}
          x={x} y="19" width="13" height="10" rx="2"
          fill="#A8D8FF" opacity="0.7"
          style={{ animation: `wink 3s ${i * 0.4}s ease-in-out infinite` }}
        />
      ))}
      {/* Windshield */}
      <rect x="93" y="17" width="10" height="13" rx="2" fill="#A8D8FF" opacity="0.55" />
      {/* Door */}
      <rect x="7" y="21" width="7" height="15" rx="2" fill="#0D1830" stroke="#3B4F7A" strokeWidth="0.8" />
      <line x1="10.5" y1="21" x2="10.5" y2="36" stroke="#3B4F7A" strokeWidth="0.8" />
      {/* Undercarriage */}
      <rect x="8" y="43" width="92" height="5" rx="2" fill="#0D1830" />
      {/* Wheels */}
      <circle cx="24" cy="50" r="7" fill="#1A2744" stroke="#4A5F8A" strokeWidth="2" />
      <circle cx="24" cy="50" r="3" fill="#3B4F7A" />
      <circle cx="82" cy="50" r="7" fill="#1A2744" stroke="#4A5F8A" strokeWidth="2" />
      <circle cx="82" cy="50" r="3" fill="#3B4F7A" />
      {/* Headlight */}
      <ellipse cx="105" cy="27" rx="3" ry="4" fill="#FFE566" opacity={riding ? 1 : 0.5} />
      {/* Exhaust */}
      {riding && (
        <>
          <circle cx="3" cy="43" r="5" fill="rgba(200,200,200,0.2)" />
          <circle cx="-3" cy="40" r="3" fill="rgba(200,200,200,0.12)" />
        </>
      )}
    </svg>
  );
}

// ─── Stop Modal ───────────────────────────────────────────────────────────────

function StopModal({ stop, allStops, onClose, onNavigate }) {
  const currentIdx = allStops.findIndex((s) => s.id === stop.id);
  const nextStop = allStops[currentIdx + 1];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: 20 }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: `${stop.color}22`, border: `1px solid ${stop.color}44`,
                  borderRadius: 7, padding: "3px 10px", marginBottom: 8,
                  fontSize: 11, fontWeight: 700, fontFamily: "'Syne', sans-serif",
                  letterSpacing: "0.07em", textTransform: "uppercase",
                }}
              >
                <span style={{ fontSize: 15 }}>{stop.icon}</span>
                <span style={{ color: stop.accent }}>{stop.id} — {stop.year}</span>
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.1 }}>
                {stop.title}
              </h2>
              <p style={{ fontSize: 13, color: stop.accent, fontFamily: "'Space Grotesk', sans-serif", marginTop: 3 }}>
                {stop.subtitle}
              </p>
            </div>
            <button className="close-x" onClick={onClose} aria-label="Sluiten">×</button>
          </div>

          {/* Quote */}
          <div style={{ background: `${stop.color}15`, borderLeft: `3px solid ${stop.color}`, borderRadius: "0 9px 9px 0", padding: "10px 14px", marginBottom: 16 }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontStyle: "italic", fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
              "{stop.content.tagline}"
            </p>
          </div>

          {/* Description */}
          <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
            {stop.content.description}
          </p>

          {/* Subjects */}
          <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>
            Wat staat er op de route
          </p>
          <div style={{ marginBottom: 16 }}>
            {stop.content.subjects.map((s, i) => (
              <div key={i} className="subj-row">
                <div
                  style={{
                    width: 24, height: 24, borderRadius: 5, flexShrink: 0,
                    background: `${stop.color}25`, border: `1px solid ${stop.color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, color: stop.accent,
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 1 }}>{s.name}</p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Outcome */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Bestemming</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{stop.content.outcome}</p>
          </div>

          {/* Seats note */}
          <p style={{ fontSize: 11, fontStyle: "italic", color: "rgba(255,255,255,0.28)", marginBottom: 16 }}>
            🚌 {stop.content.seats}
          </p>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button className="back-btn" onClick={onClose}>← Terug naar de weg</button>
            {nextStop ? (
              <button
                className="next-btn"
                onClick={() => onNavigate(nextStop, currentIdx + 1)}
              >
                Volgende halte: {nextStop.title} →
              </button>
            ) : (
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: stop.accent }}>
                🎓 Eindhalte. Goed gereden.
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #7DFFF9, #00A36C)",
    fontFamily: "'Space Grotesk', sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  starField: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
  },
  header: {
    textAlign: "center",
    padding: "48px 24px 20px",
    position: "relative",
    zIndex: 5,
  },
  headerTag: {
    display: "inline-block",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 10,
    fontWeight: 500,
    color: "rgba(0,80,50,0.9)",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 10,
    background: "rgba(0,163,108,0.15)",
    border: "1px solid rgba(0,163,108,0.4)",
    borderRadius: 6,
    padding: "3px 10px",
  },
  title: {
    fontFamily: "'Syne', sans-serif",
    fontSize: "clamp(24px,4.5vw,44px)",
    fontWeight: 800,
    color: "#033d25",
    lineHeight: 1.1,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(0,60,40,0.65)",
    fontWeight: 400,
  },
  roadScene: {
    position: "relative",
    height: 200,
  },
  cityLine: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "flex-end",
    gap: 3,
    paddingLeft: 10,
    pointerEvents: "none",
    zIndex: 1,
  },
  road: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    background: "#4b4b50",
    borderTop: "3px solid rgba(0,60,40,0.25)",
    zIndex: 2,
  },
  roadDashTrack: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    transform: "translateY(-50%)",
    height: 4,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
  stopNav: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    padding: "14px 16px 32px",
    flexWrap: "wrap",
    position: "relative",
    zIndex: 5,
  },
  ridingBadge: {
    position: "fixed",
    top: 18,
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(255,107,53,0.92)",
    color: "#fff",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    padding: "7px 20px",
    borderRadius: 20,
    zIndex: 300,
    whiteSpace: "nowrap",
  },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes wink    { 0%,100%{opacity:.9} 50%{opacity:.55} }
  @keyframes roadAnim{ from{transform:translateX(0)} to{transform:translateX(-56px)} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

  .road-dash-row {
    display: flex;
    align-items: center;
    animation: roadAnim 0.5s linear infinite;
    white-space: nowrap;
  }
  .road-dash {
    display: inline-block;
    width: 28px;
    height: 4px;
    background: rgba(255,255,255,0.5);
    border-radius: 2px;
    margin-right: 20px;
    flex-shrink: 0;
  }

  .stop-btn {
    position: absolute;
    bottom: 55px;
    transform: translateX(-50%);
    z-index: 10;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 0;
    transition: transform 0.2s;
  }
  .stop-btn:hover { transform: translateX(-50%) translateY(-4px); }
  .stop-btn:disabled { cursor: not-allowed; opacity: 0.6; }

  .stop-sign {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    border: 2px solid rgba(255,255,255,0.25);
    color: #fff;
    transition: box-shadow 0.2s, border-color 0.2s;
  }
  .stop-btn:hover .stop-sign {
    border-color: rgba(255,255,255,0.75);
    box-shadow: 0 0 12px rgba(255,255,255,0.2);
  }
  .arrived .stop-sign {
    border-color: #fff !important;
    box-shadow: 0 0 16px rgba(255,255,255,0.35) !important;
  }
  .stop-pole {
    width: 3px;
    height: 38px;
    background: rgba(0,60,40,0.35);
    border-radius: 2px;
  }
  .stop-label {
    font-size: 9px;
    font-family: 'Space Grotesk', sans-serif;
    color: rgba(0,50,30,0.6);
    text-transform: uppercase;
    letter-spacing: 0.07em;
    white-space: nowrap;
  }

  .snbtn {
    background: rgba(0,80,50,0.07);
    border: 1px solid;
    border-radius: 10px;
    padding: 8px 12px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    min-width: 80px;
    transition: background 0.2s;
    font-family: 'Space Grotesk', sans-serif;
  }
  .snbtn:hover { background: rgba(0,80,50,0.14); }
  .snbtn:disabled { cursor: not-allowed; opacity: 0.5; }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5,8,20,0.88);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 16px;
    animation: fadeIn 0.22s ease;
  }
  .modal-box {
    background: #0e1528;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 18px;
    width: 100%;
    max-width: 520px;
    max-height: 88vh;
    overflow-y: auto;
    animation: slideUp 0.28s cubic-bezier(0.22,1,0.36,1);
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.12) transparent;
  }
  .modal-box::-webkit-scrollbar { width: 3px; }
  .modal-box::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }

  .subj-row {
    display: flex;
    gap: 10px;
    padding: 9px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .subj-row:last-child { border-bottom: none; }

  .close-x {
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 9px;
    color: rgba(255,255,255,0.65);
    cursor: pointer;
    width: 32px;
    height: 32px;
    font-size: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.15s;
  }
  .close-x:hover { background: rgba(255,255,255,0.14); color: #fff; }

  .back-btn {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 9px;
    color: rgba(255,255,255,0.6);
    cursor: pointer;
    padding: 7px 14px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 500;
    transition: background 0.15s;
  }
  .back-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

  .next-btn {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: rgba(255,255,255,0.75);
    cursor: pointer;
    padding: 8px 16px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 500;
    transition: background 0.15s, color 0.15s;
  }
  .next-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }
`;