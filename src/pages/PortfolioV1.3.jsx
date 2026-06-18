import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  Terminal, Activity, Layers, Target, Code, Cpu, ArrowRight, 
  X, ChevronLeft, ChevronRight, ExternalLink 
} from 'lucide-react';

export default function PortfolioV3_Trimmed() {
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

  // --- 1. FEATURED PROJECTS (Top 4 aligning with Systems/Scrum goals) ---
  const featuredProjects = [
    {
      id: "aethol",
      title: "AETHOL Digital Platform",
      category: "Web Development",
      images: ["https://i.imgur.com/8abgjpQ.jpeg"],
      description: "A high-end interaction study summarizing broad core competencies in Next.js and motion frameworks.",
      fullDescription: "A technical architectural study demonstrating advanced competency in structural frontend layout, performance budgets, and motion engines. Instead of granular project components, this environment highlights specialized knowledge in mapping technical constraints onto interaction layers using Next.js and GSAP to deliver an authoritative, low-friction digital presence.",
      technologies: ["Next.js", "GSAP", "SVG Animation", "Vercel"],
      link: "https://aethol.nl",
      accent: "border-cyan-500",
      bgAccent: "bg-cyan-500",
      textAccent: "text-cyan-400"
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
      accent: "border-orange-500",
      bgAccent: "bg-orange-500",
      textAccent: "text-orange-400"
    },
    {
      id: "resource-hub",
      title: "CMD Resource Hub",
      category: "School Project",
      images: ["https://i.imgur.com/IwZNbYT.png"],
      description: "A centralized React toolkit featuring custom fuzzy engines for optimized resource access.",
      fullDescription: "I transformed a static HTML resource list into a high-performance React application designed for CMD students. The project involved implementing advanced features such as a real-time fuzzy search engine, category filtering, and a 'Quick Search' platform bar. To enhance the user experience, I integrated local storage persistence for a 'Favorites' system and keyboard shortcuts to cater to power users.",
      technologies: ["React", "Local Storage", "UX Design", "State Management"],
      link: "/resource-hub",
      accent: "border-purple-500",
      bgAccent: "bg-purple-500",
      textAccent: "text-purple-400"
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
      accent: "border-emerald-500",
      bgAccent: "bg-emerald-500",
      textAccent: "text-emerald-400"
    }
  ];

  // --- 2. ARCHIVE PROJECTS (The remaining 6) ---
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
      accent: "border-zinc-500",
      bgAccent: "bg-zinc-500",
      textAccent: "text-zinc-400"
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
      accent: "border-rose-500",
      bgAccent: "bg-rose-500",
      textAccent: "text-rose-400"
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
      accent: "border-zinc-500",
      bgAccent: "bg-zinc-500",
      textAccent: "text-zinc-400"
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
      accent: "border-yellow-500",
      bgAccent: "bg-yellow-400",
      textAccent: "text-yellow-400"
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
      accent: "border-amber-500",
      bgAccent: "bg-amber-500",
      textAccent: "text-amber-400"
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
      accent: "border-green-500",
      bgAccent: "bg-green-500",
      textAccent: "text-green-400"
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
      }}
    >
      <style>{`
        .portfolio-root a { color: #0000EE; text-decoration: underline; cursor: crosshair; }
        .portfolio-root a:visited { color: #551A8B; }
        .portfolio-root ul { list-style-type: disc; margin: 1em 0; padding-left: 2.5em; }
        .portfolio-root p { margin: 1em 0; line-height: 1.4; }
        .portfolio-root h1, .portfolio-root h2, .portfolio-root h3 { font-weight: bold; margin: 0; }
        .portfolio-root hr { border: none; border-top: 1px solid #000; margin: 1.5em 0; }
      `}</style>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 16px 80px' }}>

        {/* HEADER TRANSMUTATION */}
        <TransmuteBlock 
          modernUI={
            <div className="bg-[#0A0A0A] border-l-4 border-[#C6F91F] p-8 shadow-2xl h-full flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20"><Terminal size={64} color="#C6F91F" /></div>
              <h1 className="font-sans text-4xl md:text-5xl font-black text-white uppercase tracking-tighter modern-element">
                M.R. Hoogeweg
              </h1>
              <p className="font-mono text-[#C6F91F] mt-2 modern-element tracking-widest text-sm">
                [ SYS.ARCHITECT // SCRUM.MASTER ]
              </p>
            </div>
          }
        >
          <header style={{ padding: '10px 0' }}>
            <h1 style={{ fontSize: '28px' }}>Max Robert Hoogeweg</h1>
            <p>Growth Portfolio — Index &amp; Methodology</p>
          </header>
        </TransmuteBlock>

        <hr />

        {/* ABSTRACT TRANSMUTATION */}
        <TransmuteBlock 
          modernUI={
            <div className="bg-zinc-900 border border-zinc-700 p-8 shadow-2xl h-full rounded-xl">
              <div className="flex items-center gap-3 mb-6 modern-element">
                <Activity className="text-cyan-400" />
                <h2 className="font-sans text-xl font-bold text-white uppercase tracking-widest">Translation Layer</h2>
              </div>
              <p className="font-sans text-gray-300 leading-relaxed modern-element">
                Specializing in bridging the critical gap between technical development constraints and overarching business requirements. Operating as a translation node within Agile environments to facilitate cross-functional execution.
              </p>
            </div>
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

        {/* COMPETENCIES TRANSMUTATION */}
        <TransmuteBlock 
          modernUI={
            <div className="bg-[#050505] p-8 shadow-2xl h-full border-t border-[#C6F91F]">
              <h2 className="font-sans text-2xl font-black text-[#C6F91F] mb-6 modern-element uppercase">Tech Stack & Methodology</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Code, text: "React & State" },
                  { icon: Layers, text: "GSAP Motion" },
                  { icon: Cpu, text: "Agile / Scrum" },
                  { icon: Target, text: "Atomic Design" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded modern-element border border-white/10">
                    <item.icon className="text-[#C6F91F]" size={20} />
                    <span className="font-mono text-sm text-white">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
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

        {/* FEATURED PROJECTS (Heavy blocks) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {featuredProjects.map((project, index) => (
            <TransmuteBlock 
              key={project.id}
              modernUI={
                <div className="bg-zinc-950/95 border border-zinc-850 p-8 shadow-2xl h-full backdrop-blur-xl flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-2 modern-element">
                      <h3 className={`font-sans text-2xl font-black ${project.textAccent} uppercase tracking-tight`}>
                        {project.title}
                      </h3>
                      <span className="font-mono text-xs text-zinc-600">[{String(index + 1).padStart(2, '0')}]</span>
                    </div>
                    <p className="font-mono text-[10px] text-zinc-500 mb-3 modern-element tracking-widest">
                      CORE_SCOPE // {project.category.toUpperCase()}
                    </p>
                    <p className="font-sans text-sm text-zinc-400 leading-relaxed mb-6 modern-element">
                      {project.description}
                    </p>
                  </div>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setSelectedProject(project); 
                      setActiveImageIndex(0); 
                    }}
                    className={`flex items-center justify-between w-full md:w-auto gap-4 ${project.bgAccent} text-black px-4 py-2.5 font-bold font-sans text-xs modern-element hover:bg-white transition-colors`}
                  >
                    <span>SYS.INITIATE_VIEW</span> <ArrowRight size={14} />
                  </button>
                </div>
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

        {/* ARCHIVE PROJECTS (Compact list) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {archiveProjects.map((project) => (
            <TransmuteBlock 
              key={project.id}
              modernUI={
                <div 
                  className={`bg-[#0A0A0A] border border-zinc-800 p-4 shadow-xl h-full flex items-center justify-between group hover:border-${project.accent.split('-')[1]}-500/50 transition-colors`}
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setSelectedProject(project); 
                    setActiveImageIndex(0); 
                  }}
                >
                  <div>
                    <h3 className={`font-sans text-sm font-bold ${project.textAccent} uppercase modern-element`}>
                      {project.title}
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-600 modern-element mt-1">
                      {project.category.toUpperCase()}
                    </p>
                  </div>
                  <button className="text-zinc-500 group-hover:text-white transition-colors modern-element">
                    <ArrowRight size={16} />
                  </button>
                </div>
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

      {/* V3 COMPREHENSIVE MODAL WRAPPER (Same as before) */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 font-sans" 
          style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-[#0A0A0A] w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-zinc-800 shadow-2xl relative" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b border-zinc-800 bg-[#0A0A0A]/90 backdrop-blur-md">
              <div>
                <p className={`font-mono text-xs ${selectedProject.textAccent} mb-1 tracking-widest uppercase`}>
                  SYS.LOG // {selectedProject.category}
                </p>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                  {selectedProject.title}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedProject(null)} 
                className="text-zinc-500 hover:text-white transition-colors p-2"
              >
                <X size={28} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-6 md:p-8 border-r border-zinc-800 bg-zinc-950/50 flex flex-col justify-center">
                <div className="relative aspect-video bg-zinc-900 border border-zinc-800 overflow-hidden group">
                  <img 
                    src={selectedProject.images[activeImageIndex]} 
                    alt="System core print output" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0" 
                  />
                  {selectedProject.images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={prevImage} className="p-2 bg-black/80 text-white border border-zinc-700 hover:bg-[#C6F91F] hover:text-black transition-colors"><ChevronLeft size={20} /></button>
                      <button onClick={nextImage} className="p-2 bg-black/80 text-white border border-zinc-700 hover:bg-[#C6F91F] hover:text-black transition-colors"><ChevronRight size={20} /></button>
                    </div>
                  )}
                </div>
                
                {selectedProject.images.length > 1 && (
                  <div className="flex gap-2 justify-center mt-6">
                    {selectedProject.images.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveImageIndex(i)}
                        className={`h-1 transition-all ${i === activeImageIndex ? `w-8 ${selectedProject.bgAccent}` : 'w-2 bg-zinc-700'}`} 
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
                  {selectedProject.fullDescription}
                </p>

                <h3 className="font-mono text-sm text-white mb-4 border-b border-zinc-800 pb-2">
                  [ TECH.STACK ]
                </h3>
                <div className="flex flex-wrap gap-2 mb-10">
                  {selectedProject.technologies.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-zinc-800">
                  <a 
                    href={selectedProject.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`flex items-center justify-center gap-3 w-full py-4 font-bold font-sans uppercase tracking-widest transition-colors ${selectedProject.bgAccent} text-black hover:bg-white`}
                  >
                    <span>Execute Link</span> <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// The Localized Transmutation Component
// =============================================================================
function TransmuteBlock({ children, modernUI }) {
  const containerRef = useRef(null);
  const boringRef = useRef(null);
  const modernRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe(() => {
    gsap.to(boringRef.current, { opacity: 0, duration: 0.2, filter: "blur(4px)" });
    
    gsap.fromTo(modernRef.current, 
      { 
        opacity: 0, 
        scaleY: 0.8, 
        scaleX: 0.95,
        display: "block",
        transformOrigin: "center center"
      },
      { 
        opacity: 1, 
        scaleY: 1, 
        scaleX: 1.05, 
        duration: 0.4, 
        ease: "back.out(1.2)" 
      }
    );

    gsap.fromTo(modernRef.current.querySelectorAll('.modern-element'),
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.3, ease: "power2.out", delay: 0.1 }
    );
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(boringRef.current, { opacity: 1, duration: 0.3, filter: "blur(0px)", delay: 0.1 });
    
    gsap.to(modernRef.current, {
      opacity: 0,
      scaleY: 0.9,
      scaleX: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(modernRef.current, { display: "none" });
      }
    });
  });

  return (
    <div 
      ref={containerRef} 
      className="relative cursor-crosshair group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={boringRef} className="relative z-10 transition-colors group-hover:text-transparent">
        {children}
      </div>

      <div 
        ref={modernRef} 
        className="absolute inset-0 z-20 hidden"
        style={{ top: '-12px', bottom: '-12px', left: '-16px', right: '-16px' }}
      >
        {modernUI}
      </div>
    </div>
  );
}