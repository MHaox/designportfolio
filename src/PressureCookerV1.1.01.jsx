import React, { useState, useEffect } from 'react';
import { Camera, Eye, EyeOff, Lock, Unlock, AlertTriangle, Info, FileText, Users, Globe, Shield } from 'lucide-react';

const ReceiptsWebsite = () => {
  const [revealedSections, setRevealedSections] = useState({});
  const [flashEffect, setFlashEffect] = useState(false);

  const toggleReveal = (section) => {
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 150);
    setRevealedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Redacted text component
  const RedactedText = ({ children, revealed, onClick }) => (
    <span
      onClick={onClick}
      className={`relative inline-block cursor-pointer transition-all duration-300 ${
        revealed ? 'text-white' : ''
      }`}
    >
      {!revealed && (
        <span className="absolute inset-0 bg-black border-2 border-white -mx-1" 
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, white, white 2px, black 2px, black 4px)' }}>
        </span>
      )}
      <span className={revealed ? 'relative z-10' : 'invisible'}>{children}</span>
    </span>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Flash effect overlay */}
      {flashEffect && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none animate-flash" />
      )}

      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/95 border-b border-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <Camera className="w-8 h-8 text-white" strokeWidth={2} />
              <span className="text-2xl font-black tracking-tight">RECEIPTS</span>
            </div>
            <div className="flex gap-6 text-sm">
              <button onClick={() => scrollToSection('what')} className="font-bold hover:underline">WHAT</button>
              <button onClick={() => scrollToSection('why')} className="font-bold hover:underline">WHY</button>
              <button onClick={() => scrollToSection('how')} className="font-bold hover:underline">HOW</button>
              <button onClick={() => scrollToSection('truth')} className="font-bold hover:underline">TRUTH</button>
            </div>
          </div>
        </div>
      </nav>

      <style jsx>{`
        @keyframes flash {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.8; }
        }
        .animate-flash {
          animation: flash 0.15s ease-in-out;
        }
      `}</style>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
        {/* Paparazzi flash spots */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <div className="relative inline-block">
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter">RECEIPTS</h1>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-white"></div>
            </div>
            <p className="text-xl md:text-2xl font-light tracking-widest text-gray-400">
              THE DIGITAL PRODUCT PASSPORT EXPOSED
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-lg md:text-xl leading-relaxed">
            <p className="font-medium">
              Your clothes have secrets.
            </p>
            <p className="text-gray-300">
              Every garment you own has a hidden history. Where it came from. Who made it. 
              What it cost the planet. <span className="text-white font-semibold">The fashion industry doesn't want you to know.</span>
            </p>
            <p className="text-2xl font-bold">
              Until now.
            </p>
          </div>

          <button 
            onClick={() => scrollToSection('what')}
            className="mt-8 px-10 py-4 border-2 border-white hover:bg-white hover:text-black transition-all font-bold text-lg group"
          >
            EXPOSE THE TRUTH
            <Eye className="inline-block ml-2 w-5 h-5 group-hover:hidden" />
            <EyeOff className="hidden ml-2 w-5 h-5 group-hover:inline-block" />
          </button>

          {/* Redacted bars decoration */}
          <div className="pt-16 space-y-2 opacity-30">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-3 bg-white" style={{ width: `${Math.random() * 40 + 30}%`, marginLeft: `${Math.random() * 30}%` }}></div>
            ))}
          </div>
        </div>
      </section>

      {/* What is DPP Section */}
      <section id="what" className="min-h-screen py-20 px-6 border-t border-white/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Exposed Info */}
            <div className="space-y-8 border-r border-white/20 pr-8">
              <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-4xl md:text-5xl font-black mb-6">WHAT IS IT?</h2>
                  <div className="h-1 w-20 bg-white mb-6"></div>
                </div>
              </div>

              <div className="space-y-6 text-lg leading-relaxed">
                <p className="font-semibold text-xl">
                  The Digital Product Passport (DPP) is a digital record that follows your clothing from factory to closet.
                </p>
                
                <div className="bg-white/5 border border-white/20 p-6">
                  <p className="text-gray-300">
                    Think of it like a <span className="text-white font-semibold">birth certificate for your clothes</span>. 
                    Every piece of clothing will have a scannable code that reveals:
                  </p>
                </div>

                <ul className="space-y-4 pl-6">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                    <span><strong>Materials:</strong> What it's made of and where it came from</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                    <span><strong>Manufacturing:</strong> Who made it and under what conditions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                    <span><strong>Impact:</strong> Water usage, carbon footprint, chemicals used</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-white mt-2 flex-shrink-0"></div>
                    <span><strong>Journey:</strong> Every step from raw material to retail</span>
                  </li>
                </ul>

                <div className="bg-black border-2 border-white p-6 mt-8">
                  <p className="font-bold text-lg mb-2">The EU is making this mandatory.</p>
                  <p className="text-gray-400">By 2030, every textile product sold in Europe must have a Digital Product Passport.</p>
                </div>
              </div>
            </div>

            {/* Right Column - Redacted/Hidden Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4 mb-8">
                <Lock className="w-8 h-8 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-3xl font-black mb-2">WHAT BRANDS HIDE</h3>
                  <div className="h-1 w-16 bg-white"></div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border-2 border-white/30 p-6 hover:border-white transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold">Supply Chain Opacity</h4>
                    <button 
                      onClick={() => toggleReveal('supply')}
                      className="text-sm border border-white/50 px-3 py-1 hover:bg-white hover:text-black transition-all"
                    >
                      {revealedSections.supply ? 'HIDE' : 'REVEAL'}
                    </button>
                  </div>
                  <p className="text-gray-400 mb-3">
                    Most brands can't (or won't) tell you exactly where their clothes are made.
                  </p>
                  <div className="space-y-2">
                    <RedactedText revealed={revealedSections.supply}>
                      <span className="text-gray-300">
                        Only 10% of fashion brands can trace their supply chain to raw materials. 
                        The rest? They literally don't know—or don't want to know—who's making their clothes.
                      </span>
                    </RedactedText>
                  </div>
                </div>

                <div className="border-2 border-white/30 p-6 hover:border-white transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold">Environmental Damage</h4>
                    <button 
                      onClick={() => toggleReveal('environment')}
                      className="text-sm border border-white/50 px-3 py-1 hover:bg-white hover:text-black transition-all"
                    >
                      {revealedSections.environment ? 'HIDE' : 'REVEAL'}
                    </button>
                  </div>
                  <p className="text-gray-400 mb-3">
                    Fashion is the second-largest polluter globally.
                  </p>
                  <div className="space-y-2">
                    <RedactedText revealed={revealedSections.environment}>
                      <span className="text-gray-300">
                        The fashion industry produces 10% of global carbon emissions—more than international flights and shipping combined. 
                        One cotton t-shirt uses 2,700 liters of water. That's enough for one person to drink for 2.5 years.
                      </span>
                    </RedactedText>
                  </div>
                </div>

                <div className="border-2 border-white/30 p-6 hover:border-white transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold">Labor Exploitation</h4>
                    <button 
                      onClick={() => toggleReveal('labor')}
                      className="text-sm border border-white/50 px-3 py-1 hover:bg-white hover:text-black transition-all"
                    >
                      {revealedSections.labor ? 'HIDE' : 'REVEAL'}
                    </button>
                  </div>
                  <p className="text-gray-400 mb-3">
                    Who made your clothes and how much were they paid?
                  </p>
                  <div className="space-y-2">
                    <RedactedText revealed={revealedSections.labor}>
                      <span className="text-gray-300">
                        75 million people work in garment factories worldwide. Many earn less than $3 per day. 
                        80% are women aged 18-24—your age—working 14-hour days in unsafe conditions.
                      </span>
                    </RedactedText>
                  </div>
                </div>

                <div className="border-2 border-white/30 p-6 hover:border-white transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-bold">Waste & Overproduction</h4>
                    <button 
                      onClick={() => toggleReveal('waste')}
                      className="text-sm border border-white/50 px-3 py-1 hover:bg-white hover:text-black transition-all"
                    >
                      {revealedSections.waste ? 'HIDE' : 'REVEAL'}
                    </button>
                  </div>
                  <p className="text-gray-400 mb-3">
                    Fast fashion means fast waste.
                  </p>
                  <div className="space-y-2">
                    <RedactedText revealed={revealedSections.waste}>
                      <span className="text-gray-300">
                        One garbage truck of textiles is burned or dumped in a landfill every second. 
                        85% of all textiles end up in dumps each year. That's 92 million tons.
                      </span>
                    </RedactedText>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section id="why" className="min-h-screen py-20 px-6 border-t border-white/30 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <AlertTriangle className="w-10 h-10" />
              <h2 className="text-5xl md:text-6xl font-black">WHY IT MATTERS</h2>
              <AlertTriangle className="w-10 h-10" />
            </div>
            <div className="h-1 w-32 bg-white mx-auto mb-8"></div>
            <p className="text-2xl text-gray-300">You deserve to know what you're buying.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black border border-white/30 p-8">
              <Shield className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">For You</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Know if your values match your purchases</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Make informed decisions about sustainability</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Support ethical brands that treat workers fairly</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Stop funding exploitation without knowing it</span>
                </li>
              </ul>
            </div>

            <div className="bg-black border border-white/30 p-8">
              <Globe className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">For The Planet</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Pressure brands to reduce environmental damage</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Trace materials to prevent greenwashing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Enable circular economy & recycling</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Hold corporations accountable for their impact</span>
                </li>
              </ul>
            </div>

            <div className="bg-black border border-white/30 p-8">
              <Users className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">For Workers</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Expose unsafe working conditions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Prove fair wages are being paid</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Prevent child labor and forced labor</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Give garment workers dignity and visibility</span>
                </li>
              </ul>
            </div>

            <div className="bg-black border border-white/30 p-8">
              <Info className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">For Transparency</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>End the era of corporate secrecy</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Verify claims instead of believing marketing</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Create industry-wide accountability</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-white">→</span>
                  <span>Empower consumers with the truth</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-black border-4 border-white p-8 text-center">
            <p className="text-2xl font-bold mb-3">
              The DPP turns hidden information into public knowledge.
            </p>
            <p className="text-xl text-gray-300">
              No more guessing. No more trusting empty promises. Just facts.
            </p>
          </div>
        </div>
      </section>

      {/* How Section */}
      <section id="how" className="min-h-screen py-20 px-6 border-t border-white/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6">HOW IT WORKS</h2>
            <div className="h-1 w-32 bg-white mx-auto mb-8"></div>
            <p className="text-2xl text-gray-300">It's as simple as scan, read, decide.</p>
          </div>

          <div className="space-y-12">
            {[
              {
                num: '01',
                title: 'FIND THE CODE',
                desc: 'Every garment will have a QR code or NFC tag—usually on the label or tag.',
                detail: 'It might be printed, sewn in, or embedded in a chip. The code is unique to that specific item.'
              },
              {
                num: '02',
                title: 'SCAN IT',
                desc: 'Use your phone camera or a dedicated app to scan the code.',
                detail: 'No special equipment needed. If your phone can scan a QR code, you\'re good to go.'
              },
              {
                num: '03',
                title: 'READ THE PASSPORT',
                desc: 'Instant access to the complete history of your clothing.',
                detail: 'Materials, manufacturing locations, certifications, environmental impact, repair info, recycling instructions—it\'s all there.'
              },
              {
                num: '04',
                title: 'MAKE YOUR CHOICE',
                desc: 'Decide if this brand aligns with your values.',
                detail: 'Buy it, leave it, or demand better. The power is in your hands.'
              }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-8 items-start border-l-4 border-white pl-8 hover:border-l-8 transition-all">
                <div className="text-6xl font-black text-white/20 select-none">{step.num}</div>
                <div className="flex-1">
                  <h3 className="text-3xl font-black mb-3">{step.title}</h3>
                  <p className="text-xl text-gray-300 mb-2">{step.desc}</p>
                  <p className="text-gray-500">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="border-2 border-white/30 p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Unlock className="w-6 h-6" />
                What You'll See
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Material composition & origin</li>
                <li>• Factory locations & certifications</li>
                <li>• Worker welfare standards</li>
                <li>• Carbon & water footprint</li>
                <li>• Chemical treatments used</li>
                <li>• Repair & care instructions</li>
                <li>• End-of-life recycling options</li>
              </ul>
            </div>

            <div className="border-2 border-white/30 p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6" />
                What Brands Can't Hide
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Where products actually come from</li>
                <li>• Real environmental costs</li>
                <li>• Worker treatment & wages</li>
                <li>• Use of harmful chemicals</li>
                <li>• Greenwashing vs. reality</li>
                <li>• Supply chain shortcuts</li>
                <li>• True cost of "cheap" fashion</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Truth Section */}
      <section id="truth" className="min-h-screen py-20 px-6 border-t border-white/30 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Camera className="w-16 h-16 mx-auto mb-8" />
          <h2 className="text-5xl md:text-7xl font-black mb-8">THE TRUTH IS COMING</h2>
          <div className="h-1 w-40 bg-white mx-auto mb-12"></div>

          <div className="space-y-8 text-xl leading-relaxed">
            <p className="text-2xl font-semibold">
              For decades, the fashion industry has operated in the shadows.
            </p>
            
            <p className="text-gray-300">
              They've hidden their supply chains, obscured their environmental damage, 
              and profited off exploitation while selling you a story of style and aspiration.
            </p>

            <p className="text-gray-300">
              <span className="text-white font-bold">The Digital Product Passport changes everything.</span> It's 
              not a trend or a marketing gimmick—it's law. By 2030, transparency isn't optional.
            </p>

            <p className="text-gray-300">
              You're generation Z and millennial consumers—you grew up with information at your fingertips. 
              You fact-check, you call out BS, and you demand authenticity.
            </p>

            <p className="text-2xl font-bold text-white">
              Now you'll have the receipts to back it up.
            </p>

            <div className="my-16 bg-black border-4 border-white p-12">
              <p className="text-3xl font-black mb-6">DON'T JUST BUY IT. VERIFY IT.</p>
              <p className="text-lg text-gray-400">
                The fashion industry is about to be exposed. And it all starts with you.
              </p>
            </div>

            <div className="space-y-4 text-gray-400 text-base">
              <p>Want to learn more about Digital Product Passports?</p>
              <p>Stay informed. Stay critical. Stay aware.</p>
              <p className="text-white font-semibold">The truth doesn't need permission.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/30 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="w-6 h-6" />
            <span className="text-2xl font-black">RECEIPTS</span>
          </div>
          <p className="text-gray-500 text-sm">
            An awareness campaign about Digital Product Passports in fashion.
          </p>
          <p className="text-gray-600 text-xs">
            Information sourced from EU DPP regulations, Fashion Revolution, and sustainability research.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ReceiptsWebsite;