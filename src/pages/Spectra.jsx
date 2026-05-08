import { useEffect, useRef } from "react";
import SpectraLogo from "../assets/Logo_White&Green_TransperentBG.png";

const GSAP_CDN = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
const ST_CDN   = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";

function loadScript(src) {
  return new Promise((res) => {
    if (document.querySelector(`script[src="${src}"]`)) return res();
    const s = document.createElement("script");
    s.src = src; s.onload = res;
    document.head.appendChild(s);
  });
}

export default function SpectraPage() {
  const cursorRef     = useRef(null);
  const cursorRingRef = useRef(null);
  const portTrackRef  = useRef(null);
  const initialized   = useRef(false);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let ringX = mouseX, ringY = mouseY;
    let rafId;

    const onMouseMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mouseX + "px";
        cursorRef.current.style.top  = mouseY + "px";
      }
    };

    function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = ringX + "px";
        cursorRingRef.current.style.top  = ringY + "px";
      }
      rafId = requestAnimationFrame(animateRing);
    }
    animateRing();
    document.addEventListener("mousemove", onMouseMove);

    loadScript(GSAP_CDN).then(() => loadScript(ST_CDN)).then(() => {
      const { gsap, ScrollTrigger } = window;
      gsap.registerPlugin(ScrollTrigger);

      const rootEl = document.getElementById("sp-root-scroll");

      // MAGNETIC fields
      document.querySelectorAll(".sp-field-item, .sp-nav-links a").forEach((el) => {
        el.addEventListener("mouseenter", () => cursorRingRef.current?.classList.add("sp-magnetic"));
        el.addEventListener("mouseleave", () => {
          cursorRingRef.current?.classList.remove("sp-magnetic");
          gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1,0.4)" });
        });
        el.addEventListener("mousemove", (e) => {
          const r  = el.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width  / 2)) * 0.18;
          const dy = (e.clientY - (r.top  + r.height / 2)) * 0.18;
          gsap.to(el, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
        });
      });

      // HERO entrance
      gsap.timeline({ delay: 0.3 })
        .fromTo("#sp-hero-logo",    { scale: 1.1, opacity: 0, filter: "blur(10px)" },
                                    { scale: 1,   opacity: 1, filter: "blur(0px)", duration: 1.4, ease: "expo.out" })
        .fromTo(".sp-hero-eyebrow", { y: 20, opacity: 0 }, { y: 0, opacity: 1,   duration: 0.8, ease: "power3.out" }, "-=0.6")
        .fromTo("#sp-hero-sub",     { y: 20, opacity: 0 }, { y: 0, opacity: 0.7, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .fromTo("#sp-hero-cta",     { y: 20, opacity: 0 }, { y: 0, opacity: 1,   duration: 0.8, ease: "power3.out" }, "-=0.3")
        .fromTo(".sp-nav-logo",     { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
        .fromTo(".sp-nav-links",    { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.3");

      // Pinned hero logo shrink
      gsap.to("#sp-hero-logo", {
        scale: 0.4, opacity: 0, y: -60, ease: "power2.inOut",
        scrollTrigger: { scroller: rootEl, trigger: "#sp-hero", start: "top top", end: "bottom top", scrub: true },
      });

      // Nav background on scroll
      ScrollTrigger.create({
        scroller: rootEl, trigger: "#sp-hero", start: "top top", end: "bottom top", scrub: true,
        onUpdate: (self) => {
          document.getElementById("sp-navbar")?.classList.toggle("sp-scrolled", self.progress > 0.1);
        },
      });

      // Headline word split
      const words = "Decades of Experience. Driven by Innovation.".split(" ");
      const hEl   = document.getElementById("sp-headline-text");
      if (hEl) {
        hEl.innerHTML = words
          .map(w => `<span style="overflow:hidden;display:inline-block"><span class="sp-word" style="display:inline-block;transform:translateY(110%)">${w}&nbsp;</span></span>`)
          .join("");
        gsap.to(".sp-word", {
          y: 0, stagger: 0.06, duration: 0.9, ease: "expo.out",
          scrollTrigger: { scroller: rootEl, trigger: "#sp-headline", start: "top 75%", toggleActions: "play none none reverse" },
        });
      }

      // Counters
      document.querySelectorAll(".sp-count").forEach((el) => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: parseInt(el.dataset.target), duration: 2, ease: "power2.out",
          onUpdate: () => { el.textContent = Math.floor(obj.val); },
          scrollTrigger: { scroller: rootEl, trigger: "#sp-experience", start: "top 70%", toggleActions: "play none none none" },
        });
      });
      gsap.fromTo(".sp-exp-card", { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { scroller: rootEl, trigger: "#sp-experience", start: "top 70%", toggleActions: "play none none reverse" },
      });

      // Horizontal portfolio scroll - FIXED JITTER
      const track = portTrackRef.current;
      if (track) {
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 80);
        
        gsap.to(track, {
          x: getScrollAmount, 
          ease: "none",
          scrollTrigger: { 
            scroller: rootEl, 
            trigger: "#sp-portfolio", 
            pin: true,
            pinType: "transform", // THIS IS THE MAGIC FIX FOR JITTER IN CUSTOM SCROLLERS
            start: "top top", 
            end: () => `+=${track.scrollWidth}`, 
            scrub: 1,
            invalidateOnRefresh: true 
          },
        });
        
        gsap.fromTo(".sp-port-card", { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power2.out",
          scrollTrigger: { scroller: rootEl, trigger: "#sp-portfolio", start: "top 80%", toggleActions: "play none none reverse" },
        });
      }

      // Fields
      gsap.fromTo(".sp-field-item", { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, stagger: 0.12, duration: 0.9, ease: "power3.out",
        scrollTrigger: { scroller: rootEl, trigger: "#sp-fields", start: "top 70%", toggleActions: "play none none reverse" },
      });

      // Drive
      gsap.fromTo(".sp-drive-heading", { opacity: 0, y: 80 }, {
        opacity: 1, y: 0, duration: 1.2, ease: "expo.out",
        scrollTrigger: { scroller: rootEl, trigger: "#sp-drive", start: "top 70%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(".sp-drive-body", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2,
        scrollTrigger: { scroller: rootEl, trigger: "#sp-drive", start: "top 70%", toggleActions: "play none none reverse" },
      });

      // Hero bg lines parallax
      gsap.to(".sp-hero-bg-line", {
        y: -120, ease: "none",
        scrollTrigger: { scroller: rootEl, trigger: "#sp-hero", start: "top top", end: "bottom top", scrub: 1 },
      });

      // Footer
      gsap.fromTo(".sp-footer", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { scroller: rootEl, trigger: "#sp-footer", start: "top 90%", toggleActions: "play none none reverse" },
      });

      ScrollTrigger.refresh();
    });

    return () => {
      document.body.style.cursor = prevCursor;
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(t => t.kill());
      initialized.current = false;
    };
  }, []);

  return (
    <>
      <style>{`
        /* IMPORT NEGAN FONT */
        @font-face {
          font-family: 'Negan';
          src: url('/fonts/Negan.woff2') format('woff2'),
               url('/fonts/Negan.woff') format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        .sp-root *, .sp-root *::before, .sp-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .sp-root {
          --sp-black: #0A0903; --sp-pink: #F7F0F5; --sp-lime: #C6F91F;
          background: var(--sp-black); color: var(--sp-pink);
          font-family: 'Negan', sans-serif;
          height: 100vh; overflow-y: auto; overflow-x: hidden;
          position: relative; cursor: none; scroll-behavior: smooth;
        }

        .sp-cursor {
          position: fixed; width: 12px; height: 12px; border-radius: 50%;
          background: #C6F91F; pointer-events: none; z-index: 99999;
          transform: translate(-50%, -50%); mix-blend-mode: difference;
        }
        .sp-cursor-ring {
          position: fixed; width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid #C6F91F; pointer-events: none; z-index: 99998;
          transform: translate(-50%, -50%); mix-blend-mode: difference;
          transition: width .3s, height .3s, background .3s;
        }
        .sp-cursor-ring.sp-magnetic { width: 80px; height: 80px; background: rgba(198,249,31,0.08); }

        .sp-root::before {
          content: ''; position: absolute; inset: 0; pointer-events: none; z-index: 9000; opacity: 0.45;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        }

        #sp-navbar {
          position: sticky; top: 0; z-index: 500;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(24px,4vw,64px); height: 80px;
          background: transparent;
          transition: background .4s, border-color .4s;
          border-bottom: 1px solid transparent;
        }
        #sp-navbar.sp-scrolled {
          background: rgba(10,9,3,0.92); backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(198,249,31,0.15);
        }
        
        /* Nav Logo Styling */
        .sp-nav-logo img { height: 32px; width: auto; opacity:0; object-fit: contain; }
        
        .sp-nav-links { display:flex; gap:clamp(16px,3vw,48px); list-style:none; opacity:0; }
        .sp-nav-links a { color:var(--sp-pink); text-decoration:none; font-size:12px; letter-spacing:1px; text-transform:uppercase; opacity:.6; transition:opacity .2s,color .2s; cursor:none; display:inline-block; }
        .sp-nav-links a:hover { opacity:1; color:var(--sp-lime); }

        #sp-hero { position:relative; height:100vh; display:flex; align-items:center; justify-content:center; overflow:hidden; margin-top:-80px; }
        .sp-hero-bg-line { position:absolute; top:0; bottom:0; width:1px; background:rgba(247,240,245,0.06); }
        .sp-hero-content { position:relative; z-index:2; text-align:center; padding:0 24px; display: flex; flex-direction: column; align-items: center; }
        .sp-hero-eyebrow { font-size:11px; letter-spacing:4px; text-transform:uppercase; color:var(--sp-lime); margin-bottom:40px; opacity:0; display:block; }
        
        /* Hero Logo Image Styling */
        .sp-hero-logo { width: clamp(280px, 50vw, 800px); max-width: 100%; will-change:transform; display: block; }
        
        .sp-hero-sub { font-size:clamp(18px,2.5vw,32px); color:var(--sp-pink); margin-top:32px; opacity:0; font-weight: 300; }
        .sp-hero-cta { display:inline-block; margin-top:48px; padding:14px 40px; border:1px solid var(--sp-lime); color:var(--sp-lime); font-size:12px; letter-spacing:2px; text-transform:uppercase; text-decoration:none; opacity:0; transition:background .3s,color .3s; cursor:none; }
        .sp-hero-cta:hover { background:var(--sp-lime); color:var(--sp-black); }
        .sp-scroll-indicator { position:absolute; bottom:40px; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:8px; font-size:10px; letter-spacing:3px; text-transform:uppercase; opacity:.4; }
        .sp-scroll-line { width:1px; height:60px; background:linear-gradient(to bottom,var(--sp-pink),transparent); animation:sp-pulse 2s ease-in-out infinite; }
        @keyframes sp-pulse { 0%,100%{opacity:.4;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.2)} }

        #sp-headline { padding:160px clamp(24px,8vw,120px); }
        .sp-label { font-size:11px; letter-spacing:4px; text-transform:uppercase; color:var(--sp-lime); margin-bottom:40px; display:block; }
        .sp-headline-text { font-size:clamp(36px,5vw,72px); line-height:1.2; color:var(--sp-pink); font-weight: 600; }

        #sp-experience { padding:120px clamp(24px,8vw,120px); border-top:1px solid rgba(247,240,245,.08); }
        .sp-exp-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(16px,4vw,60px); }
        @media(max-width:768px){ .sp-exp-grid { grid-template-columns:1fr; } }
        .sp-exp-card { border-left:1px solid rgba(198,249,31,.3); padding-left:clamp(16px,2vw,32px); }
        .sp-exp-number { font-size:clamp(64px,8vw,120px); color:var(--sp-lime); line-height:1; font-weight: 700; }
        .sp-exp-plus { color:var(--sp-pink); opacity:.4; }
        .sp-exp-label { font-size:clamp(13px,1.2vw,16px); letter-spacing:1px; color:var(--sp-pink); opacity:.7; margin-top:8px; line-height:1.5; text-transform: uppercase; }
        .sp-exp-field { font-size:clamp(22px,3vw,40px); color:var(--sp-pink); margin-top:4px; font-weight: 500; }

        #sp-portfolio { padding:0; overflow:hidden; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; }
        .sp-port-header { padding:0 clamp(24px,8vw,120px); margin-bottom:60px; }
        .sp-port-header h2 { font-size:clamp(40px,6vw,90px); letter-spacing:.02em; color:var(--sp-pink); text-transform: uppercase; font-weight: 700; }
        .sp-port-header h2 span { color:var(--sp-lime); }
        .sp-port-track-outer { overflow:hidden; }
        .sp-port-track { display:flex; gap:32px; width:max-content; padding:0 clamp(24px,8vw,120px); will-change:transform; }
        .sp-port-card { width:clamp(280px,28vw,440px); flex-shrink:0; }
        
        .sp-port-card-inner { aspect-ratio:3/4; background:rgba(247,240,245,.04); border:1px solid rgba(247,240,245,.1); position:relative; overflow:hidden; display:flex; align-items:flex-end; padding:24px; transition:all .3s; cursor:none; }
        .sp-port-card-inner:hover { border-color:var(--sp-lime); }
        .sp-port-card-bg { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:clamp(80px,12vw,180px); opacity:.04; color:var(--sp-pink); user-select:none; white-space:nowrap; transition:all .3s; font-weight: 800; }
        .sp-port-card-label { position:relative; z-index:1; }
        .sp-port-card-label span { display:block; font-size:10px; letter-spacing:3px; text-transform:uppercase; color:var(--sp-lime); margin-bottom:6px; }
        .sp-port-card-label h3 { font-size:clamp(20px,2vw,28px); color:var(--sp-pink); font-weight:500; transition:color .3s; }
        .sp-port-card-num { position:absolute; top:24px; right:24px; font-size:12px; letter-spacing:2px; color:var(--sp-pink); opacity:.3; transition:all .3s; font-weight: bold; }

        /* ACTIVE PHASE STYLING */
        .sp-port-card-inner.sp-active-phase { border-color: var(--sp-lime); background: rgba(198,249,31,0.08); }
        .sp-port-card-inner.sp-active-phase .sp-port-card-bg { color: var(--sp-lime); opacity: 0.12; }
        .sp-port-card-inner.sp-active-phase h3 { color: var(--sp-lime); }
        .sp-port-card-inner.sp-active-phase .sp-port-card-num { color: var(--sp-lime); opacity: 1; }

        #sp-fields { padding:160px clamp(24px,8vw,120px); border-top:1px solid rgba(247,240,245,.08); }
        .sp-fields-top { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:100px; flex-wrap:wrap; gap:32px; }
        .sp-fields-headline { font-size:clamp(36px,5vw,72px); letter-spacing:.02em; color:var(--sp-pink); line-height:1.1; font-weight: 700; text-transform: uppercase; }
        .sp-fields-headline span { color:var(--sp-lime); }
        .sp-fields-sub { max-width:300px; font-size:14px; line-height:1.7; opacity:.6; }
        .sp-field-item { display:flex; align-items:center; justify-content:space-between; padding:clamp(24px,3vw,48px) 0; border-top:1px solid rgba(247,240,245,.1); cursor:none; position:relative; overflow:hidden; }
        .sp-field-item::after { content:''; position:absolute; inset:0; background:var(--sp-lime); transform:translateX(-101%); transition:transform .5s cubic-bezier(.77,0,.175,1); z-index:0; }
        .sp-field-item:hover::after { transform:translateX(0); }
        .sp-field-name { font-size:clamp(28px,4vw,64px); color:var(--sp-pink); font-weight:500; position:relative; z-index:1; transition:color .3s; }
        .sp-field-num  { font-size:12px; letter-spacing:3px; opacity:.4; position:relative; z-index:1; transition:color .3s; color:var(--sp-pink); font-weight: bold; }
        .sp-field-arrow { font-size:clamp(18px,2vw,28px); position:relative; z-index:1; transition:color .3s, transform .3s; color:var(--sp-pink); }
        .sp-field-item:hover .sp-field-name,
        .sp-field-item:hover .sp-field-num,
        .sp-field-item:hover .sp-field-arrow { color: var(--sp-black); }
        .sp-field-item:hover .sp-field-arrow { transform: translateX(8px) rotate(-45deg); }

        #sp-drive { padding:160px clamp(24px,8vw,120px); display:grid; grid-template-columns:1fr 1fr; gap:clamp(40px,8vw,120px); align-items:center; border-top:1px solid rgba(247,240,245,.08); }
        @media(max-width:768px){ #sp-drive { grid-template-columns:1fr; } }
        .sp-drive-heading { font-size:clamp(48px,6vw,96px); letter-spacing:.02em; line-height:1; color:var(--sp-pink); font-weight: 700; text-transform: uppercase; }
        .sp-drive-heading em { font-style:normal; color:var(--sp-lime); display:block; }
        .sp-drive-body p { font-size:clamp(15px,1.2vw,17px); line-height:1.9; opacity:.7; margin-bottom:20px; }
        .sp-drive-stat { margin-top:48px; display:flex; gap:32px; }
        .sp-d-stat { border-left:2px solid var(--sp-lime); padding-left:16px; }
        .sp-d-stat-num { font-size:48px; color:var(--sp-lime); line-height:1; font-weight: 700; }
        .sp-d-stat-label { font-size:11px; letter-spacing:2px; text-transform:uppercase; opacity:.6; margin-top:8px; font-weight: bold; }

        .sp-footer { padding:80px clamp(24px,8vw,120px); border-top:1px solid rgba(247,240,245,.08); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:32px; }
        .sp-footer-logo img { max-width: 200px; height: auto; opacity: 0.2; }
        .sp-footer-cta { display:flex; flex-direction:column; align-items:flex-end; gap:8px; }
        .sp-footer-cta p { font-size:11px; letter-spacing:2px; text-transform:uppercase; opacity:.5; }
        .sp-footer-link { font-size:clamp(24px,3vw,40px); color:var(--sp-lime); opacity:.8; font-weight: 600; }
      `}</style>

      <div ref={cursorRef}     className="sp-cursor" />
      <div ref={cursorRingRef} className="sp-cursor-ring" />

      <div className="sp-root" id="sp-root-scroll">

        <nav id="sp-navbar">
          <div className="sp-nav-logo">
            {/* Nav Image Logo */}
            <img src={SpectraLogo} alt="Spectra" className="sp-nav-logo-img" />
          </div>
          <ul className="sp-nav-links">
            <li><a href="#sp-portfolio" onClick={(e) => scrollToSection(e, "sp-portfolio")}>Process</a></li>
            <li><a href="#sp-fields" onClick={(e) => scrollToSection(e, "sp-fields")}>Fields</a></li>
            <li><a href="#sp-drive" onClick={(e) => scrollToSection(e, "sp-drive")}>About</a></li>
          </ul>
        </nav>

        <section id="sp-hero">
          <div className="sp-hero-bg-line" style={{ left: "20%" }} />
          <div className="sp-hero-bg-line" style={{ left: "40%" }} />
          <div className="sp-hero-bg-line" style={{ left: "60%" }} />
          <div className="sp-hero-bg-line" style={{ left: "80%" }} />
          <div className="sp-hero-content">
            <p className="sp-hero-eyebrow">School Project Team — Est. about a week ago</p>
            {/* Hero Image Logo replaces H1 text */}
            <img src={SpectraLogo} alt="Spectra" className="sp-hero-logo" id="sp-hero-logo" />
            <p className="sp-hero-sub" id="sp-hero-sub">We exist at the edge of comfort zones.</p>
            <a href="#sp-portfolio" onClick={(e) => scrollToSection(e, "sp-portfolio")} className="sp-hero-cta" id="sp-hero-cta">Explore Our Journey</a>
          </div>
          <div className="sp-scroll-indicator">
            <div className="sp-scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        <section id="sp-headline">
          <span className="sp-label">Our Manifesto</span>
          <h2 className="sp-headline-text" id="sp-headline-text" />
        </section>

        <section id="sp-experience">
          <p className="sp-label">Combined Legacy</p>
          <div className="sp-exp-grid">
            {[{ n: 30, label: "Design" }, { n: 20, label: "Video Production" }, { n: 14, label: "Web Development" }].map(({ n, label }) => (
              <div className="sp-exp-card" key={label}>
                <div className="sp-exp-number">
                  <span className="sp-count" data-target={n}>0</span>
                  <span className="sp-exp-plus">+</span>
                </div>
                <div className="sp-exp-label">Years of</div>
                <div className="sp-exp-field">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="sp-portfolio">
          <div className="sp-port-header"><h2>Project <span>Journey</span></h2></div>
          <div className="sp-port-track-outer">
            <div className="sp-port-track" ref={portTrackRef}>
              {[
                { num: "01", cat: "Phase 1 (Current)", title: "Team & Client Comm", bg: "START", active: true },
                { num: "02", cat: "Phase 2", title: "First Client Pitch",    bg: "PITCH", active: false },
                { num: "03", cat: "Phase 3", title: "Design Prototyping",    bg: "FIGMA", active: false },
                { num: "04", cat: "Phase 4", title: "GSAP Animation",        bg: "CODE",  active: false },
                { num: "05", cat: "Phase 5", title: "Final Delivery",        bg: "DONE",  active: false },
              ].map(({ num, cat, title, bg, active }) => (
                <div className="sp-port-card" key={num}>
                  <div className={`sp-port-card-inner ${active ? 'sp-active-phase' : ''}`}>
                    <div className="sp-port-card-bg">{bg}</div>
                    <span className="sp-port-card-num">{num}</span>
                    <div className="sp-port-card-label"><span>{cat}</span><h3>{title}</h3></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sp-fields">
          <div className="sp-fields-top">
            <div>
              <span className="sp-label">Exploration Fields</span>
              <h2 className="sp-fields-headline">Where<br />We <span>Thrive</span></h2>
            </div>
            <p className="sp-fields-sub">Three disciplines. One relentless drive to challenge, adapt, and create beyond expectations.</p>
          </div>
          <div>
            {[{ n: "01", name: "Brand Identity" }, { n: "02", name: "Illustration" }, { n: "03", name: "Visual Storytelling" }].map(({ n, name }) => (
              <div className="sp-field-item" key={n}>
                <span className="sp-field-num">{n}</span>
                <span className="sp-field-name">{name}</span>
                <span className="sp-field-arrow">→</span>
              </div>
            ))}
          </div>
        </section>

        <section id="sp-drive">
          <div>
            <span className="sp-label">What Drives Us</span>
            <h2 className="sp-drive-heading">Challenge<br /><em>Habits.</em>Master<br />New Craft.</h2>
          </div>
          <div className="sp-drive-body">
            <p>Spectra was born from a refusal to become comfortable. With decades of combined mastery across design, film, and code — we deliberately challenge our own habits to stay sharp.</p>
            <p>Veteran skill means nothing if it calcifies. We bring the technical depth of long experience with the curiosity of a studio seeing the world fresh every morning.</p>
            <p>Every project is a chance to push against our own limits — to take what we've built over 30+ years and prove it can still surprise us.</p>
            <div className="sp-drive-stat">
              <div className="sp-d-stat"><div className="sp-d-stat-num">64</div><div className="sp-d-stat-label">Years Combined</div></div>
              <div className="sp-d-stat"><div className="sp-d-stat-num">∞</div><div className="sp-d-stat-label">New Horizons</div></div>
            </div>
          </div>
        </section>

        <footer id="sp-footer" className="sp-footer">
          <div className="sp-footer-logo">
            {/* Footer Image Logo */}
            <img src={SpectraLogo} alt="Spectra" />
          </div>
          <div className="sp-footer-cta">
            <p>School Project 2026</p>
            <span className="sp-footer-link">Team Spectra</span>
          </div>
        </footer>

      </div>
    </>
  );
}