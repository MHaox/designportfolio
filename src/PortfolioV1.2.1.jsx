// src/PortfolioV1.2.1.jsx
import React, { useState } from 'react';
import { X, Github, Linkedin, Mail, Briefcase, GraduationCap, Code, Feather, Zap, ExternalLink, Star, Smile, Rewind, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PostItBoard() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Helper to randomize rotation slightly
  const getRotation = (index) => {
    const rotations = ['rotate-1', '-rotate-2', 'rotate-3', '-rotate-1', 'rotate-2', '-rotate-3'];
    return rotations[index % rotations.length];
  };

  // --- Modal Gallery Navigation ---
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

  // --- DATA ---
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

  // Restored full images and descriptions from your original file
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
      color: "bg-yellow-100", // The Post-it Color
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
      // ADDED BACK MISSING IMAGES HERE:
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
    <div className="min-h-screen pb-20 overflow-x-hidden selection:bg-yellow-300 selection:text-black font-hand bg-wall text-slate-800">
      
      {/* HEADER */}
      <header className="pt-12 pb-8 px-6 text-center">
        <div className="inline-block bg-white p-6 shadow-xl border-2 border-slate-200 transform -rotate-1 max-w-2xl w-full relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/60 rotate-2"></div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-2">Max's Portfolio</h1>
          <p className="text-xl text-slate-500 font-semibold">Digital experiences, rough drafts & final polishes.</p>
          
          <div className="flex justify-center gap-6 mt-6">
             <a href="mailto:max.hoogeweg@outlook.com" className="hover:text-blue-600 transition transform hover:scale-110"><Mail size={28} /></a>
             <a href="https://github.com/MHaox" className="hover:text-black transition transform hover:scale-110"><Github size={28} /></a>
             <a href="https://www.linkedin.com/in/max-robert-hoogeweg/" className="hover:text-blue-700 transition transform hover:scale-110"><Linkedin size={28} /></a>
          </div>
          <Star className="absolute -right-4 -top-4 text-yellow-400 w-12 h-12 fill-current opacity-80" />
        </div>
      </header>

      {/* MAIN BOARD */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="md:col-span-4 space-y-8 flex flex-col">
          
          {/* Avatar Note */}
          <div className="bg-white p-4 pb-8 shadow-lg transform rotate-1 border border-slate-100 relative group hover:rotate-0 transition duration-300">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-sm z-10 border border-red-700"></div>
            <div className="aspect-square bg-slate-100 mb-4 overflow-hidden border-4 border-white shadow-inner">
               <img src="https://i.imgur.com/MZcwfNt.png" alt="Max" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Hello! 👋</h2>
            <p className="text-lg leading-tight text-slate-600">I'm a motivated student specializing in creative fields.</p>
            <div className="absolute bottom-2 right-2 opacity-20 group-hover:opacity-100 transition"><Smile size={32} /></div>
          </div>

          {/* LINK TO OLD PORTFOLIO */}
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

        {/* RIGHT COLUMN: PROJECTS */}
        <div className="md:col-span-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Skills */}
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {skills.map((skill, idx) => (
                    <div key={idx} className={`${skill.color} p-4 shadow-md transform ${getRotation(idx)} hover:scale-110 transition duration-300`}>
                      <skill.icon size={24} className="mb-2 opacity-70" />
                      <h4 className="font-bold leading-none mb-1">{skill.title}</h4>
                    </div>
                  ))}
              </div>

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

      {/* MODAL (Popup) */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
          {/* UPDATED: Added selectedProject.color here so the popup matches the post-it! */}
          <div className={`${selectedProject.color} max-w-4xl w-full p-2 transform rotate-1 shadow-2xl`} onClick={(e) => e.stopPropagation()}>
            <div className={`${selectedProject.color} p-4 md:p-8 border-2 border-slate-500/20 border-dashed relative`}>
                
                <button onClick={() => setSelectedProject(null)} className="absolute top-2 right-2 p-2 hover:bg-black/10 rounded-full transition"><X size={32} /></button>
                
                <div className="grid md:grid-cols-2 gap-8">
                  
                  {/* Gallery Section */}
                  <div className="relative">
                    <div className="bg-white p-2 shadow-sm transform rotate-1">
                        <img 
                          src={selectedProject.images[activeImageIndex]} 
                          alt="Project" 
                          className="w-full h-64 object-cover" 
                        />
                    </div>
                    
                    {/* Gallery Controls */}
                    {selectedProject.images.length > 1 && (
                      <div className="flex justify-center items-center gap-4 mt-4">
                        <button onClick={prevImage} className="p-2 bg-white/50 hover:bg-white rounded-full transition shadow-sm">
                          <ChevronLeft size={20} />
                        </button>
                        <div className="flex gap-2">
                           {selectedProject.images.map((_, i) => (
                             <div key={i} className={`w-2 h-2 rounded-full ${i === activeImageIndex ? 'bg-slate-800' : 'bg-slate-400/50'}`} />
                           ))}
                        </div>
                        <button onClick={nextImage} className="p-2 bg-white/50 hover:bg-white rounded-full transition shadow-sm">
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Text Content */}
                  <div>
                    <h2 className="text-4xl font-bold mb-2">{selectedProject.title}</h2>
                    <span className="inline-block bg-white/50 px-2 py-1 text-sm font-bold mb-4 rounded transform -rotate-2 border border-black/5">
                        {selectedProject.category}
                    </span>

                    <h3 className="font-bold text-lg mb-1 opacity-80">The Brief</h3>
                    <p className="text-lg mb-6 text-slate-800 leading-relaxed font-medium opacity-90">
                        {selectedProject.fullDescription}
                    </p>

                    <h3 className="font-bold text-lg mb-1 opacity-80">Tech Used</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {selectedProject.technologies.map(tech => (
                            <span key={tech} className="px-3 py-1 bg-white/60 border border-black/5 rounded-full text-sm font-bold">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <a href={selectedProject.link} target="_blank" rel="noreferrer" className="block text-center bg-slate-900 text-white font-bold py-4 hover:bg-slate-800 transition shadow-lg transform hover:-translate-y-1 rounded">
                        View Live Project
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