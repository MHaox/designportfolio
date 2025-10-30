import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, Briefcase, GraduationCap, Code, Feather, Zap } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const skills = [
    {
      icon: Feather,
      title: "UI/UX Design",
      description: "Proficient in Figma.",
    },
    {
      icon: Briefcase,
      title: "Technical Support/Incident Management",
      description: "Experience at ASML (Centric).",
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Developed a production-ready SEO/SEA Dashboard with Laravel/SQL/Figma for De Haan Digital.",
    },
    {
      icon: Zap,
      title: "App Development",
      description: "Built a Salesforce activity sign-up app with Lightning Web Component/barcode scanner at European School of English (Malta).",
    },
  ];

  const education = [
    {
      institution: "MBO Software Developer Graduate",
      details: "Expected Graduation: January 2025.",
    },
    {
      institution: "English Language Proficiency",
      details: "C1 Level.",
    },
    {
      institution: "HBO Int CMD Undergraduate",
      details: "Starting: September 2025.",
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Project One",
      category: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      description: "A brief description of this project",
      fullDescription: "This is a comprehensive UI/UX design project where I focused on creating intuitive user experiences. The project involved extensive user research, wireframing, prototyping, and user testing to ensure the final product met user needs effectively.",
      technologies: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      link: "#"
    },
    {
      id: 2,
      title: "Project Two",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
      description: "A brief description of this project",
      fullDescription: "A complete branding project that involved creating a brand identity from scratch. This included logo design, color palette selection, typography choices, and brand guidelines to ensure consistency across all touchpoints.",
      technologies: ["Illustrator", "Photoshop", "Brand Strategy", "Visual Identity"],
      link: "#"
    },
    {
      id: 3,
      title: "Project Three",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop",
      description: "A brief description of this project",
      fullDescription: "A modern web design project featuring responsive layouts, smooth animations, and an emphasis on accessibility. The design system was built to be scalable and maintainable for future development.",
      technologies: ["React", "Tailwind CSS", "Responsive Design", "Accessibility"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-md z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Max Robert Hoogeweg
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 items-center">
              <a href="#work" className="text-slate-300 hover:text-white transition">Work</a>
              <a href="#about" className="text-slate-300 hover:text-white transition">About</a>
              <a href="#contact" className="text-slate-300 hover:text-white transition">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-slate-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pt-4 pb-2 flex flex-col gap-4">
              <a href="#work" className="text-slate-300 hover:text-white transition">Work</a>
              <a href="#about" className="text-slate-300 hover:text-white transition">About</a>
              <a href="#contact" className="text-slate-300 hover:text-white transition">Contact</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Design Portfolio
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 max-w-2xl">
                Creating thoughtful digital experiences through design and creativity.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center p-8 shadow-2xl">
                <img src="/src/assets/MR.MR.svg" alt="Logo" className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Selected Work</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="overflow-hidden rounded-lg mb-4 border border-slate-800 hover:border-slate-700 transition-all duration-300">
                  <img 
                    src={project.image}
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

        {/* Project Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-slate-900/90 text-white rounded-full p-2 hover:bg-slate-800 transition border border-slate-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8">
                <div className="text-sm text-violet-400 mb-2">{selectedProject.category}</div>
                <h3 className="text-3xl font-bold mb-4">{selectedProject.title}</h3>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                  {selectedProject.fullDescription}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-xl font-semibold mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-slate-300 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a 
                  href={selectedProject.link}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:from-blue-600 hover:to-violet-600 transition shadow-lg"
                >
                  View Project
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About</h2>
          
          {/* Profile */}
          <div className="mb-12 bg-slate-900 p-6 rounded-lg border border-slate-800">
            <p className="text-lg text-slate-300 mb-4">
              Motivated Student specializing in creative fields, with experience in high-impact development and corporate technical support.
            </p>
            <p className="text-lg text-slate-300">
              Currently available for freelance projects and full-time opportunities.
            </p>
          </div>

          {/* Skills & Experience */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Briefcase className="w-6 h-6 mr-2 text-violet-400" />
              Skills & Experience
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-slate-900 rounded-lg border border-slate-800 hover:border-slate-700 transition">
                    <div className="p-3 bg-slate-800 rounded-full flex-shrink-0">
                      <Icon size={20} className="text-violet-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{skill.title}</h4>
                      <p className="text-slate-400 text-sm">{skill.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <GraduationCap className="w-6 h-6 mr-2 text-violet-400" />
              Education
            </h3>
            <div className="bg-slate-900 rounded-lg border border-slate-800 divide-y divide-slate-800">
              {education.map((edu, index) => (
                <div key={index} className="flex items-start space-x-3 p-4">
                  <GraduationCap className="mt-1 flex-shrink-0 text-violet-400" size={20} />
                  <div>
                    <h4 className="font-semibold text-white">{edu.institution}</h4>
                    <p className="text-sm text-slate-400">{edu.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="text-lg text-slate-400 mb-12">
            Have a project in mind? Let's talk about it.
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href="mailto:your.email@example.com"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-lg hover:from-blue-600 hover:to-violet-600 transition shadow-lg"
            >
              <Mail size={20} />
              Email Me
            </a>
          </div>
          <div className="flex justify-center gap-6 mt-8">
            <a href="#" className="text-slate-400 hover:text-white transition">
              <Github size={24} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-500">
          <p>© 2024 Max Robert Hoogeweg. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}