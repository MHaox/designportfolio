import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, Briefcase, GraduationCap, Code, Feather, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Portfolio() {
  // ==========================================
  // 1. STATE MANAGEMENT
  // ==========================================
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Tracks mobile menu open/close
  const [selectedProject, setSelectedProject] = useState(null); // Tracks which project is open in the modal
  const [activeImageIndex, setActiveImageIndex] = useState(0); // Tracks which image is showing in the modal gallery
  const [isPaused, setIsPaused] = useState(false); // Tracks if the main carousel should stop moving (on hover)
  
  // ==========================================
  // 2. REFERENCES (DOM Access)
  // ==========================================
  const projectContainerRef = useRef(null); // Direct reference to the scrollable project container div

  // ==========================================
  // 3. HELPER FUNCTIONS (Interaction Logic)
  // ==========================================

  // Opens the modal and resets the gallery to the first image
  const openProject = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  // --- Modal Gallery Navigation ---
  const nextImage = (e) => {
    e.stopPropagation(); // Prevents the modal background click event from firing
    if (selectedProject) {
      // Uses modulo (%) to loop back to 0 when reaching the end
      setActiveImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedProject) {
      // Logic to loop to the last image if clicking 'prev' on the first image
      setActiveImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  // --- Manual Carousel Navigation (Left/Right Arrows) ---
  const scrollManual = (direction) => {
    const container = projectContainerRef.current;
    if (!container) return;

    // Calculate exact scroll distance: Card Width + Gap (32px)
    const cardWidth = container.firstElementChild?.offsetWidth || 300;
    const gap = 32;
    const scrollAmount = cardWidth + gap;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // ==========================================
  // 4. EFFECTS (Animation/Intervals)
  // ==========================================

  // --- Infinite Auto-Scroll Logic ---
  useEffect(() => {
    const scrollContainer = projectContainerRef.current;
    
    // Stop animation if DOM isn't ready or if user is interacting (Hover or Touch)
    if (!scrollContainer || isPaused) return;

    const scrollSpeed = 1; 
    const refreshRate = 20; 

    const scrollInterval = setInterval(() => {
      scrollContainer.scrollLeft += scrollSpeed;
      
      // Infinite Loop Teleport Logic
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    }, refreshRate);

    return () => clearInterval(scrollInterval);
  }, [isPaused]); // This dependency ensures the loop stops instantly when isPaused becomes true

  // ==========================================
  // 5. STATIC DATA
  // ==========================================
  const skills = [
    { icon: Feather, title: "UI/UX Design", description: "Proficient in Figma." },
    { icon: Briefcase, title: "Technical Support", description: "Experience at ASML (Centric)." },
    { icon: Code, title: "Web Development", description: "SEO/SEA Dashboard with Laravel." },
    { icon: Zap, title: "App Development", description: "Salesforce app with LWC." },
  ];

  const education = [
    { institution: "MBO Software Developer Graduate", details: "Expected: Jan 2025" },
    { institution: "English Proficiency", details: "C1 Level" },
    { institution: "HBO Int CMD Undergraduate", details: "Starting: Sep 2025" },
  ];

  const projects = [
    {
      id: 1,
      title: "First design project",
      category: "School Project",
      images: ["https://i.imgur.com/iFoVtJw.jpeg"],
      description: "We made a interative museum instalation for a pop up museum in school.",
      fullDescription: "For this project, we designed an interactive museum installation for a pop-up museum at our school. The installation aimed to engage visitors through immersive design elements and interactive features. We focused on creating a user-friendly experience that would captivate the audience and encourage exploration of the exhibits.",
      technologies: ["Figma", "Illustrator", "Scrum", "Prototyping"],
      link: "https://docs.google.com/document/d/1c9jAP73toWUDVamuIbWXa8u3nDEAXsidm-OFxHUFHH0/edit?usp=sharing"
    },
    {
      id: 2,
      title: "Jaro gevel techniek full website redesign",
      category: "Web Development",
      images: ["https://i.imgur.com/kRAkYWE.png"],
      description: "Did a redesign and developed the Jaro Gevel Techniek website.",
      fullDescription: "I made a full redesign of the Jaro Gevel Techniek website to improve user experience and modernize the look and feel. The project included a complete overhaul of the site's layout, color scheme, and functionality to better serve the client's needs and attract more visitors.",
      technologies: ["wordpress", "elementor", "Brand Strategy", "Visual Identity"],
      link: "https://jarogeveltechniek.nl/"
    },
    {
      id: 3,
      title: "Game design",
      category: "School Project",
      images: ["https://i.imgur.com/Jj7cQPa.jpeg"],
      description: "Made a card game and tested it with users.",
      fullDescription: "i sat down with a team for the game design project and we cam up with a card drinking game concept. We focused on creating engaging gameplay mechanics and visually appealing card designs. After developing the initial prototype, we conducted user testing sessions to gather feedback and make necessary improvements to enhance the overall gaming experience.",
      technologies: ["illustrator", "brainstorming", "user testing", "prototyping"],
      link: "https://docs.google.com/document/d/11xZbyt4hDQ9EWp3V4skDMaGHaZdChOBW0PeOobxfTLQ/edit?usp=sharing"
    },
    {
     id: 4,
      title: "Learning Illustrator",
      category: "Personal learning",
      images: ["https://i.imgur.com/8abgjpQ.jpeg", "https://i.imgur.com/zsLluxV.jpeg", "https://i.imgur.com/VIGiifl.jpeg"],
      description: "Wanted to learn illustrator so I made a learning plan and worked through it.",
      fullDescription: "To enhance my design skills, I created a structured learning plan to improve in Adobe Illustrator. This involved following tutorials, practicing various design techniques, and completing projects to apply what I learned. The goal was to become proficient in using Illustrator for creating vector graphics and illustrations.",
      technologies: ["illustrator", "Learning", "Creative", "Self-improvement"],
      link: "https://docs.google.com/document/d/11xZbyt4hDQ9EWp3V4skDMaGHaZdChOBW0PeOobxfTLQ/edit?usp=sharing"
    }
  ];

  // Infinite Loop Setup: Duplicating the array to create a buffer for seamless scrolling
  const infiniteProjects = [...projects, ...projects];

  // ==========================================
  // 6. RENDER (JSX)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      {/* --- NAVIGATION BAR --- */}
      <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-md z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Max Robert Hoogeweg
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            <a href="#work" className="text-slate-300 hover:text-white transition">Work</a>
            <a href="#about" className="text-slate-300 hover:text-white transition">About</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition">Contact</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 px-6 flex flex-col gap-4 bg-slate-950 border-b border-slate-800">
            <a href="#work" className="text-slate-300 hover:text-white transition">Work</a>
            <a href="#about" className="text-slate-300 hover:text-white transition">About</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition">Contact</a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION (Introduction) --- */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* Note: 'pb-3' added to fix text gradient clipping descenders (g, y, j) */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 pb-3 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              Design Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl">
              Creating thoughtful digital experiences through design and creativity.
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center p-8 shadow-2xl">
              <img src="https://i.imgur.com/MZcwfNt.png" alt="Logo" className="h-full w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* --- WORK SECTION (Carousel) --- */}
      <section id="work" className="py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Selected Work</h2>
            
            {/* Manual Navigation Arrows */}
            {/* Logic: Pauses auto-scroll on hover, resumes on leave */}
            <div className="flex gap-4">
              <button 
                onClick={() => scrollManual('left')}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="p-2 rounded-full border border-slate-700 hover:bg-slate-800 text-slate-300 transition"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => scrollManual('right')}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="p-2 rounded-full border border-slate-700 hover:bg-slate-800 text-slate-300 transition"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          
          {/* Scrollable Container (The moving track) */}
          <div 
            ref={projectContainerRef}
            className="flex gap-8 overflow-x-auto pb-8 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Mapping over duplicated array for infinite illusion */}
            {infiniteProjects.map((project, index) => (
              <div 
                key={`${project.id}-${index}`} 
                className="group cursor-pointer flex-none w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]" 
                onClick={() => openProject(project)}
                // Pauses loop when hovering a specific post card
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="overflow-hidden rounded-lg mb-4 border border-slate-800 hover:border-slate-700 transition-all duration-300">
                  <img 
                    src={project.images[0]} 
                    alt={project.title} 
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500" 
                  />
                </div>
                <div className="text-sm text-violet-400 mb-2">{project.category}</div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-slate-400">{project.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- PROJECT MODAL (Popup) --- */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
            <div className="bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-800 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="relative group">
                
                {/* Modal Gallery Image */}
                <img 
                  src={selectedProject.images[activeImageIndex]} 
                  alt={selectedProject.title} 
                  className="w-full h-64 md:h-96 object-contain bg-slate-950" 
                />
                
                {/* Close Button */}
                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 bg-slate-900/90 text-white rounded-full p-2 hover:bg-slate-800 transition border border-slate-700 z-10">
                  <X size={24} />
                </button>

                {/* Gallery Controls (Only show if >1 image) */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition opacity-0 group-hover:opacity-100">
                      <ChevronLeft size={24} />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition opacity-0 group-hover:opacity-100">
                      <ChevronRight size={24} />
                    </button>
                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.images.map((_, idx) => (
                        <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === activeImageIndex ? 'bg-white w-4' : 'bg-white/50'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              {/* Modal Text Content */}
              <div className="p-8">
                <div className="text-sm text-violet-400 mb-2">{selectedProject.category}</div>
                <h3 className="text-3xl font-bold mb-4">{selectedProject.title}</h3>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">{selectedProject.fullDescription}</p>
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-slate-300 text-sm">{tech}</span>
                    ))}
                  </div>
                </div>
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:from-blue-600 hover:to-violet-600 transition shadow-lg">
                  View Project
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* --- ABOUT SECTION (Skills & Education) --- */}
      <section id="about" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About</h2>
          
          {/* Bio Box */}
          <div className="mb-12 bg-slate-900 p-6 rounded-lg border border-slate-800">
            <p className="text-lg text-slate-300 mb-4">Motivated Student specializing in creative fields, with experience in high-impact development and corporate technical support.</p>
            <p className="text-lg text-slate-300">Currently available for freelance projects and full-time opportunities.</p>
          </div>
          
          {/* Skills Grid */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center"><Briefcase className="w-6 h-6 mr-2 text-violet-400" /> Skills & Experience</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, i) => (
                <div key={i} className="flex items-start space-x-4 p-4 bg-slate-900 rounded-lg border border-slate-800 hover:border-slate-700 transition">
                  <div className="p-3 bg-slate-800 rounded-full flex-shrink-0"><skill.icon size={20} className="text-violet-400" /></div>
                  <div><h4 className="text-lg font-semibold mb-1">{skill.title}</h4><p className="text-slate-400 text-sm">{skill.description}</p></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Education Grid */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center"><GraduationCap className="w-6 h-6 mr-2 text-violet-400" /> Education</h3>
            <div className="bg-slate-900 rounded-lg border border-slate-800 divide-y divide-slate-800">
              {education.map((edu, i) => (
                <div key={i} className="flex items-start space-x-3 p-4">
                  <GraduationCap className="mt-1 flex-shrink-0 text-violet-400" size={20} />
                  <div><h4 className="font-semibold text-white">{edu.institution}</h4><p className="text-sm text-slate-400">{edu.details}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="text-lg text-slate-400 mb-12">Have a project in mind? Let's talk about it.</p>
          <div className="flex justify-center gap-6">
            <a href="mailto:max.hoogeweg@outlook.com" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:from-blue-600 hover:to-violet-600 transition shadow-lg">
              <Mail size={20} /> Email Me
            </a>
          </div>
          <div className="flex justify-center gap-6 mt-8">
            <a href="https://github.com/MHaox" className="text-slate-400 hover:text-white transition"><Github size={24} /></a>
            <a href="https://www.linkedin.com/in/max-robert-hoogeweg/" className="text-slate-400 hover:text-white transition"><Linkedin size={24} /></a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-500"><p>© 2024 Max Robert Hoogeweg. All rights reserved.</p></div>
      </footer>
    </div>
  );
}