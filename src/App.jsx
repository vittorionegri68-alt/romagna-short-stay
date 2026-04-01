import { useState, useEffect, useRef } from "react";
import { strutture } from "./strutture.js";
import { posts } from "./posts.js";

// ── Color tokens ──────────────────────────────────────────────────────────────
const C = {
  bg:       "#faf8f4",
  bg2:      "#f3efe8",
  bg3:      "#ede8de",
  text:     "#1a1612",
  textMid:  "#5a5248",
  textSoft: "#9a9088",
  gold:     "#a0782a",
  border:   "rgba(160,120,42,0.15)",
  cardBg:   "#ffffff",
  shadow:   "0 4px 24px rgba(26,22,18,0.08)",
};

// ── Scroll reveal ─────────────────────────────────────────────────────────────
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>{children}</div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? "rgba(250,248,244,0.97)" : "rgba(250,248,244,0.88)",
      backdropFilter: "blur(14px)",
      borderBottom: `1px solid ${scrolled ? "rgba(160,120,42,0.18)" : "rgba(160,120,42,0.07)"}`,
      transition: "all 0.4s ease",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo / Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
          <div style={{ width: 32, height: 32, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 800, fontFamily: "'DM Sans',sans-serif" }}>R</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.05rem", color: C.gold, fontWeight: 700, letterSpacing: "0.06em", lineHeight: 1 }}>ROMAGNA</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.56rem", color: C.textSoft, letterSpacing: "0.22em", textTransform: "uppercase", lineHeight: 1, marginTop: 2 }}>Short Rentals</div>
          </div>
        </div>
        {/* Tagline */}
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: C.textSoft, letterSpacing: "0.1em", display: "none" }} className="nav-tagline">
          The best accommodations in Romagna
        </div>
        {/* CTA */}
        <a href="mailto:vittorio_negri@hotmail.com"
          style={{ background: C.gold, color: "#fff", padding: "0.45rem 1.1rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#8a6520"}
          onMouseLeave={e => e.currentTarget.style.background = C.gold}>
          <span className="nav-cta-long">List your property here</span>
          <span className="nav-cta-short">✉️</span>
        </a>
        {/* Language switcher */}
        <div style={{ display: "flex", gap: "0.25rem", borderLeft: `1px solid ${C.border}`, paddingLeft: "1rem" }}>
          <a href="https://romagna-affitti-brevi.vercel.app/"
            style={{ color: C.textSoft, textDecoration: "none", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", transition: "color 0.2s", padding: "0.2rem 0.3rem" }}
            onMouseEnter={e => e.currentTarget.style.color = C.gold}
            onMouseLeave={e => e.currentTarget.style.color = C.textSoft}>
            IT
          </a>
          <span style={{ color: C.border, fontSize: "0.7rem", alignSelf: "center" }}>|</span>
          <a href="https://romagna-short-stay.vercel.app/"
            style={{ color: C.gold, textDecoration: "none", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", transition: "color 0.2s", padding: "0.2rem 0.3rem" }}
            onMouseEnter={e => e.currentTarget.style.color = C.gold}
            onMouseLeave={e => e.currentTarget.style.color = C.textSoft}>
            EN
          </a>
        </div>
      </div>
      <style>{`
        @media(min-width:768px){.nav-tagline{display:block!important}}
        .nav-cta-short{display:none}
        @media(max-width:768px){
          .nav-cta-long{display:none}
          .nav-cta-short{display:inline}
        }
      `}</style>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ count }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);
  return (
    <section style={{ background: C.bg, padding: "9rem 2rem 6rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "20%", right: "-5%", width: "40vw", height: "40vw", border: "1px solid rgba(160,120,42,0.07)", transform: "rotate(15deg)" }} />
        <div style={{ position: "absolute", top: "30%", right: "3%", width: "28vw", height: "28vw", border: "1px solid rgba(160,120,42,0.05)", transform: "rotate(15deg)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: C.border }} />
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(14px)", transition: "all 0.6s ease 0.1s", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.1rem" }}>
          <span style={{ display: "inline-block", width: 28, height: 1, background: C.gold }} />
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>Romagna · Italy</span>
        </div>
        <h1 style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(22px)", transition: "all 0.75s ease 0.22s", fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(2.4rem,5vw,4.5rem)", color: C.text, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.1rem", maxWidth: 720 }}>
          The finest places to stay<br /><span style={{ color: C.gold, fontStyle: "italic" }}>in Romagna.</span>
        </h1>
        <p style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(18px)", transition: "all 0.75s ease 0.36s", fontSize: "clamp(0.9rem,1.6vw,1.05rem)", color: C.textMid, lineHeight: 1.8, maxWidth: 560, fontFamily: "'DM Sans',sans-serif", marginBottom: "2rem" }}>
          Apartments, B&Bs, villas and farmhouses in Romagna. Verified properties, book directly on Airbnb.
        </p>
        <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.7s ease 0.5s", display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
          {[
            [count, "Properties available"],
            ["100%", "Verified"],
            ["Airbnb", "Secure booking"],
          ].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.6rem", color: C.gold, fontWeight: 700 }}>{v}</div>
              <div style={{ fontSize: "0.65rem", color: C.textSoft, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Property Card ─────────────────────────────────────────────────────────────
function StrutturaCard({ s, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          height: "100%",
          background: C.cardBg,
          boxShadow: hovered ? "0 12px 40px rgba(26,22,18,0.14)" : C.shadow,
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "all 0.35s ease",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>
        {/* Cover image */}
        <div style={{ position: "relative", overflow: "hidden", aspectRatio: "16/10" }}>
          <img
            src={s.cover}
            alt={s.nome}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.55s ease",
            }}
          />
          <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", background: "rgba(250,248,244,0.93)", padding: "0.25rem 0.65rem", fontSize: "0.62rem", color: C.gold, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", backdropFilter: "blur(6px)" }}>
            {s.tipologia}
          </div>
          <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "rgba(250,248,244,0.93)", padding: "0.25rem 0.65rem", fontSize: "0.68rem", color: C.text, fontWeight: 700, fontFamily: "'DM Sans',sans-serif", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <span style={{ color: C.gold }}>★</span> {s.rating.toFixed(1)}
            <span style={{ color: C.textSoft, fontWeight: 400 }}>({s.recensioni})</span>
          </div>
          {s.prezzo_da && (
            <div style={{ position: "absolute", bottom: "0.75rem", right: "0.75rem", background: C.gold, color: "#fff", padding: "0.25rem 0.65rem", fontSize: "0.68rem", fontWeight: 700, fontFamily: "'DM Sans',sans-serif" }}>
              from €{s.prezzo_da} / night
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "1.4rem 1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "0.63rem", letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span>📍</span> {s.localita}
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.35rem", color: C.text, fontWeight: 700, marginBottom: "0.7rem", lineHeight: 1.15, letterSpacing: "-0.01em" }}>
            {s.nome}
          </h2>
          <p style={{ fontSize: "0.82rem", color: C.textMid, lineHeight: 1.75, fontFamily: "'DM Sans',sans-serif", marginBottom: "1.1rem", flex: 1 }}>
            {s.descrizione}
          </p>

          <div style={{ display: "flex", gap: "1.25rem", marginBottom: "1.1rem", paddingBottom: "1.1rem", borderBottom: `1px solid ${C.border}`, flexWrap: "wrap" }}>
            {[
              ["👥", `${s.ospiti} guests`],
              ["🛏️", `${s.camere} ${s.camere === 1 ? "bedroom" : "bedrooms"}`],
              ["🚿", `${s.bagni} ${s.bagni === 1 ? "bathroom" : "bathrooms"}`],
              ["🐾", s.animali ? "Pets welcome" : "No pets"],
            ].map(([ic, txt]) => (
              <div key={txt} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.74rem", color: C.textMid, fontFamily: "'DM Sans',sans-serif" }}>
                <span style={{ fontSize: "0.85rem" }}>{ic}</span> {txt}
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: C.textSoft, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.5rem" }}>Key distances</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {s.distanze.slice(0, 4).map(d => (
                <div key={d.luogo} style={{ fontSize: "0.7rem", color: C.textMid, fontFamily: "'DM Sans',sans-serif", background: C.bg2, padding: "0.2rem 0.55rem", whiteSpace: "nowrap" }}>
                  {d.luogo} <span style={{ color: C.gold, fontWeight: 600 }}>{d.tempo}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.4rem" }}>
            {s.tag.map(t => (
              <span key={t} style={{ fontSize: "0.63rem", color: C.textSoft, border: `1px solid ${C.border}`, padding: "0.18rem 0.5rem", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.06em" }}>
                {t}
              </span>
            ))}
          </div>

          <a href={s.url} target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: C.gold, color: "#fff", padding: "0.8rem 1.5rem", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s", textAlign: "center" }}
            onMouseEnter={e => e.currentTarget.style.background = "#8a6520"}
            onMouseLeave={e => e.currentTarget.style.background = C.gold}>
            Discover more ↗
          </a>
        </div>
      </div>
    </Reveal>
  );
}

// ── Filter Bar ────────────────────────────────────────────────────────────────
function FilterBar({ filter, setFilter }) {
  const filters = [
    { key: "tutti", label: "All" },
    { key: "Appartamento", label: "Apartments" },
    { key: "B&B", label: "B&B" },
    { key: "Villa", label: "Villas" },
    { key: "Agriturismo", label: "Farmhouses" },
  ];
  return (
    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "3rem", paddingBottom: "2rem", borderBottom: `1px solid ${C.border}` }}>
      {filters.map(f => {
        const active = filter === f.key;
        return (
          <button key={f.key} onClick={() => setFilter(f.key)}
            style={{ background: active ? C.gold : "transparent", color: active ? "#fff" : C.textMid, border: `1px solid ${active ? C.gold : C.border}`, padding: "0.45rem 1rem", fontSize: "0.72rem", fontWeight: active ? 700 : 400, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; } }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; } }}>
            {f.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div style={{ textAlign: "center", padding: "5rem 2rem", color: C.textSoft }}>
      <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🏡</div>
      <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.4rem", color: C.textMid, marginBottom: "0.5rem" }}>No properties found</div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.82rem" }}>Try changing the selected filter</div>
    </div>
  );
}

// ── Blog ──────────────────────────────────────────────────────────────────────
function Blog() {
  const [aperto, setAperto] = useState(null);
  const visibili = posts.filter(p => p.attivo).sort((a, b) => new Date(b.data) - new Date(a.data));

  const sectionRef = useRef(null);
  const handleApri = (id) => {
    setAperto(id);
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };
  const handleChiudi = () => {
    setAperto(null);
    setTimeout(() => {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  if (visibili.length === 0) return null;

  return (
    <section id="blog" ref={sectionRef} style={{ background: C.bg2, padding: "7rem 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.67rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "0.85rem", display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <span style={{ width: 26, height: 1, background: C.gold, display: "inline-block" }} /> Stories & Tips
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.9rem,4vw,3.2rem)", color: C.text, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Discover Romagna<br /><span style={{ color: C.gold, fontStyle: "italic" }}>through our eyes.</span>
            </h2>
          </div>
        </Reveal>

        {/* Post grid */}
        {aperto === null && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem", alignItems: "stretch" }} className="blog-grid">
            {visibili.map((post, i) => (
              <Reveal key={post.id} delay={i * 80}>
                <div
                  onClick={() => handleApri(post.id)}
                  style={{ background: C.cardBg, padding: "2rem", cursor: "pointer", height: "100%", boxSizing: "border-box", transition: "all 0.3s ease", boxShadow: C.shadow, display: "flex", flexDirection: "column" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(26,22,18,0.14)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = C.shadow; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", border: `1px solid ${C.border}`, padding: "0.2rem 0.6rem" }}>{post.categoria}</span>
                    <span style={{ fontSize: "0.68rem", color: C.textSoft, fontFamily: "'DM Sans',sans-serif" }}>{new Date(post.data).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.25rem", color: C.text, fontWeight: 700, lineHeight: 1.2, marginBottom: "0.85rem", letterSpacing: "-0.01em" }}>{post.titolo}</h3>
                  <p style={{ fontSize: "0.83rem", color: C.textMid, lineHeight: 1.75, fontFamily: "'DM Sans',sans-serif", marginBottom: "1.25rem", flex: 1 }}>{post.sommario}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: C.gold, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif" }}>
                    Read more <span>↗</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Open post */}
        {aperto !== null && (() => {
          const post = visibili.find(p => p.id === aperto);
          if (!post) return null;
          return (
            <Reveal>
              <div style={{ maxWidth: 760, margin: "0 auto" }}>
                <button
                  onClick={handleChiudi}
                  style={{ background: "none", border: `1px solid ${C.border}`, padding: "0.45rem 1rem", fontSize: "0.72rem", color: C.textMid, fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", marginBottom: "2.5rem", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.color = C.gold; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMid; }}>
                  ← All articles
                </button>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", border: `1px solid ${C.border}`, padding: "0.2rem 0.6rem" }}>{post.categoria}</span>
                  <span style={{ fontSize: "0.68rem", color: C.textSoft, fontFamily: "'DM Sans',sans-serif" }}>{new Date(post.data).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", color: C.text, fontWeight: 700, lineHeight: 1.1, marginBottom: "1rem", letterSpacing: "-0.02em" }}>{post.titolo}</h2>
                <p style={{ fontSize: "1rem", color: C.gold, lineHeight: 1.75, fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontStyle: "italic", marginBottom: "2rem", paddingBottom: "2rem", borderBottom: `1px solid ${C.border}` }}>{post.sommario}</p>

                {post.contenuto.map((blocco, i) => {
                  if (blocco.tipo === "paragrafo") return (
                    <p key={i} style={{ fontSize: "0.95rem", color: C.textMid, lineHeight: 1.9, fontFamily: "'DM Sans',sans-serif", marginBottom: "1.25rem" }}>{blocco.testo}</p>
                  );
                  if (blocco.tipo === "titoletto") return (
                    <h3 key={i} style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1.35rem", color: C.text, fontWeight: 700, marginBottom: "0.6rem", marginTop: "2rem", letterSpacing: "-0.01em" }}>{blocco.testo}</h3>
                  );
                  if (blocco.tipo === "download") return (
                    <div key={i} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1.5rem 0" }}>
                      <a href={blocco.src1} download
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: C.gold, color: "#fff", padding: "0.75rem 1.5rem", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#8a6520"}
                        onMouseLeave={e => e.currentTarget.style.background = C.gold}>
                        ↓ {blocco.label1}
                      </a>
                      <a href={blocco.src2} download
                        style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: C.gold, padding: "0.75rem 1.5rem", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", border: `1.5px solid ${C.gold}`, transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.gold; }}>
                        ↓ {blocco.label2}
                      </a>
                    </div>
                  );
                  return null;
                })}
              </div>
            </Reveal>
          );
        })()}
      </div>
      <style>{`@media(max-width:600px){.blog-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

// ── CTA Banner ────────────────────────────────────────────────────────────────
function CtaBanner() {
  return (
    <section style={{ background: C.bg3, padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%) rotate(12deg)", width: "50vw", height: "50vw", border: "1px solid rgba(160,120,42,0.08)", maxWidth: 600, pointerEvents: "none" }} />
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.28em", color: C.gold, textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", marginBottom: "1rem" }}>Are you a host?</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,3rem)", color: C.text, fontWeight: 700, lineHeight: 1.1, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            List your property<br /><span style={{ color: C.gold, fontStyle: "italic" }}>on our directory.</span>
          </h2>
          <p style={{ fontSize: "0.92rem", color: C.textMid, lineHeight: 1.8, fontFamily: "'DM Sans',sans-serif", marginBottom: "2rem" }}>
            Do you have an apartment, B&B or farmhouse in Romagna? Contact us to be included in our curated directory of selected properties.
          </p>
          <a href="mailto:vittorio_negri@hotmail.com"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: C.gold, color: "#fff", padding: "0.95rem 2.25rem", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 6px 24px rgba(160,120,42,0.22)", transition: "all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#8a6520"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.gold; e.currentTarget.style.transform = "translateY(0)"; }}>
            Contact us ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.text, padding: "3rem 2rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond','Playfair Display',serif", fontSize: "1rem", color: C.gold, fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.3rem" }}>ROMAGNA SHORT RENTALS</div>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>Property directory · Romagna · Italy</div>
        </div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
          © {new Date().getFullYear()} Romagna Short Rentals · All rights reserved
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [filter, setFilter] = useState("tutti");

  const visibili = strutture.filter(s =>
    s.attivo && (filter === "tutti" || s.tipologia === filter)
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#faf8f4;color:#1a1612;-webkit-font-smoothing:antialiased;}
        ::selection{background:rgba(160,120,42,0.18);}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#faf8f4;}
        ::-webkit-scrollbar-thumb{background:rgba(160,120,42,0.3);border-radius:3px;}
      `}</style>

      <Nav />
      <Hero count={strutture.filter(s => s.attivo).length} />

      {/* Grid section */}
      <section id="strutture" style={{ background: C.bg, padding: "5rem 2rem 7rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <FilterBar filter={filter} setFilter={setFilter} />
          {visibili.length === 0
            ? <EmptyState />
            : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.5rem",
                alignItems: "stretch",
              }} className="strutture-grid">
                {visibili.map((s, i) => (
                  <StrutturaCard key={s.id} s={s} delay={i * 80} />
                ))}
              </div>
            )
          }
        </div>
      </section>

      {/* Blog */}
      <Blog />

      <CtaBanner />
      <Footer />

      <style>{`
        @media(max-width:600px){
          .strutture-grid{grid-template-columns:1fr!important;}
        }
      `}</style>
    </>
  );
}
