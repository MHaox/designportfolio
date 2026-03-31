import React, { useState, useMemo, useEffect, useRef } from 'react';
import '../ResourceHub.css';

const ResourceHub = ({ sendPrompt = (msg) => console.log(msg) }) => {
  // --- Refs & State ---
  const searchInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('cmd-theme');
    return savedTheme === 'dark';
  });

  // Initialize favorites from LocalStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('cmd-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Data ---
  const data = [
    { name: "Feed Forward", url: "https://app.ffwd.school/", desc: "Feedback from teachers on your work", cat: "Platform" },
    { name: "CMDLWD", url: "https://www.cmdwld.com/people/", desc: "Find a teacher or CMD staff member", cat: "Platform" },
    { name: "YOS", url: "https://yos.nhlstenden.com/dashboard", desc: "Your schedule and study progress", cat: "Platform" },
    { name: "RUN CMD", url: "https://svruncmd.nl/859e3198fbc6414091a45ea24336e9ed", desc: "CMD study association", cat: "Platform" },
    { name: "Student counseling (NL)", url: "https://newuniversity.sharepoint.com/sites/studentendecanaat/SitePages/Home.aspx", desc: "Study-related questions, personal challenges, or brainstorming", cat: "Support" },
    { name: "Student counseling (EN)", url: "https://newuniversity.sharepoint.com/sites/studentendecanaat/SitePages/en/Home.aspx", desc: "Study-related questions, personal challenges, or brainstorming", cat: "Support" },
    { name: "GIMP", url: "https://www.gimp.org", desc: "Free open-source alternative to Photoshop", cat: "Tools" },
    { name: "Krita", url: "https://krita.org/en/", desc: "Free open-source digital painting program", cat: "Tools" },
    { name: "Blender", url: "https://www.blender.org", desc: "Free open-source 3D modeling and animation", cat: "Tools" },
    { name: "DaVinci Resolve", url: "https://www.blackmagicdesign.com/products/davinciresolve", desc: "Free professional video editing software", cat: "Tools" },
    { name: "Inkscape", url: "https://inkscape.org", desc: "Free open-source vector graphics editor", cat: "Tools" },
    { name: "Figma", url: "https://www.figma.com/login", desc: "UX/UI design tool, free tier available", cat: "Tools" },
  ];

  const infoItems = [
    { name: "Portfolio info", desc: "Growth portfolio / learning goals · Design portfolio · Dream portfolio", cat: "Info" },
    { name: "Software overview", desc: "Adobe suite, Blender, and open-source alternatives", cat: "Info" },
    { name: "Competency methods", desc: "Methods and resources per competency", cat: "Info" },
    { name: "Clubs & exchanges", desc: "Student clubs and exchange programs", cat: "Info" },
    { name: "Academic calendar", desc: "Important dates, periods, and deadlines", cat: "Info" },
    { name: "Tips from 2nd years", desc: "Advice from Saskia and 2nd year community reps", cat: "Info" },
  ];

  const allItems = [...data, ...infoItems];
  const cats = ["All", "Platform", "Support", "Tools", "Info"];
  const platformsCMD = ["Outlook", "Teams", "Intranet", "Sharepoint", "Blackboard", "Fastforward", "CMDLWD", "YOS", "Period guide", "Insta/Whatsapp", "Notion"];

  const sectionLabels = { Platform: "Platforms", Support: "Student support", Tools: "Free & open-source tools", Info: "Practical info" };

  // --- Effects ---
  // Save favorites to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cmd-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Keyboard shortcut listener ('/' to search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  // Apply Dark Mode to the whole page body
  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('cmd-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem('cmd-theme', 'light');
    }
  }, [isDarkMode]);

  // --- Logic ---
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return allItems.filter(item => {
      const matchCat = activeFilter === "All" || item.cat === activeFilter;
      const matchQ = !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [searchQuery, activeFilter]);

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.cat]) acc[item.cat] = [];
    acc[item.cat].push(item);
    return acc;
  }, {});

  const favoriteItems = allItems.filter(item => favorites.includes(item.name));

  const toggleFavorite = (e, name) => {
    e.stopPropagation(); // Prevents the card click event from firing
    setFavorites(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]);
  };

  const getTagClass = (cat) => `tag tag-${cat.toLowerCase()}`;
  const getShortUrl = (url) => url ? url.replace(/^https?:\/\//, "").split("/")[0] : "";

  const handleCardClick = (item) => {
    if (item.url) window.open(item.url, '_blank');
    else sendPrompt(`Tell me more about ${item.name}`);
  };

  // Shared Card Component
  const RenderCard = ({ item }) => {
    const isFav = favorites.includes(item.name);
    return (
      <div className="card" onClick={() => handleCardClick(item)}>
        <div className="card-top">
          <span className={getTagClass(item.cat)}>{item.cat}</span>
          <button
            className={`fav-btn ${isFav ? 'active' : ''}`}
            onClick={(e) => toggleFavorite(e, item.name)}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            {isFav ? '★' : '☆'}
          </button>
        </div>
        <div className="card-name">{item.name}</div>
        <div className="card-desc">{item.desc}</div>
        {item.url && <div className="card-url">{getShortUrl(item.url)}</div>}
      </div>
    );
  };

  return (
    <div className="hub">

      {/* Header & Dark Mode Toggle */}
      <div className="hub-header">
        <h1>CMD Resource Hub</h1>
        <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <span className="search-icon">⌕</span>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search resources... (Press '/' to focus)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-btn" onClick={() => setSearchQuery('')}>✕</button>
        )}
      </div>

      {/* Filters */}
      <div className="filters">
        {cats.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div id="results">
        {/* Pinned Favorites Section */}
        {favoriteItems.length > 0 && !searchQuery && activeFilter === 'All' && (
          <div className="favorites-section">
            <div className="section-label">My Favorites ⭐️</div>
            <div className="cards mb-extra">
              {favoriteItems.map((item, idx) => <RenderCard key={`fav-${idx}`} item={item} />)}
            </div>
          </div>
        )}

        {/* Quick Search Platforms */}
        {!searchQuery && activeFilter === "All" && (
          <div className="platforms-section">
            <p className="quick-search-label">All platforms at CMD (Quick Search)</p>
            <div className="quick-tags-container">
              {platformsCMD.map(p => (
                <button key={p} className="platform-quick-tag" onClick={() => setSearchQuery(p)}>{p}</button>
              ))}
            </div>
          </div>
        )}

        {/* Categorized Results */}
        {filteredItems.length === 0 ? (
          <div className="empty">No resources match your search.</div>
        ) : (
          ["Platform", "Support", "Tools", "Info"].map(cat => {
            if (!groupedItems[cat]) return null;
            return (
              <div key={cat}>
                <div className="section-label">{sectionLabels[cat]}</div>
                <div className="cards">
                  {groupedItems[cat].map((item, idx) => <RenderCard key={idx} item={item} />)}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Suggest a Resource CTA */}
      <div className="suggest-cta">
        <p>Found a great open-source tool or missing a platform?</p>
        <button onClick={() => window.location.href = "mailto:mhaox.dev@gmail.com"}>
          Suggest a Resource
        </button>
      </div>

    </div>
  );
};

export default ResourceHub;