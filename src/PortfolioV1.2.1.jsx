// src/PortfolioV1.2.1.jsx
import React, { useState, useEffect } from 'react';
import { X, Github, Linkedin, Mail, Briefcase, GraduationCap, Code, Feather, Zap, ExternalLink, Star, Smile, Rewind, ChevronLeft, ChevronRight, Coffee, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

// ==========================================
// 1. HELPER COMPONENTS
// ==========================================

// --- Background Doodles ---
function DoodleLayer() {
  const doodles = [
    { icon: Star, x: '10%', y: '15%', rot: '12deg', scale: '1.2' },
    { icon: Zap, x: '85%', y: '20%', rot: '-10deg', scale: '0.8' },
    { icon: Smile, x: '5%', y: '80%', rot: '-20deg', scale: '1.5' },
    { icon: Feather, x: '80%', y: '75%', rot: '30deg', scale: '1.1' },
    { icon: Code, x: '45%', y: '10%', rot: '5deg', scale: '0.9' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {doodles.map((d, i) => (
        <div 
          key={i} 
          className="absolute text-slate-400/30"
          style={{ 
            left: d.x, 
            top: d.y, 
            transform: `rotate(${d.rot}) scale(${d.scale})` 
          }}
        >
          <d.icon size={64} />
        </div>
      ))}
    </div>
  );
}

// --- Coffee Stain (Texture) ---
function CoffeeStain({ className }) {
  return (
    <div className={`pointer-events-none opacity-30 mix-blend-multiply ${className}`}>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" fill="none" stroke="#78350f" strokeWidth="12" strokeDasharray="300 60" transform="rotate(-20 100 100)" style={{ filter: 'blur(1px)' }} opacity="0.6" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="#78350f" strokeWidth="4" opacity="0.3" />
      </svg>
    </div>
  );
}

// --- Business Card (Contact) ---
function BusinessCard() {
  return (
    <div className="bg-slate-800 text-white p-4 w-full shadow-2xl transform -rotate-2 hover:rotate-0 transition relative group border-t border-slate-600">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-yellow-500 shadow-sm border border-yellow-700 z-10"></div>
      <div className="border border-slate-600 p-6 flex flex-col items-center justify-center text-center">
        <div className="font-serif text-3xl font-bold tracking-widest mb-1">M.R.H.</div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-6">Design & Development</div>
        <div className="flex gap-6 text-slate-400">
           <a href="mailto:max.hoogeweg@outlook.com" className="hover:text-white transition transform hover:scale-125"><Mail size={20}/></a>
           <a href="https://www.linkedin.com/in/max-robert-hoogeweg/" className="hover:text-white transition transform hover:scale-125"><Linkedin size={20}/></a>
           <a href="https://github.com/MHaox" className="hover:text-white transition transform hover:scale-125"><Github size={20}/></a>
        </div>
      </div>
    </div>
  );
}

// --- Services Menu ---
function ServicesMenu() {
  return (
    <div className="bg-orange-50 p-6 shadow-md transform rotate-1 relative border-l-4 border-orange-200">
       <h3 className="font-bold text-xl mb-4 text-orange-900 border-b-2 border-orange-100 pb-2 flex items-center gap-2">
         <Coffee size={20} /> Service Menu
       </h3>
       <ul className="space-y-3 font-hand text-lg text-slate-700">
         <li className="flex justify-between border-b border-orange-100 border-dashed pb-1">
            <span>Frontend Dev</span>
            <span className="font-bold text-orange-400">React/Vue</span>
         </li>
         <li className="flex justify-between border-b border-orange-100 border-dashed pb-1">
            <span>UI/UX Design</span>
            <span className="font-bold text-orange-400">Figma</span>
         </li>
         <li className="flex justify-between border-b border-orange-100 border-dashed pb-1">
            <span>WordPress</span>
            <span className="font-bold text-orange-400">Custom</span>
         </li>
         <li className="flex justify-between pt-1">
            <span>Coffee Chat</span>
            <span className="font-bold text-orange-400">Free</span>
         </li>
       </ul>
    </div>
  );
}

// --- Tech Stack Recipe ---
function RecipeCard() {
  return (
    <div className="bg-white p-6 shadow-lg transform -rotate-1 relative max-w-sm">
       <div className="absolute inset-0 bg-[linear-gradient(transparent_23px,#e5e7eb_24px)] bg-[size:100%_24px] pointer-events-none p-6"></div>
       
       <h3 className="font-bold text-xl mb-1 text-slate-800 relative z-10">Secret Sauce 🍝</h3>
       <p className="text-xs text-slate-400 mb-4 relative z-10 font-mono">My preferred tech stack</p>
       
       <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-2 font-hand text-lg text-slate-700">
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full"></div> React 19</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-teal-400 rounded-full"></div> Tailwind</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-400 rounded-full"></div> Vite</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-pink-400 rounded-full"></div> Laravel</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-400 rounded-full"></div> Firebase</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 bg-black rounded-full"></div> Figma</div>
       </div>
    </div>
  );
}

// --- Receipt (Git Commits) ---
function Receipt() {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace 'MHaox/designportfolio' with your actual 'user/repo'
    fetch('https://api.github.com/repos/MHaox/designportfolio/commits?per_page=5')
      .then(res => {
        if (!res.ok) throw new Error('Repo Private or Not Found');
        return res.json();
      })
      .then(data => {
        setCommits(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback Mock Data
        setCommits([
            { sha: '101', commit: { message: 'Fixing bugs', author: { date: new Date().toISOString() } } },
            { sha: '102', commit: { message: 'Updating UI', author: { date: new Date().toISOString() } } },
            { sha: '103', commit: { message: 'Coffee break', author: { date: new Date().toISOString() } } },
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white w-full max-w-[280px] p-4 shadow-md transform rotate-2 font-mono text-xs text-slate-600 relative mx-auto my-8">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-slate-200/50 rotate-1"></div>
      
      <div className="text-center border-b-2 border-dashed border-slate-300 pb-2 mb-2">
        <h3 className="font-bold text-lg uppercase">GIT_LOG</h3>
        <p>User: MHaox</p>
        <p>{new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-2 mb-4">
        {loading ? (
            <div className="text-center py-4">Loading Commits...</div>
        ) : (
            commits.map((c) => (
                <div key={c.sha} className="flex flex-col border-b border-slate-100 pb-1">
                    <div className="flex justify-between font-bold">
                        <span>{c.commit.message.slice(0, 15)}{c.commit.message.length > 15 ? '...' : ''}</span>
                        <span>{c.sha.substring(0, 4)}</span>
                    </div>
                    <div className="text-[10px] opacity-60 text-right">
                        {new Date(c.commit.author.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                </div>
            ))
        )}
      </div>

      <div className="border-t-2 border-dashed border-slate-300 pt-2 text-center font-bold text-lg">
        STATUS: PUSHED
      </div>
      
      <div className="absolute -bottom-2 left-0 w-full h-4 bg-wall bg-repeat-x" 
           style={{ 
             background: 'radial-gradient(circle, transparent 50%, #f0f0f0 50%)', 
             backgroundSize: '10px 10px',
             transform: 'rotate(180deg)'
           }}>
      </div>
    </div>
  );
}


// ==========================================
// 2. MAIN COMPONENT (PostItBoard)
// ==========================================
export default function PostItBoard() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // --- Helpers ---
  const getRotation = (index) => {
    const rotations = ['rotate-1', '-rotate-2', 'rotate-3', '-rotate-1', 'rotate-2', '-rotate-3'];
    return rotations[index % rotations.length];
  };

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

  // --- Data ---
  const skills = [
    { icon: Feather, title: "UI/UX Design", description: "Proficient in Figma.", color: "bg-yellow-200" },
    { icon: Briefcase, title: "Tech Support", description: "Experience at ASML.", color: "bg-green-200" },
    { icon: Code, title: "Web Dev", description: "Laravel SEO/SEA.", color: "bg-blue-200" },
    { icon: Zap, title: "App Dev", description: "Salesforce LWC.", color: "bg-pink-200" },
  ];

  const education = [
    { institution: "MBO Software Dev", details: "Grad: Jan 2025", color: "bg-orange-200" },
    { institution: "English C1", details: "Fluent", color: "bg-purple-200" },
    { institution: "HBO CMD", details: "Start: Sep 2025", color: "bg-teal-200" },
  ];

  const projects = [
    {
      id: 1,
      title: "Museum Pop-up",
      category: "School Project",
      images: ["https://i.imgur.com/iFoVtJw.jpeg"],
      description: "Interactive museum installation.",
      fullDescription: "For this project, we designed an interactive museum installation for a pop-up museum at our school. The installation aimed to engage visitors through immersive design elements and interactive features. We focused on creating a user-friendly experience that would captivate the audience and encourage exploration of the exhibits.",
      technologies: ["Figma", "Illustrator", "Scrum", "Prototyping"],
      link: "https://docs.google.com/document/d/1c9jAP73toWUDVamuIbWXa8u3nDEAXsidm-OFxHUFHH0/edit?usp=sharing",
      color: "bg-yellow-100",
      tapeColor: "bg-yellow-400/50"
    },
    {
      id: 2,
      title: "Jaro Gevel Techniek",
      category: "Web Development",
      images: ["https://i.imgur.com/kRAkYWE.png"],
      description: "Full website redesign & dev.",
      fullDescription: "I made a full redesign of the Jaro Gevel Techniek website to improve user experience and modernize the look and feel. The project included a complete overhaul of the site's layout, color scheme, and functionality to better serve the client's needs and attract more visitors.",
      technologies: ["WordPress", "Elementor", "Brand Strategy", "Visual Identity"],
      link: "https://jarogeveltechniek.nl/",
      color: "bg-blue-100",
      tapeColor: "bg-blue-400/50"
    },
    {
      id: 3,
      title: "Card Game Design",
      category: "School Project",
      images: ["https://i.imgur.com/Jj7cQPa.jpeg"],
      description: "Drinking card game concept.",
      fullDescription: "I sat down with a team for the game design project and we came up with a card drinking game concept. We focused on creating engaging gameplay mechanics and visually appealing card designs. After developing the initial prototype, we conducted user testing sessions to gather feedback and make necessary improvements to enhance the overall gaming experience.",
      technologies: ["Illustrator", "Brainstorming", "User Testing", "Prototyping"],
      link: "https://docs.google.com/document/d/11xZbyt4hDQ9EWp3V4skDMaGHaZdChOBW0PeOobxfTLQ/edit?usp=sharing",
      color: "bg-pink-100",
      tapeColor: "bg-pink-400/50"
    },
     {
      id: 4,
      title: "Learning Illustrator",
      category: "Personal Growth",
      images: ["https://i.imgur.com/8abgjpQ.jpeg", "https://i.imgur.com/zsLluxV.jpeg", "https://i.imgur.com/VIGiifl.jpeg"],
      description: "Self-taught vector graphics plan.",
      fullDescription: "To enhance my design skills, I created a structured learning plan to improve in Adobe Illustrator. This involved following tutorials, practicing various design techniques, and completing projects to apply what I learned. The goal was to become proficient in using Illustrator for creating vector graphics and illustrations.",
      technologies: ["Illustrator", "Learning", "Creative", "Self-improvement"],
      link: "https://docs.google.com/document/d/11xZbyt4hDQ9EWp3V4skDMaGHaZdChOBW0PeOobxfTLQ/edit?usp=sharing",
      color: "bg-green-100",
      tapeColor: "bg-green-400/50"
    }
  ];

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden selection:bg-yellow-300 selection:text-black font-hand bg-wall text-slate-800 relative">
      
      <DoodleLayer />
      <CoffeeStain className="absolute top-20 right-10 z-0 transform rotate-12 hidden md:block" />

      {/* HEADER */}
      <header className="pt-12 pb-8 px-6 text-center relative z-10">
        <div className="inline-block bg-white p-6 shadow-xl border-2 border-slate-200 transform -rotate-1 max-w-2xl w-full relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/60 rotate-2"></div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-2">Max's Portfolio</h1>
          <p className="text-xl text-slate-500 font-semibold">Digital experiences, rough drafts & final polishes.</p>
          <Star className="absolute -right-4 -top-4 text-yellow-400 w-12 h-12 fill-current opacity-80" />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
        
        {/* --- LEFT COLUMN --- */}
        <div className="md:col-span-4 space-y-8 flex flex-col">
          
          {/* Polaroid Avatar */}
          <div className="bg-white p-3 pb-12 shadow-2xl transform -rotate-2 hover:scale-105 transition duration-300 w-full max-w-xs mx-auto">
            <div className="bg-slate-800 aspect-square mb-4 overflow-hidden grayscale hover:grayscale-0 transition duration-700">
              <img src="https://i.imgur.com/MZcwfNt.png" alt="Me" className="w-full h-full object-cover" />
            </div>
            <div className="text-center font-hand text-2xl text-slate-600 rotate-1">
              "Me, working hard" ☕️
            </div>
          </div>

          {/* Archive Link */}
          <Link to="/progress" className="block transform -rotate-3 hover:rotate-0 transition duration-300 hover:scale-105">
             <div className="bg-slate-800 text-white p-6 shadow-xl relative border-t-8 border-slate-700">
                <div className="absolute -top-4 right-8 w-12 h-32 bg-white/10 rotate-12 blur-sm"></div>
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                   <Rewind className="text-yellow-400" /> Archives
                </h3>
                <p className="text-slate-300 text-sm mb-4">Check out my previous portfolio design to see my progress!</p>
                <div className="text-center bg-white/10 py-2 rounded font-bold text-yellow-400 border border-white/20">
                   View Progress Page
                </div>
             </div>
          </Link>
          
          <ServicesMenu />

          {/* Git Receipt */}
          <Receipt />

          {/* Education */}
          <div className="bg-white p-6 shadow-lg transform rotate-2 border-l-8 border-red-200 relative">
             <h3 className="text-xl font-bold mb-4 underline decoration-wavy decoration-red-300">Education</h3>
             <ul className="space-y-4">
                {education.map((edu, idx) => (
                  <li key={idx} className="flex flex-col">
                    <span className="font-bold text-lg">{edu.institution}</span>
                    <span className="text-slate-500 bg-yellow-100 inline-block self-start px-2 transform -rotate-1">{edu.details}</span>
                  </li>
                ))}
             </ul>
          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="md:col-span-8">
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-start">
              <BusinessCard />
              <div className="pt-4">
                  <RecipeCard />
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
               {/* To-Do List */}
               <div className="bg-yellow-100 p-6 shadow-lg transform -rotate-1 relative border-l-4 border-yellow-300 h-full flex flex-col justify-center">
                 <div className="absolute -top-4 right-4 text-yellow-600/20 transform rotate-12"><Star size={48} fill="currentColor" /></div>
                 <h3 className="font-bold text-xl mb-3 border-b border-yellow-200 pb-1 text-slate-700">Daily Quests:</h3>
                 <ul className="space-y-3 font-hand text-lg text-slate-800">
                   <li className="flex items-center gap-2 decoration-green-600 line-through decoration-2 opacity-50"><CheckSquare size={18} className="text-green-600"/> Drink Coffee</li>
                   <li className="flex items-center gap-2 decoration-green-600 line-through decoration-2 opacity-50"><CheckSquare size={18} className="text-green-600"/> Center a Div</li>
                   <li className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-slate-400 rounded-sm"></div> Fix Bugs</li>
                   <li className="flex items-center gap-2 font-bold text-red-500"><div className="w-4 h-4 border-2 border-red-500 rounded-sm"></div> Get Hired!</li>
                 </ul>
               </div>

               {/* Skills Grid */}
               <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill, idx) => (
                    <div key={idx} className={`${skill.color} p-4 shadow-md transform ${getRotation(idx)} hover:scale-110 transition duration-300 flex flex-col items-center justify-center text-center aspect-square`}>
                      <skill.icon size={28} className="mb-2 opacity-70" />
                      <h4 className="font-bold leading-none mb-1 text-lg">{skill.title}</h4>
                      <p className="text-xs font-semibold opacity-60 hidden sm:block">{skill.description}</p>
                    </div>
                  ))}
               </div>
           </div>

           {/* Music Player (Spotify Embed) */}
           <div className="bg-pink-200 p-2 shadow-xl transform rotate-1 hover:rotate-0 transition duration-300 relative mb-12 mx-auto max-w-md rounded-lg">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-300/50 opacity-80 rotate-1"></div>
                <div className="bg-pink-400/20 p-2 rounded-lg border-2 border-pink-300 border-dashed">
                    {/* REPLACE THE SRC BELOW WITH YOUR OWN SPOTIFY EMBED LINK */}
                    <iframe 
                        style={{ borderRadius: '12px' }} 
                        src="https://open.spotify.com/embed/playlist/0b2z0L262075YoA63QF9aJ?utm_source=generator"  
                        width="100%" 
                        height="152" 
                        frameBorder="0" 
                        allowFullScreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        title="Spotify"
                    ></iframe>
                </div>
                <div className="text-center font-hand font-bold text-pink-800 mt-2 opacity-70 transform -rotate-1">
                    ♫ Vibe Check ♫
                </div>
            </div>

           {/* Projects Grid */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
              {projects.map((project, idx) => (
                <div 
                  key={project.id}
                  onClick={() => { setSelectedProject(project); setActiveImageIndex(0); }}
                  className={`${project.color} p-4 pb-12 shadow-xl cursor-pointer transform ${getRotation(idx + 3)} hover:scale-105 hover:rotate-0 hover:z-10 transition duration-300 relative`}
                >
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 ${project.tapeColor} rotate-1`}></div>
                  <div className="bg-white p-2 shadow-sm mb-4 transform rotate-1">
                    <img src={project.images[0]} alt={project.title} className="w-full h-48 object-cover filter sepia-[.2]" />
                  </div>
                  <h3 className="text-2xl font-bold leading-tight">{project.title}</h3>
                  <p className="text-sm font-semibold opacity-70 mb-4">{project.category}</p>
                </div>
              ))}
           </div>
        </div>
      </main>

      {/* Modal Popup */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
          <div className={`${selectedProject.color} max-w-4xl w-full p-2 transform rotate-1 shadow-2xl`} onClick={(e) => e.stopPropagation()}>
            <div className={`${selectedProject.color} p-4 md:p-8 border-2 border-slate-500/20 border-dashed relative`}>
                <button onClick={() => setSelectedProject(null)} className="absolute top-2 right-2 p-2 hover:bg-black/10 rounded-full transition"><X size={32} /></button>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <div className="bg-white p-2 shadow-sm transform rotate-1">
                        <img src={selectedProject.images[activeImageIndex]} alt="Project" className="w-full h-64 object-cover" />
                    </div>
                    {selectedProject.images.length > 1 && (
                      <div className="flex justify-center items-center gap-4 mt-4">
                        <button onClick={prevImage} className="p-2 bg-white/50 hover:bg-white rounded-full transition shadow-sm"><ChevronLeft size={20} /></button>
                        <div className="flex gap-2">
                           {selectedProject.images.map((_, i) => (
                             <div key={i} className={`w-2 h-2 rounded-full ${i === activeImageIndex ? 'bg-slate-800' : 'bg-slate-400/50'}`} />
                           ))}
                        </div>
                        <button onClick={nextImage} className="p-2 bg-white/50 hover:bg-white rounded-full transition shadow-sm"><ChevronRight size={20} /></button>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold mb-2">{selectedProject.title}</h2>
                    <span className="inline-block bg-white/50 px-2 py-1 text-sm font-bold mb-4 rounded transform -rotate-2 border border-black/5">{selectedProject.category}</span>
                    <h3 className="font-bold text-lg mb-1 opacity-80">The Brief</h3>
                    <p className="text-lg mb-6 text-slate-800 leading-relaxed font-medium opacity-90">{selectedProject.fullDescription}</p>
                    <h3 className="font-bold text-lg mb-1 opacity-80">Tech Used</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {selectedProject.technologies.map(tech => (
                            <span key={tech} className="px-3 py-1 bg-white/60 border border-black/5 rounded-full text-sm font-bold">{tech}</span>
                        ))}
                    </div>
                    <a href={selectedProject.link} target="_blank" rel="noreferrer" className="block text-center bg-slate-900 text-white font-bold py-4 hover:bg-slate-800 transition shadow-lg transform hover:-translate-y-1 rounded">View Live Project</a>
                  </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}