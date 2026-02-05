import React, { useState, useEffect } from 'react';
import { Camera, AlertCircle, ShoppingBag, Barcode as BarcodeIcon, ChevronDown, X, FileText, ExternalLink, ScanLine, Database, Recycle, Globe } from 'lucide-react';

// ==========================================
// 1. UI COMPONENTS
// ==========================================

// --- Redacted Text (Hover to Reveal) ---
function Redacted({ children, label = "CENSORED" }) {
  return (
    <span className="relative inline-block cursor-help group mx-1 align-bottom">
      {/* The Block (Covers text) */}
      <span className="absolute inset-0 bg-zinc-100 z-10 flex items-center justify-center transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-2">
        <span className="text-[8px] font-black tracking-widest text-black uppercase select-none">{label}</span>
      </span>
      {/* The Actual Text */}
      <span className="relative z-0 text-white font-mono bg-zinc-900 px-1 decoration-red-500 decoration-wavy underline-offset-4 group-hover:underline">
        {children}
      </span>
    </span>
  );
}

// --- Header Receipt (Real-Time Counter Version) ---
function HeaderReceipt() {
  // Global Damage Counter
  const [globalDamage, setGlobalDamage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalDamage(prev => prev + 4756);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { name: "1x COTTON SHIRT", retail: 14.99, hidden: 21.50, detail: "2,700L WATER" },
    { name: "1x POLYESTER DRESS", retail: 24.99, hidden: 34.20, detail: "200 YRS DECAY" }
  ];

  const retailTotal = items.reduce((acc, item) => acc + item.retail, 0);
  const hiddenTotal = items.reduce((acc, item) => acc + item.hidden, 0);
  const trueTotal = retailTotal + hiddenTotal;

  return (
    <div className="w-80 bg-white text-black shadow-2xl transform rotate-1 font-mono text-xs">
      {/* Receipt Header */}
      <div className="p-6 pb-2 text-center border-b-2 border-dashed border-black mx-4 mt-4">
        <h3 className="text-2xl font-black uppercase tracking-tighter">THE TRUE BILL</h3>
        <p className="opacity-60">FASHION INDUSTRY INC.</p>
        <p>{new Date().toLocaleDateString()} // {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      </div>

      {/* Column Headers */}
      <div className="px-6 py-2 flex justify-between font-bold border-b border-black mx-4">
        <span>ITEM</span>
        <div className="flex gap-4">
          <span className="opacity-50 line-through">RETAIL</span>
          <span>REAL</span>
        </div>
      </div>

      {/* Receipt Body */}
      <div className="p-6 space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col">
            <div className="flex justify-between items-start">
              <span className="font-bold">{item.name}</span>
              <div className="flex gap-4">
                <span className="opacity-50 line-through">${item.retail.toFixed(2)}</span>
                <span className="font-bold text-red-600">${(item.retail + item.hidden).toFixed(2)}</span>
              </div>
            </div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">{item.detail}</span>
          </div>
        ))}
        <div className="border-t border-dashed border-zinc-300 my-2"></div>
        <div className="flex justify-between items-center text-zinc-500">
          <span>LABOR COST (EST)</span>
          <span>$0.03 / PIECE</span>
        </div>
        <div className="flex justify-between items-center text-zinc-500">
          <span>HEALTH IMPACT</span>
          <span>$7.50</span>
        </div>
      </div>

      {/* Totals */}
      <div className="p-6 pt-2 border-t-2 border-black mx-4 mb-2 bg-zinc-50">
        <div className="flex justify-between mb-1 opacity-50">
          <span>YOU PAY:</span>
          <span>${retailTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4 opacity-50">
          <span>PLANET PAYS:</span>
          <span>${hiddenTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-black border-t border-black pt-2">
          <span>TRUE COST</span>
          <span className="text-red-600">${trueTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Live Global Ticker */}
      <div className="bg-black text-white p-4 text-center relative overflow-hidden group">
        <p className="text-[9px] uppercase tracking-widest opacity-80 mb-1">
          Global Industry Damage <br />
          <span className="text-[8px] opacity-60 normal-case">(Since you opened this page)</span>
        </p>
        <div className="font-mono text-xl font-bold text-red-500 animate-pulse">
          ${globalDamage.toLocaleString()}
        </div>
        <a
          href="https://globalfashionagenda.org/thought-leadership/pulse-of-the-fashion-industry/"
          target="_blank"
          rel="noreferrer"
          className="block mt-2 text-[9px] text-zinc-500 underline hover:text-white transition-colors"
        >
          SOURCE: THE CALX INSTITUTE / GFA
        </a>
      </div>
    </div>
  );
}

// --- Article Modal (Pop Out) ---
function ArticleModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-zinc-100 text-black max-w-2xl w-full p-8 relative shadow-2xl transform rotate-1 font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-black/10 rounded-full transition-colors">
          <X size={24} />
        </button>

        <div className="border-b-4 border-black pb-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase tracking-widest">Confidential File</span>
            <span className="opacity-50 text-xs">ID: {article.id}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black uppercase leading-tight">{article.title}</h2>
        </div>

        <div className="prose prose-sm max-w-none font-serif leading-relaxed text-zinc-800 border-b border-zinc-300 pb-6 mb-6">
          <p className="first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
            {article.content}
          </p>
        </div>

        <div className="bg-zinc-200 p-4 border border-zinc-300">
          <h4 className="flex items-center gap-2 font-bold uppercase text-xs mb-3 text-zinc-600">
            <ExternalLink size={12} /> Verified Evidence (Click to View)
          </h4>
          <ul className="space-y-2">
            {article.sources.map((source, idx) => (
              <li key={idx} className="flex justify-between items-center text-xs border-b border-zinc-300 pb-1 last:border-0 group">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-red-600 hover:underline transition-colors flex items-center gap-2"
                >
                  {source.name} <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <span className="opacity-50">{source.year}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 -rotate-12 border-4 border-red-600/20 text-red-600/20 text-6xl font-black p-4 pointer-events-none select-none">
          EXPOSED
        </div>
      </div>
    </div>
  );
}

// --- Fashion Image with "Expose" Overlay ---
function ExposedImage({ src, alt, caption, articleData, onClick }) {
  return (
    <div
      onClick={() => onClick(articleData)}
      className="relative group overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-in-out border border-zinc-800 cursor-pointer"
    >
      <img src={src} alt={alt} className="w-full h-full object-cover aspect-[3/4]" />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500"></div>
      <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-widest transform -rotate-2 group-hover:rotate-0 transition-transform shadow-lg group-hover:bg-black group-hover:border group-hover:border-red-600 group-hover:text-red-600">
        Click to Investigate
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <p className="font-mono text-xs text-red-400 mb-1 flex items-center gap-2">
          <FileText size={12} /> OPEN_CASE_FILE_{articleData.id}
        </p>
        <p className="text-white font-serif italic text-lg leading-tight">{caption}</p>
      </div>
    </div>
  );
}


// ==========================================
// 2. MAIN PAGE
// ==========================================
export default function PressureCookerV1() {
  const [activeArticle, setActiveArticle] = useState(null);

  const articles = {
    transport: {
      id: "LOG_402",
      title: "The 14,000 Mile Journey",
      content: "This seemingly simple cotton shirt has traveled further than most humans do in a year. The cotton was harvested in Xinjiang (under questionable labor conditions), shipped to India for spinning, transported to Bangladesh for weaving, dyed in Vietnam using unregulated chemical processes, and finally flown to Rotterdam for distribution. Each step of this convoluted supply chain adds massive carbon emissions, intentionally designed to chase the lowest possible labor costs regardless of the environmental toll.",
      sources: [
        { name: "Clean Clothes Campaign: Supply Chain", year: "2020", url: "https://cleanclothes.org/news/2020/out-of-the-shadows" },
        { name: "EU Textiles Strategy", year: "2023", url: "https://environment.ec.europa.eu/strategy/textiles-strategy_en" },
        { name: "Global Carbon Project", year: "2024", url: "https://earth.org/fast-fashions-detrimental-effect-on-the-environment/" }
      ]
    },
    toxins: {
      id: "TOX_991",
      title: "Rivers of Color",
      content: "The vibrant blue of this dress comes from Azo dyes, a class of synthetic chemicals that break down into aromatic amines—known carcinogens banned in the EU but rampant in production zones. In manufacturing hubs like Dhaka and Tirupur, local rivers run the color of the season's trends. This untreated wastewater kills aquatic life and poisons the drinking water of millions. When you wash this garment, micro-particles of these toxins are released into your local water system.",
      sources: [
        { name: "Greenpeace 'Detox My Fashion'", year: "2022", url: "https://www.greenpeace.org/international/act/detox/" },
        { name: "Healthy Materials Lab: Water", year: "2023", url: "https://healthymaterialslab.org/tool-guides/textiles-water" },
        { name: "Textile Exchange Report", year: "2024", url: "https://textileexchange.org/knowledge-center/reports/materials-market-report-2024/" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-mono selection:bg-red-600 selection:text-white">

      <ArticleModal article={activeArticle} onClose={() => setActiveArticle(null)} />

      {/* Navigation & Header */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-start pointer-events-none mix-blend-difference text-white">
        <div className="pointer-events-auto mt-2">
          <div className="text-3xl font-black tracking-tighter leading-none">
            RECEIPTS<span className="text-red-600">.</span>
          </div>
          <div className="text-[10px] tracking-[0.3em] opacity-60 mt-1 uppercase">
            Official EU Database
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest pointer-events-auto mt-4 bg-black/50 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
          <a href="#editorial" className="hover:text-red-500 transition-colors">EDITORIAL</a>
          <a href="#truth" className="hover:text-red-500 transition-colors">THE TRUTH</a>
          <a href="#passport" className="hover:text-red-500 transition-colors text-red-500">THE PASSPORT</a>
        </div>
        <div className="w-20 hidden md:block"></div>
      </nav>

      {/* --- HERO SECTION (UPDATED LAYOUT) --- */}
      {/* Changed to flex-col with flex-grow logic. No absolute positioning for scroll indicator. */}
      <section className="relative min-h-screen flex flex-col px-6 md:px-20 pt-24 border-b border-zinc-800">
        
        {/* Main Content (Expands to fill space) */}
        <div className="flex-grow flex items-center w-full z-10">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Title & Text */}
            <div className="space-y-8">
              <p className="text-red-600 font-bold tracking-[0.3em] text-xs animate-pulse">
                ● CLASSIFIED REPORT // EU-DPP-2030
              </p>

              <div className="relative">
                <h1 className="text-6xl md:text-9xl font-serif text-white leading-[0.85]">
                  The Fabric <br />
                  <span className="italic font-light text-zinc-500">of</span> <br />
                  Deception
                </h1>
                
                {/* Receipt - Stacked on Mobile, Right side on Desktop */}
                <div className="mt-8 lg:mt-0 lg:absolute lg:top-0 lg:-right-20 lg:transform lg:translate-x-full lg:rotate-6 z-20">
                  <HeaderReceipt />
                </div>
              </div>

              <div className="max-w-xl text-lg md:text-xl leading-relaxed text-zinc-400 space-y-6 pt-4">
                <p>
                  It looks like high fashion. It costs the Earth.
                  The industry hides its crimes behind glossy magazines and
                  runway shows.
                </p>
                <p>
                  We are here to <Redacted label="REVEAL">expose the supply chain</Redacted>.
                  Welcome to the Digital Product Passport era.
                </p>
              </div>
            </div>

            {/* Right: Spacer */}
            <div className="hidden lg:block"></div>
          </div>
        </div>

        {/* Scroll Indicator (Natural Flow - Always at bottom, never overlapping) */}
        <div className="py-10 flex items-center gap-4 z-20">
          <div className="h-px w-24 bg-zinc-700"></div>
          <span className="text-xs uppercase tracking-widest text-zinc-500">Scroll to Decrypt</span>
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute top-0 right-20 h-full w-px bg-zinc-900 hidden md:block"></div>
        <div className="absolute top-0 right-40 h-full w-px bg-zinc-900 hidden md:block"></div>
      </section>

      {/* --- EDITORIAL GRID --- */}
      <section id="editorial" className="px-6 md:px-20 py-24 border-b border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4 space-y-8 sticky top-32">
            <h2 className="text-4xl font-serif text-white italic">"Sustainability" <br /> is the new trend.</h2>
            <p className="text-sm leading-7">
              But is it real? Brands claim to be green while burning tons of unsold stock.
              The <strong className="text-white">Digital Product Passport (DPP)</strong> forces them to show the receipts.
            </p>
            <div className="border-l-2 border-red-600 pl-4 py-2">
              <p className="text-xs font-bold text-red-500 uppercase mb-1">Leak #402</p>
              <p className="text-white text-lg font-serif">"If they knew where the cotton came from, they wouldn't buy it."</p>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <ExposedImage
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
              caption="This garment traveled 14,000 miles before reaching the store."
              articleData={articles.transport}
              onClick={setActiveArticle}
            />
            <div className="md:pt-24">
              <ExposedImage
                src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964&auto=format&fit=crop"
                caption="Dyed with toxic chemicals illegal in the EU, then shipped back to you."
                articleData={articles.toxins}
                onClick={setActiveArticle}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- THE TRUTH --- */}
      <section id="truth" className="px-6 md:px-20 py-32 min-h-screen flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 text-[20vw] font-black text-zinc-900 opacity-20 pointer-events-none select-none leading-none">
          LIES
        </div>
        <div className="max-w-4xl relative z-10">
          <div className="flex items-center gap-2 mb-8 text-red-600 font-bold tracking-widest text-xs uppercase">
            <AlertCircle size={16} />
            <span>Confidential Information</span>
          </div>
          <div className="text-2xl md:text-4xl leading-[1.6] md:leading-[1.5] font-serif text-zinc-400">
            <p>
              Most fashion brands cannot tell you where their
              <Redacted label="HIDDEN">raw materials</Redacted> come from.
              They rely on a chaotic web of subcontractors to
              <Redacted label="COVER UP">hide exploitation</Redacted>.
            </p>
            <p className="mt-8">
              By 2030, the EU will mandate a
              <span className="text-white border-b border-white mx-2">Digital Passport</span>
              for every item. It will reveal that your favorite €10 t-shirt
              <Redacted label="COST">cost a worker their health</Redacted> and
              <Redacted label="POLLUTION">poisoned a local river</Redacted>.
            </p>
            <p className="mt-8">
              Transparency is no longer a <Redacted label="CHOICE">luxury</Redacted>.
              It is the law.
            </p>
          </div>
        </div>
      </section>

      {/* --- THE PASSPORT SPECS --- */}
      <section id="passport" className="py-24 px-6 md:px-20 border-t border-zinc-800 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12 border-b-2 border-zinc-700 pb-4">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
              THE PASSPORT
            </h2>
            <span className="text-red-600 font-mono font-bold tracking-widest text-xs mb-2">
              // TECHNICAL_SPECS
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8 text-lg text-zinc-400 font-serif leading-relaxed">
              <p>
                The <strong className="text-white">Digital Product Passport (DPP)</strong> is a digital record that tracks a product's entire lifecycle.
              </p>
              <p>
                Just like a human passport, it identifies where the item has been, what it is made of, and who handled it.
                Accessible via a scannable QR code on the garment, it forces brands to upload verified data to a blockchain, making the history impossible to delete.
              </p>
              <div className="p-4 border border-red-900/50 bg-red-900/10 text-red-400 text-sm font-mono mt-4">
                WARNING: Any brand failing to comply by 2030 will be banned from the EU market.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
              <div className="border border-zinc-700 p-6 hover:bg-zinc-800 transition-colors group cursor-crosshair">
                <ScanLine className="w-8 h-8 text-zinc-500 mb-4 group-hover:text-white transition-colors" />
                <h4 className="text-white font-bold mb-2">TRACEABILITY</h4>
                <p className="text-xs text-zinc-500 uppercase leading-relaxed">
                  Complete map of the supply chain from raw material extraction to final retail.
                </p>
              </div>
              <div className="border border-zinc-700 p-6 hover:bg-zinc-800 transition-colors group cursor-crosshair">
                <Database className="w-8 h-8 text-zinc-500 mb-4 group-hover:text-white transition-colors" />
                <h4 className="text-white font-bold mb-2">COMPOSITION</h4>
                <p className="text-xs text-zinc-500 uppercase leading-relaxed">
                  Exact percentage breakdown of fibers, chemicals, and dyes used.
                </p>
              </div>
              <div className="border border-zinc-700 p-6 hover:bg-zinc-800 transition-colors group cursor-crosshair">
                <Recycle className="w-8 h-8 text-zinc-500 mb-4 group-hover:text-white transition-colors" />
                <h4 className="text-white font-bold mb-2">CIRCULARITY</h4>
                <p className="text-xs text-zinc-500 uppercase leading-relaxed">
                  Instructions for repair, disassembly, and recycling at end-of-life.
                </p>
              </div>
              <div className="border border-zinc-700 p-6 hover:bg-zinc-800 transition-colors group cursor-crosshair">
                <Globe className="w-8 h-8 text-zinc-500 mb-4 group-hover:text-white transition-colors" />
                <h4 className="text-white font-bold mb-2">FOOTPRINT</h4>
                <p className="text-xs text-zinc-500 uppercase leading-relaxed">
                  Calculated Carbon & Water impact verified by third-party auditors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ACTION SECTION --- */}
      <section id="action" className="py-24 border-t border-zinc-800 bg-black text-center">
        <div className="max-w-xl mx-auto px-6">
          <BarcodeIcon className="w-24 h-24 mx-auto text-white mb-6" />
          <h2 className="text-4xl font-black uppercase mb-4 text-white">Verify Your Reality</h2>
          <p className="text-zinc-500 mb-8">
            Don't trust the label. Scan the code. <br />
            The Digital Product Passport is coming.
          </p>
          <a
            href="https://data.europa.eu/en/news-events/news/eus-digital-product-passport-advancing-transparency-and-sustainability"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
          >
            Read Official Documentation
          </a>
        </div>
      </section>

    </div>
  );
}