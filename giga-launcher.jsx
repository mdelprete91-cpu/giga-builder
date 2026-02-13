import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   GIGA SYSTEM PROMPT — embedded in full so every tool gets it
   ═══════════════════════════════════════════════════════════ */
const GIGA_PROMPT = `You are building a product using the Giga Product Design System. Every UI element MUST follow these rules exactly. Use shadcn/ui components (vanilla, installed via npx shadcn@latest add) with Giga token customization applied through CSS variables and Tailwind config. Stack: Next.js + React + Tailwind CSS + shadcn/ui.

FONTS — Only two allowed, no exceptions:
Manrope → headings (text-2xl to text-9xl), weight 400 only
Open Sans → everything else (text-xs to text-xl), weights: 400, 500, 600
Import: @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');

FONT WEIGHT RULES:
400 Regular → Body text, paragraphs, descriptions
500 Medium → Interactive elements (buttons, links, tags)
600 Semibold → Section titles, leading headers

TYPOGRAPHY SCALE:
Headings (Manrope 400): text-9xl:128/136/-1px | text-8xl:96/104 | text-7xl:72/80 | text-6xl:60/68 | text-5xl:48/56 | text-4xl:36/42 | text-3xl:30/36 | text-2xl:24/36
Body (Open Sans 400/500/600): text-xl:20/30 | text-lg:18/28 | text-base:16/24 | text-sm:14/20 | text-xs:12/18

COLORS:
Primary: 50:#eaf2ff 100:#d4e5ff 200:#bfd7ff 300:#a9caff 400:#7eb0ff 500:#5495ff 600:#277aff(BASE) 700:#0050e6 800:#002d9c 900:#002d76
Grey: 50:#fafafa 100:#f4f4f4 200:#e9e9e9 300:#dfdfdf 400:#cacaca 500:#989898 600:#6f6f6f 700:#525252 800:#393939 900:#161616 950:#161616
Base: Black:#000000 White:#ffffff
Connectivity: Green600:#00d661(good) | Yellow:#ffc93d(moderate) | Red:#ed1c24(bad)
Green scale: 50:#d6ffe9 100:#adffd2 200:#85ffbc 300:#5cffa5 400:#33ff8f 500:#0aff78 600:#00d661 700:#00b853 800:#008f40 900:#00662e

LIGHT MODE: Text primary:Grey950 | Text secondary:Grey600 | Icons primary:Grey950 | Icons secondary:Grey600 | Background:White | Dividers default:Grey200 light:Grey100 | Primary btn: fill Primary600 hover:Primary700 text:White | Secondary btn: outline Primary600 hover:Primary700 | Link:Primary600
DARK MODE (Giga Maps): Text primary:Grey50 | Text secondary:Grey400 | Icons primary:Grey50 | Icons secondary:Grey400 | Background:Grey950 | Dividers default:Grey800 light:Grey900 | Buttons same as light | Link:Primary600

CSS VARIABLES (globals.css):
:root { --background:0 0% 100%; --foreground:0 0% 9%; --card:0 0% 100%; --card-foreground:0 0% 9%; --popover:0 0% 100%; --popover-foreground:0 0% 9%; --primary:214 100% 58%; --primary-foreground:0 0% 100%; --secondary:0 0% 96%; --secondary-foreground:0 0% 9%; --muted:0 0% 91%; --muted-foreground:0 0% 44%; --accent:214 100% 95%; --accent-foreground:0 0% 9%; --destructive:357 88% 52%; --destructive-foreground:0 0% 100%; --border:0 0% 91%; --input:0 0% 91%; --ring:214 100% 58%; --radius:6px; }
.dark { --background:0 0% 9%; --foreground:0 0% 98%; --card:0 0% 9%; --card-foreground:0 0% 98%; --popover:0 0% 9%; --popover-foreground:0 0% 98%; --primary:214 100% 58%; --primary-foreground:0 0% 100%; --secondary:0 0% 9%; --secondary-foreground:0 0% 98%; --muted:0 0% 22%; --muted-foreground:0 0% 79%; --accent:0 0% 22%; --accent-foreground:0 0% 98%; --destructive:357 88% 52%; --destructive-foreground:0 0% 100%; --border:0 0% 22%; --input:0 0% 22%; --ring:214 100% 58%; }

BORDER RADIUS: Small card:6px | Big card:8px | Badge:4px | Small btn:4px | Standard btn:6px | Pill btn:9999px | Inputs:6px
SHADOWS: shadow→form controls | shadow-sm→small cards | shadow-md→medium cards | shadow-lg→dropdowns,tooltips | shadow-xl→modals,dialogs | shadow-2xl→fullscreen overlays | shadow-inner→focused inputs
HOVER RULE: All interactive elements go UP one shadow step on hover.
MOTION: Medium/large: spring(mass:1,stiffness:180,damping:30) ~400ms | Small: spring(mass:1,stiffness:720,damping:60) ~200ms

COMPONENTS (install via npx shadcn@latest add): Button, Input, Card, Dialog, Table, Tabs, Select, Form, Sidebar, Navigation Menu, Sheet, Badge, Toast (Sonner), Tooltip, Charts (Recharts)

RULES: 1) Only Manrope+Open Sans 2) shadcn/ui vanilla themed via CSS vars 3) Next.js+React+Tailwind 4) Only Giga palette colors 5) Shadow up on hover 6) Border radius per component table 7) Spring animations`;

const GREETING = "Start creating your app in Giga style ✦";

/* ═══════════════════════════════════════
   TOOL DEFINITIONS
   ═══════════════════════════════════════ */
const TOOLS = [
  {
    id: "claude",
    name: "Claude",
    desc: "Anthropic's AI — best for complex reasoning",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M16.5 3.5L7.5 12.5L12 17L21 8L16.5 3.5Z" fill="currentColor" opacity="0.6"/>
        <path d="M3 21L7.5 12.5L12 17L3 21Z" fill="currentColor"/>
      </svg>
    ),
    badge: null,
    getUrl: () => `https://claude.ai/new?q=${encodeURIComponent(GIGA_PROMPT + "\n\n" + GREETING)}`,
  },
  {
    id: "cursor",
    name: "Cursor",
    desc: "AI code editor — best for real projects",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    badge: "COPIES PROMPT",
    getUrl: () => null,
    action: "clipboard",
  },
  {
    id: "lovable",
    name: "Lovable",
    desc: "Full-stack AI builder — fast prototypes",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 21C12 21 4 14.5 4 9C4 6.5 6 4 8.5 4C10 4 11.5 5 12 6.5C12.5 5 14 4 15.5 4C18 4 20 6.5 20 9C20 14.5 12 21 12 21Z" fill="currentColor"/>
      </svg>
    ),
    badge: null,
    getUrl: () => `https://lovable.dev/projects/create?prompt=${encodeURIComponent(GIGA_PROMPT + "\n\n" + GREETING)}`,
  },
  {
    id: "bolt",
    name: "Bolt",
    desc: "Stackblitz AI — instant browser apps",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" fill="currentColor"/>
      </svg>
    ),
    badge: null,
    getUrl: () => `https://bolt.new/?prompt=${encodeURIComponent(GIGA_PROMPT + "\n\n" + GREETING)}`,
  },
  {
    id: "v0",
    name: "v0",
    desc: "For the most accurate UI",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 22H22L12 2Z" fill="currentColor"/>
      </svg>
    ),
    badge: "recommended",
    getUrl: () => `https://v0.dev/chat?q=${encodeURIComponent(GIGA_PROMPT + "\n\n" + GREETING)}`,
  },
  {
    id: "replit",
    name: "Replit",
    desc: "Cloud IDE + AI — deploy in one click",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="3" width="14" height="6" rx="1" fill="currentColor" opacity="0.4"/>
        <rect x="5" y="9" width="14" height="6" rx="1" fill="currentColor" opacity="0.7"/>
        <rect x="5" y="15" width="14" height="6" rx="1" fill="currentColor"/>
      </svg>
    ),
    badge: null,
    getUrl: () => `https://replit.com/new?prompt=${encodeURIComponent(GIGA_PROMPT + "\n\n" + GREETING)}`,
  },
];

/* ═══════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════ */

function Toast({ show, message }) {
  return (
    <div style={{
      position: "fixed", bottom: 32, left: "50%",
      transform: `translateX(-50%) translateY(${show ? 0 : 16}px)`,
      opacity: show ? 1 : 0,
      background: "#161616", color: "#fafafa",
      padding: "12px 20px", borderRadius: 6,
      fontFamily: "'Open Sans', sans-serif", fontSize: 13, fontWeight: 500, lineHeight: "20px",
      pointerEvents: "none", zIndex: 9999,
      boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
      transition: "all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="8" fill="#00d661"/>
        <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {message}
    </div>
  );
}

function Badge({ text, type }) {
  const isRec = type === "recommended";
  return (
    <span style={{
      display: "inline-block", padding: "1px 7px", borderRadius: 4,
      background: isRec ? "#d6ffe9" : "#eaf2ff",
      color: isRec ? "#008f40" : "#277aff",
      fontFamily: "'Open Sans', sans-serif", fontWeight: 500, fontSize: 11, lineHeight: "18px", letterSpacing: "0.2px",
    }}>
      {text}
    </span>
  );
}

function ToolCard({ tool, index, isHovered, isLaunching, onHover, onLeave, onClick, entered }) {
  const active = isHovered || isLaunching;
  return (
    <button
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 16px", borderRadius: 8,
        border: `1px solid ${active ? "#bfd7ff" : "#e9e9e9"}`,
        background: isLaunching ? "#eaf2ff" : active ? "#fafafa" : "#fff",
        cursor: "pointer",
        transition: "all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transitionDelay: `${index * 40}ms`,
        boxShadow: active ? "0 4px 16px rgba(39,122,255,0.08)" : "0 1px 2px rgba(0,0,0,0.03)",
        transform: entered ? (active ? "translateY(-1px)" : "translateY(0)") : "translateY(6px)",
        opacity: entered ? 1 : 0,
        outline: "none", textAlign: "left", width: "100%",
      }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: 8, flexShrink: 0,
        background: active ? "#277aff" : "#f4f4f4",
        color: active ? "#fff" : "#525252",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}>
        {tool.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontFamily: "'Open Sans', sans-serif", fontWeight: 600,
            fontSize: 14, lineHeight: "20px", color: "#161616",
          }}>
            {tool.name}
          </span>
          {tool.badge && <Badge text={tool.badge} type={tool.badge === "recommended" ? "recommended" : "info"} />}
        </div>
        <p style={{
          fontFamily: "'Open Sans', sans-serif", fontWeight: 400,
          fontSize: 12, lineHeight: "18px", color: "#989898",
          margin: "1px 0 0 0",
        }}>
          {tool.desc}
        </p>
      </div>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
        flexShrink: 0, opacity: active ? 0.6 : 0,
        transition: "opacity 200ms", color: "#277aff",
      }}>
        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

/* ═══════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════ */
export default function GigaLauncher() {
  const [phase, setPhase] = useState("loading"); // loading → modal
  const [entered, setEntered] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [launching, setLaunching] = useState(null);
  const [toast, setToast] = useState({ show: false, msg: "" });

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("modal"), 500);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase === "modal") {
      const t = setTimeout(() => setEntered(true), 30);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const showToast = useCallback((msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3000);
  }, []);

  const handleSelect = useCallback(async (tool) => {
    setLaunching(tool.id);

    if (tool.action === "clipboard") {
      try {
        await navigator.clipboard.writeText(GIGA_PROMPT + "\n\n" + GREETING);
        showToast("Giga prompt copied — paste it into Cursor");
      } catch {
        showToast("Could not copy — check clipboard permissions");
      }
      setTimeout(() => setLaunching(null), 600);
      return;
    }

    const url = tool.getUrl();
    if (url) {
      setTimeout(() => {
        window.open(url, "_blank");
        setLaunching(null);
      }, 300);
    }
  }, [showToast]);

  // Loading screen
  if (phase === "loading") {
    return (
      <div style={{
        position: "fixed", inset: 0, background: "#fafafa",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Open Sans', sans-serif",
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          border: "2.5px solid #e9e9e9", borderTopColor: "#277aff",
          animation: "giga-spin 0.7s linear infinite",
        }}/>
        <style>{`@keyframes giga-spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    );
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>

      {/* Overlay */}
      <div style={{
        position: "fixed", inset: 0,
        background: entered ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0)",
        backdropFilter: entered ? "blur(6px)" : "blur(0)",
        WebkitBackdropFilter: entered ? "blur(6px)" : "blur(0)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 20,
        transition: "all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}>

        {/* Modal */}
        <div style={{
          background: "#ffffff", borderRadius: 12,
          width: "min(480px, 100%)", maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 24px 64px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.03)",
          transform: entered ? "scale(1) translateY(0)" : "scale(0.97) translateY(8px)",
          opacity: entered ? 1 : 0,
          transition: "all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}>

          {/* Header */}
          <div style={{ padding: "28px 28px 0", textAlign: "center" }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, margin: "0 auto 14px",
              background: "linear-gradient(135deg, #277aff 0%, #0050e6 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(39,122,255,0.25)",
            }}>
              <span style={{
                fontFamily: "'Manrope', sans-serif", fontWeight: 400,
                fontSize: 20, color: "#fff",
              }}>
                G
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Manrope', sans-serif", fontWeight: 400,
              fontSize: 24, lineHeight: "36px", color: "#161616", margin: 0,
            }}>
              Giga Launcher
            </h2>
            <p style={{
              fontFamily: "'Open Sans', sans-serif", fontWeight: 400,
              fontSize: 14, lineHeight: "20px", color: "#6f6f6f",
              margin: "6px 0 0",
            }}>
              Pick a tool — Giga design system loads automatically
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#e9e9e9", margin: "20px 28px 0" }}/>

          {/* Tool Grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
            padding: "20px 28px",
          }}>
            {TOOLS.map((tool, i) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                index={i}
                isHovered={hovered === tool.id}
                isLaunching={launching === tool.id}
                onHover={() => setHovered(tool.id)}
                onLeave={() => setHovered(null)}
                onClick={() => handleSelect(tool)}
                entered={entered}
              />
            ))}
          </div>

          {/* Footer */}
          <div style={{
            padding: "0 28px 20px", textAlign: "center",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          }}>
            <div style={{
              display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4,
            }}>
              {["Colors", "Typography", "Shadows", "Radius", "Motion", "Dark mode"].map((t) => (
                <span key={t} style={{
                  display: "inline-block", padding: "2px 8px", borderRadius: 4,
                  background: "#f4f4f4", color: "#6f6f6f",
                  fontFamily: "'Open Sans', sans-serif", fontWeight: 400,
                  fontSize: 11, lineHeight: "16px",
                }}>
                  {t}
                </span>
              ))}
            </div>
            <p style={{
              fontFamily: "'Open Sans', sans-serif", fontWeight: 400,
              fontSize: 12, lineHeight: "18px", color: "#cacaca", margin: 0,
            }}>
              Giga Product Design System · shadcn/ui · Next.js
            </p>
          </div>
        </div>
      </div>

      <Toast show={toast.show} message={toast.msg}/>
    </>
  );
}
