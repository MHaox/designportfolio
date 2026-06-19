import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Terminal, Activity, Layers, Target, Code, Cpu, ArrowRight,
  X, ChevronLeft, ChevronRight, ExternalLink
} from 'lucide-react';

// =============================================================================
// GLOBAL SYSTEM STYLES (scanlines, grain, terminal cursor, type)
// =============================================================================
const SYSTEM_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');

  .portfolio-root a { color: #0000EE; text-decoration: underline; cursor: text; }
  .portfolio-root a:visited { color: #551A8B; }
  .portfolio-root ul { list-style-type: disc; margin: 1em 0; padding-left: 2.5em; }
  .portfolio-root p { margin: 1em 0; line-height: 1.4; }
  .portfolio-root h1, .portfolio-root h2, .portfolio-root h3 { font-weight: bold; margin: 0; }
  .portfolio-root hr { border: none; border-top: 1px solid #000; margin: 1.5em 0; }

  .sys-zone {
    font-family: 'IBM Plex Mono', monospace;
    cursor: none;
  }
  .sys-zone * { cursor: none; }

  /* ambient scanline + grain texture, only ever inside an active system panel */
  .sys-texture {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 30;
    mix-blend-mode: overlay;
    opacity: 0.5;
    background-image:
      repeating-linear-gradient(
        0deg,
        rgba(255,255,255,0.06) 0px,
        rgba(255,255,255,0.06) 1px,
        transparent 1px,
        transparent 3px
      );
  }
  .sys-texture::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%);
  }

  /* the bright sweep line that "prints" the panel into existence */
  .sys-scanbar {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #C6F91F 15%, #ffffff 50%, #C6F91F 85%, transparent);
    box-shadow: 0 0 12px 2px rgba(198,249,31,0.8), 0 0 40px 8px rgba(198,249,31,0.25);
    z-index: 40;
    pointer-events: none;
    opacity: 0;
  }

  /* terminal block cursor that follows the mouse inside a system zone */
  .sys-cursor {
    position: fixed;
    width: 9px;
    height: 16px;
    background: #C6F91F;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    mix-blend-mode: difference;
    transform: translate(-1px, -2px);
  }

  .flicker-init {
    animation: sysFlicker 0.32s steps(2, jump-none);
  }
  @keyframes sysFlicker {
    0% { opacity: 0; }
    15% { opacity: 0.9; }
    30% { opacity: 0.1; }
    45% { opacity: 1; }
    60% { opacity: 0.3; }
    100% { opacity: 1; }
  }

  .sys-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    letter-spacing: 0.12em;
    padding: 2px 8px;
    border: 1px solid rgba(198,249,31,0.4);
    color: #C6F91F;
  }
  .sys-chip::before {
    content: '';
    width: 5px;
    height: 5px;
    background: #C6F91F;
    box-shadow: 0 0 6px #C6F91F;
    border-radius: 50%;
  }
`;

export default function PortfolioV4() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedProject) {
      setActiveImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedProject) {
      setActiveImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  const featuredProjects = [
    {
      id: "aethol",
      title: "AETHOL Digital Platform",
      category: "Web Development",
      images: ["https://i.imgur.com/8abgjpQ.jpeg"],
      description: "A digital agency identity merging mythology with high-end interaction.",
      fullDescription: "Aethol serves as my professional creative development studio. The project focuses on the concept of 'Directing the Digital Currents,' using the Greek god Aeolus as a metaphor for the intersection of Software Engineering and Interaction Design. I developed a custom SVG design system and a motion-heavy platform using Next.js and GSAP. The goal was to create a 'low-friction' user experience that feels like a natural breeze, utilizing scroll-triggered animations and glassmorphism to establish a premium, authoritative brand presence in the tech space.",
      technologies: ["Next.js", "GSAP", "SVG Animation", "Vercel", "Tailwind CSS"],
      link: "https://aethol.nl",
      accent: "#C6F91F",
      status: "LIVE"
    },
    {
      id: "sil",
      title: "Social Innovation Lab Branding",
      category: "School Project",
      images: ["https://i.imgur.com/yCKgXSU.png", "https://i.imgur.com/eeKNshB.jpeg", "https://i.imgur.com/fwv3xjD.jpeg", "https://i.imgur.com/rM59R9R.png"],
      description: "Variable identity systems and mascot designs treating the lab itself as the primary stakeholder client.",
      fullDescription: "A comprehensive branding project focused on developing a variable visual identity and mascot, 'Sil,' for an NHL Stenden community lab. A critical component of this project was directing the design focus toward the lab itself as the primary client, ensuring the visual language effectively serves its community-facing goals.",
      technologies: ["React", "Figma", "Tailwind CSS", "Brand Strategy"],
      link: "/sil",
      accent: "#FF8A3D",
      status: "ARCHIVED"
    },
    {
      id: "resource-hub",
      title: "CMD Resource Hub",
      category: "School Project",
      images: ["https://i.imgur.com/IwZNbYT.png"],
      description: "A centralized, interactive toolkit for CMD students.",
      fullDescription: "I transformed a static HTML resource list into a high-performance React application designed for CMD students. The project involved implementing advanced features such as a real-time fuzzy search engine, category filtering, and a 'Quick Search' platform bar. To enhance the user experience, I integrated local storage persistence for a 'Favorites' system and a custom dark mode toggle. I also implemented keyboard shortcuts (like '/' to search) to cater to power users, creating a seamless, accessible tool that helps students navigate school platforms and design tools efficiently.",
      technologies: ["React", "Local Storage", "UX Design", "CSS Variables", "State Management"],
      link: "/resource-hub",
      accent: "#B07CFF",
      status: "LIVE"
    },
    {
      id: "spectra",
      title: "Team Spectra Hub",
      category: "Collaborative Project",
      images: ["https://i.imgur.com/V9RtU0e.png"],
      description: "Digital platform mapping cross-functional team execution and collaborative workflows.",
      fullDescription: "A dedicated space highlighting academic projects and design challenges tackled alongside my team colleagues. This highlights cross-functional teamwork, task division, and collaborative problem-solving within a student design collective. The focus was on pushing past our comfort zones and learning new disciplines under tight constraints.",
      technologies: ["React", "GSAP", "Tailwind CSS", "ScrollTrigger"],
      link: "/spectra",
      accent: "#3DDC9A",
      status: "LIVE"
    }
  ];

  const archiveProjects = [
    {
      id: "jaro",
      title: "Jaro Gevel Techniek",
      category: "Web Development",
      images: ["https://i.imgur.com/kRAkYWE.png"],
      description: "Full corporate website redesign and front-end development implementation.",
      fullDescription: "I made a full redesign of the Jaro Gevel Techniek website to improve user experience and modernize the look and feel. The project included a complete overhaul of the site's layout, color scheme, and functionality to better serve the client's needs and attract more visitors.",
      technologies: ["WordPress", "Elementor", "Brand Strategy", "Visual Identity"],
      link: "https://jarogeveltechniek.nl/",
      accent: "#9A9A9A",
      status: "LIVE"
    },
    {
      id: "pressure",
      title: "Pressure Cooker Challenge",
      category: "School Project",
      images: ["https://i.imgur.com/8sUASmx.png"],
      description: "Rapid high-pressure iteration creating client deliverables within a strict one-week constraint.",
      fullDescription: "For the Pressure Cooker Challenge, I had to work under tight deadlines to create a design for a client. This project tested my ability to manage time effectively, prioritize tasks, and deliver high-quality work within a limited timeframe of 1 week. Despite the pressure, I successfully completed the project by staying focused and organized.",
      technologies: ["React", "Illustrator", "Client Facing", "Visual Identity"],
      link: "/pressure-cooker",
      accent: "#FF5C7A",
      status: "ARCHIVED"
    },
    {
      id: "sandbox",
      title: "Test Study Sandbox",
      category: "Personal Growth",
      images: ["https://i.imgur.com/2Kiz1Kb.png"],
      description: "Experimental framework isolated for engineering diagnostics, library prototyping, and UI testing.",
      fullDescription: "An experimental environment dedicated to testing new libraries, interactive UI elements, and unorthodox design layouts. This sandbox allows for technical troubleshooting and refinement before integrating complex features into production-ready builds.",
      technologies: ["React", "Experimental UI", "Testing", "Troubleshooting"],
      link: "/teststudy",
      accent: "#9A9A9A",
      status: "DIAGNOSTIC"
    },
    {
      id: "museum",
      title: "Museum Pop-up",
      category: "School Project",
      images: ["https://i.imgur.com/iFoVtJw.jpeg"],
      description: "Interactive museum installation designed to engage visitors through immersive features.",
      fullDescription: "For this project, we designed an interactive museum installation for a pop-up museum at our school. The installation aimed to engage visitors through immersive design elements and interactive features. We focused on creating a user-friendly experience that would captivate the audience and encourage exploration of the exhibits.",
      technologies: ["Figma", "Illustrator", "Scrum", "Prototyping"],
      link: "https://docs.google.com/document/d/1c9jAP73toWUDVamuIbWXa8u3nDEAXsidm-OFxHUFHH0/edit?usp=sharing",
      accent: "#FFD23D",
      status: "ARCHIVED"
    },
    {
      id: "cardgame",
      title: "Card Game Design",
      category: "School Project",
      images: ["https://i.imgur.com/Jj7cQPa.jpeg"],
      description: "Social drinking card game concept built from initial brainstorming to active prototype testing.",
      fullDescription: "I sat down with a team for the game design project and we came up with a card drinking game concept. We focused on creating engaging gameplay mechanics and visually appealing card designs. After developing the initial prototype, we conducted user testing sessions to gather feedback and make necessary improvements to enhance the overall gaming experience.",
      technologies: ["Illustrator", "Brainstorming", "User Testing", "Prototyping"],
      link: "https://docs.google.com/document/d/11xZbyt4hDQ9EWp3V4skDMaGHaZdChOBW0PeOobxfTLQ/edit?usp=sharing",
      accent: "#FFB23D",
      status: "ARCHIVED"
    },
    {
      id: "illustrator",
      title: "Learning Illustrator",
      category: "Personal Growth",
      images: ["https://i.imgur.com/VIGiifl.jpeg", "https://i.imgur.com/zsLluxV.jpeg", "https://i.imgur.com/8abgjpQ.jpeg"],
      description: "Structured self-improvement track to achieve high-fidelity vector graphics proficiency.",
      fullDescription: "To enhance my design skills, I created a structured learning plan to improve in Adobe Illustrator. This involved following tutorials, practicing various design techniques, and completing projects to apply what I learned. The goal was to become proficient in using Illustrator for creating vector graphics and illustrations.",
      technologies: ["Illustrator", "Learning Track", "Vector Engineering", "Self-Improvement"],
      link: "https://docs.google.com/document/d/11xZbyt4hDQ9EWp3V4skDMaGHaZdChOBW0PeOobxfTLQ/edit?usp=sharing",
      accent: "#7CFF7C",
      status: "ONGOING"
    }
  ];

  return (
    <div
      className="portfolio-root"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#ffffff',
        fontFamily: 'Times New Roman, Times, serif',
        color: '#000000',
        fontSize: '16px',
        lineHeight: 'normal',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      <style>{SYSTEM_STYLES}</style>
      <TerminalCursor />

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 16px 80px' }}>

        <TransmuteBlock
          intensity="header"
          modernUI={
            <SystemPanel accent="#C6F91F" tag="BOOT // IDENTITY">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight modern-element">
                    M.R._HOOGEWEG
                  </h1>
                  <p className="mt-2 text-xs tracking-[0.2em] modern-element" style={{ color: '#C6F91F' }}>
                    ROLE: SYS.ARCHITECT // SCRUM.MASTER
                  </p>
                </div>
                <Terminal className="modern-element opacity-40" size={28} color="#C6F91F" />
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex gap-4 modern-element">
                <span className="sys-chip">SESSION ACTIVE</span>
                <span className="text-[10px] text-zinc-500 self-center">UPTIME: 02:41:18</span>
              </div>
            </SystemPanel>
          }
        >
          <header style={{ padding: '10px 0' }}>
            <h1 style={{ fontSize: '28px' }}>Max Robert Hoogeweg</h1>
            <p>Growth Portfolio — Index &amp; Methodology</p>
          </header>
        </TransmuteBlock>

        <hr />

        <TransmuteBlock
          intensity="standard"
          modernUI={
            <SystemPanel accent="#C6F91F" tag="LOG // TRANSLATION_LAYER">
              <div className="flex items-center gap-3 mb-4 modern-element">
                <Activity size={16} color="#C6F91F" />
                <h2 className="text-sm font-bold text-white tracking-widest uppercase">Translation Layer</h2>
              </div>
              <p className="text-[13px] text-zinc-400 leading-relaxed modern-element">
                Specializing in bridging the critical gap between technical development constraints and overarching business requirements. Operating as a translation node within Agile environments to facilitate cross-functional execution.
              </p>
            </SystemPanel>
          }
        >
          <section style={{ padding: '10px 0' }}>
            <h2 style={{ fontSize: '19px', margin: '1.2em 0 0.4em' }}>01. Abstract &amp; Objective</h2>
            <p>
              This document serves as an objective summary of my academic growth and professional transition. The overarching objective is the alignment of technical development constraints with business requirements, targeting a specialization as a Scrum Master within Agile environments.
            </p>
          </section>
        </TransmuteBlock>

        <hr />

        <TransmuteBlock
          intensity="standard"
          modernUI={
            <SystemPanel accent="#C6F91F" tag="REG // STACK_DUMP">
              <h2 className="text-sm font-bold text-white mb-4 tracking-widest uppercase modern-element">Tech Stack &amp; Methodology</h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Code, text: "React & State" },
                  { icon: Layers, text: "GSAP Motion" },
                  { icon: Cpu, text: "Agile / Scrum" },
                  { icon: Target, text: "Atomic Design" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/5 px-3 py-2 modern-element border border-white/10">
                    <item.icon color="#C6F91F" size={14} />
                    <span className="text-[11px] text-zinc-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </SystemPanel>
          }
        >
          <section style={{ padding: '10px 0' }}>
            <h2 style={{ fontSize: '19px', margin: '1.2em 0 0.4em' }}>02. Technical &amp; Process Competencies</h2>
            <ul>
              <li>React Ecosystem, GSAP Motion & Component Architecture</li>
              <li>Agile / Scrum Frameworks & Cross-functional Task Division</li>
            </ul>
          </section>
        </TransmuteBlock>

        <hr />
        <h2 style={{ fontSize: '19px', margin: '1.2em 0 1em' }}>03. Featured Index</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {featuredProjects.map((project, index) => (
            <TransmuteBlock
              key={project.id}
              intensity="standard"
              modernUI={
                <SystemPanel accent={project.accent} tag={`NODE_${String(index + 1).padStart(2, '0')} // ${project.category.toUpperCase()}`}>
                  <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="modern-element shrink-0 w-full sm:w-32 h-32 sm:h-auto relative overflow-hidden border" style={{ borderColor: `${project.accent}40` }}>
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale contrast-125 brightness-75"
                        loading="lazy"
                      />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 60%, ${project.accent}26 100%)` }} />
                      <div className="absolute bottom-1 left-1 text-[8px] tracking-widest px-1" style={{ color: project.accent, background: '#000000B3' }}>
                        IMG_{String(index + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2 modern-element">
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {project.title}
                        </h3>
                        <span className="sys-chip shrink-0 ml-2" style={{ borderColor: `${project.accent}66`, color: project.accent }}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-[13px] text-zinc-400 leading-relaxed mb-5 modern-element">
                        {project.description}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                          setActiveImageIndex(0);
                        }}
                        className="flex items-center justify-between w-full md:w-auto gap-4 px-4 py-2.5 font-bold text-xs modern-element transition-colors"
                        style={{ background: project.accent, color: '#000' }}
                      >
                        <span>OPEN_RECORD</span> <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </SystemPanel>
              }
            >
              <section style={{ padding: '8px 0' }}>
                <h3 style={{ fontSize: '16px', margin: '0 0 0.2em' }}>{project.title}</h3>
                <p style={{ fontStyle: 'italic', margin: '0 0 0.4em', fontSize: '14px', color: '#444' }}>Category: {project.category}</p>
                <p>{project.description}</p>
                <p>
                  <button
                    onClick={(e) => { e.preventDefault(); setSelectedProject(project); setActiveImageIndex(0); }}
                    style={{ background: 'none', border: 'none', padding: 0, color: '#0000EE', textDecoration: 'underline', cursor: 'pointer', font: 'inherit' }}
                  >
                    View_Documentation.html
                  </button>
                </p>
              </section>
            </TransmuteBlock>
          ))}
        </div>

        <hr />
        <h2 style={{ fontSize: '19px', margin: '1.2em 0 1em' }}>04. Archive / Additional Executions</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {archiveProjects.map((project) => (
            <TransmuteBlock
              key={project.id}
              intensity="compact"
              modernUI={
                <SystemPanel accent={project.accent} tag={project.category.toUpperCase()} compact>
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                      setActiveImageIndex(0);
                    }}
                  >
                    <div className="modern-element shrink-0 w-10 h-10 overflow-hidden border" style={{ borderColor: `${project.accent}40` }}>
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale contrast-125 brightness-75"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-sm font-bold text-white modern-element flex-1 min-w-0 truncate">
                      {project.title}
                    </h3>
                    <ArrowRight className="modern-element shrink-0" size={16} color={project.accent} />
                  </div>
                </SystemPanel>
              }
            >
              <div style={{ padding: '6px 0', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px' }}>↳</span>
                <button
                  onClick={(e) => { e.preventDefault(); setSelectedProject(project); setActiveImageIndex(0); }}
                  style={{ background: 'none', border: 'none', padding: 0, color: '#0000EE', textDecoration: 'underline', cursor: 'pointer', font: 'inherit', fontSize: '15px' }}
                >
                  {project.title}
                </button>
                <span style={{ fontStyle: 'italic', fontSize: '13px', color: '#666' }}>({project.category})</span>
              </div>
            </TransmuteBlock>
          ))}
        </div>

        <footer style={{ marginTop: '4em' }}>
          <hr />
          <p style={{ fontStyle: 'italic', fontSize: '13px' }}>Document Status: Final — End of File.</p>
        </footer>

      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          activeImageIndex={activeImageIndex}
          onClose={() => setSelectedProject(null)}
          onNext={nextImage}
          onPrev={prevImage}
          onSelectImage={setActiveImageIndex}
        />
      )}
    </div>
  );
}

// =============================================================================
// System Panel — shared chrome for every "modern" face (top bar, tag, texture host)
// =============================================================================
function SystemPanel({ children, accent, tag, compact }) {
  return (
    <div
      className="sys-zone relative w-full h-full overflow-hidden"
      style={{
        background: '#0A0A0A',
        border: `1px solid ${accent}33`,
        boxShadow: `0 0 0 1px ${accent}1A, 0 24px 48px -24px rgba(0,0,0,0.6)`,
      }}
    >
      <div
        className="flex items-center justify-between px-3 py-1.5 border-b modern-element"
        style={{ borderColor: `${accent}33`, background: `${accent}0D` }}
      >
        <span className="text-[9px] tracking-[0.15em]" style={{ color: accent }}>{tag}</span>
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 4px ${accent}` }} />
        </div>
      </div>
      <div className={compact ? "px-4 py-3" : "p-6"}>
        {children}
      </div>
    </div>
  );
}

// =============================================================================
// TransmuteBlock — the boot-sequence hover transmutation
// =============================================================================
function TransmuteBlock({ children, modernUI, intensity = "standard" }) {
  const containerRef = useRef(null);
  const boringRef = useRef(null);
  const modernRef = useRef(null);
  const scanbarRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const timings = {
    header: { open: 0.5, type: 0.45 },
    standard: { open: 0.4, type: 0.35 },
    compact: { open: 0.28, type: 0.22 },
  }[intensity];

  const handleMouseEnter = contextSafe(() => {
    const modernEl = modernRef.current;
    const scanbar = scanbarRef.current;
    const elements = modernEl.querySelectorAll('.modern-element');

    gsap.killTweensOf([boringRef.current, modernEl, scanbar, ...elements]);

    gsap.to(boringRef.current, { opacity: 0, duration: 0.15, filter: "blur(3px)" });

    gsap.set(modernEl, { display: "block", opacity: 1, clipPath: "inset(0% 0% 100% 0%)" });
    gsap.set(elements, { opacity: 0, y: 6 });
    gsap.set(scanbar, { opacity: 1, top: "0%" });

    const tl = gsap.timeline();

    // the panel itself "prints" downward, scanbar leads the reveal
    tl.to(modernEl, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: timings.open,
      ease: "power2.inOut",
    });

    tl.to(scanbar, {
      top: "100%",
      duration: timings.open,
      ease: "power2.inOut",
    }, "<");

    // a quick flicker right as it lands
    tl.call(() => {
      modernEl.classList.remove('flicker-init');
      void modernEl.offsetWidth;
      modernEl.classList.add('flicker-init');
    }, null, timings.open * 0.55);

    // content snaps in line by line, timed to trail just behind the scan position
    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: timings.type,
      stagger: timings.type / Math.max(elements.length, 1) * 1.4,
      ease: "power1.out",
    }, timings.open * 0.3);

    tl.to(scanbar, { opacity: 0, duration: 0.15 });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.killTweensOf([boringRef.current, modernRef.current, scanbarRef.current]);

    gsap.to(boringRef.current, { opacity: 1, duration: 0.25, filter: "blur(0px)", delay: 0.05 });

    gsap.to(modernRef.current, {
      opacity: 0,
      duration: 0.18,
      ease: "power1.in",
      onComplete: () => {
        gsap.set(modernRef.current, { display: "none" });
      }
    });
  });

  return (
    <div
      ref={containerRef}
      className="relative group grid"
      style={{ gridTemplateAreas: '"stack"' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={boringRef}
        className="z-10 transition-colors group-hover:text-transparent"
        style={{ gridArea: 'stack' }}
      >
        {children}
      </div>

      <div
        ref={modernRef}
        className="relative z-20 hidden"
        style={{ gridArea: 'stack', margin: '-12px -16px' }}
      >
        {modernUI}
        <div className="sys-texture" />
        <div ref={scanbarRef} className="sys-scanbar" />
      </div>
    </div>
  );
}

// =============================================================================
// Custom terminal-block cursor, only visible over [data-sys-zone] regions
// =============================================================================
function TerminalCursor() {
  const cursorRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const blinkRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      // visible only when actually hovering rendered system chrome (.sys-zone),
      // not just any element inside a TransmuteBlock wrapper
      setVisible(!!e.target.closest('.sys-zone'));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useGSAP(() => {
    if (visible) {
      blinkRef.current = gsap.to(cursorRef.current, {
        opacity: 1,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });
    } else {
      blinkRef.current?.kill();
      gsap.set(cursorRef.current, { opacity: 0 });
    }
    return () => blinkRef.current?.kill();
  }, [visible]);

  return <div ref={cursorRef} className="sys-cursor" />;
}

// =============================================================================
// Project Modal — picks up the same boot-flicker on open
// =============================================================================
function ProjectModal({ project, activeImageIndex, onClose, onNext, onPrev, onSelectImage }) {
  const modalRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.15 }
    );
    const panel = modalRef.current.querySelector('.modal-panel');
    gsap.fromTo(panel,
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "power2.inOut",
        onComplete: () => {
          panel.classList.add('flicker-init');
        }
      }
    );
  }, []);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 sys-zone"
      style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="modal-panel bg-[#0A0A0A] w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-zinc-800 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sys-texture" />
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b border-zinc-800 bg-[#0A0A0A]/90 backdrop-blur-md">
          <div>
            <p className="text-xs mb-1 tracking-widest uppercase" style={{ color: project.accent }}>
              SYS.LOG // {project.category}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-2"
          >
            <X size={28} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-6 md:p-8 border-r border-zinc-800 bg-zinc-950/50 flex flex-col justify-center">
            <div className="relative aspect-video bg-zinc-900 border border-zinc-800 overflow-hidden group">
              <img
                src={project.images[activeImageIndex]}
                alt="System core print output"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
              />
              {project.images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={onPrev} className="p-2 bg-black/80 text-white border border-zinc-700 hover:opacity-90 transition-colors" style={{ '--hover-bg': project.accent }} onMouseEnter={(e) => { e.currentTarget.style.background = project.accent; e.currentTarget.style.color = '#000'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.8)'; e.currentTarget.style.color = '#fff'; }}><ChevronLeft size={20} /></button>
                  <button onClick={onNext} className="p-2 bg-black/80 text-white border border-zinc-700 transition-colors" onMouseEnter={(e) => { e.currentTarget.style.background = project.accent; e.currentTarget.style.color = '#000'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.8)'; e.currentTarget.style.color = '#fff'; }}><ChevronRight size={20} /></button>
                </div>
              )}
            </div>

            {project.images.length > 1 && (
              <div className="flex gap-2 justify-center mt-6">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => onSelectImage(i)}
                    className="h-1 transition-all"
                    style={{ width: i === activeImageIndex ? '32px' : '8px', background: i === activeImageIndex ? project.accent : '#3f3f46' }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 flex flex-col text-zinc-300">
            <h3 className="font-mono text-sm text-white mb-4 border-b border-zinc-800 pb-2">
              [ DATA.OUTPUT ]
            </h3>
            <p className="text-base leading-relaxed mb-8 opacity-90 font-light">
              {project.fullDescription}
            </p>

            <h3 className="font-mono text-sm text-white mb-4 border-b border-zinc-800 pb-2">
              [ TECH.STACK ]
            </h3>
            <div className="flex flex-wrap gap-2 mb-10">
              {project.technologies.map(tech => (
                <span key={tech} className="px-3 py-1 bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-zinc-800">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 font-bold uppercase tracking-widest transition-opacity hover:opacity-90"
                style={{ background: project.accent, color: '#000' }}
              >
                <span>Execute Link</span> <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}