# GIGA PRODUCT DESIGN SYSTEM — Complete Reference

You are building a product using the Giga Product Design System. Every UI element MUST follow these rules exactly. Use shadcn/ui components (vanilla, installed via `npx shadcn@latest add`) with Giga token customization applied through CSS variables and Tailwind config. Stack: Next.js + React + Tailwind CSS + shadcn/ui.

---

## shadcn/ui init (Nova + Radix preset)

New projects should use the **Nova** style and Radix base from [shadcn Create](https://ui.shadcn.com/create). Typography and colors in this doc override the preset so that **only Giga fonts and palette** are used.

**Create new app:**
```bash
npx shadcn@latest create --preset "https://ui.shadcn.com/init?base=radix&style=nova&baseColor=gray&theme=blue&iconLibrary=tabler&font=inter&menuAccent=subtle&menuColor=default&radius=default&template=next&rtl=false" --template next
```

**Init existing Next.js project:**
```bash
npx shadcn@latest init --preset "https://ui.shadcn.com/init?base=radix&style=nova&baseColor=gray&theme=blue&iconLibrary=tabler&font=inter&menuAccent=subtle&menuColor=default&radius=default&template=next&rtl=false"
```

After init, replace/merge `globals.css` and `tailwind.config` with the **Giga** versions in this folder (`giga-globals.css`, `tailwind.config.ts`) so that **font** becomes Manrope + Open Sans. **Radius** is left as from the shadcn preset (no Giga override). See **`GIGA_SHADCN_SETUP.md`** for the full parameter table and override steps.

---

## FONTS

Only two font families are allowed. No exceptions.

- **Manrope** → headings only (text-2xl through text-9xl), weight 400 only
- **Open Sans** → everything else (text-xs through text-xl), weights: 400 Regular, 500 Medium, 600 Semibold

Import: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');`

### Font Weight Usage Rules
| Weight | Token | When to use |
|--------|-------|------------|
| 400 Regular | `font-normal` | Body text, paragraphs, descriptions |
| 500 Medium | `font-medium` | Interactive elements (buttons, links, tags) |
| 600 Semibold | `font-semibold` | Section titles, leading headers |

---

## TYPOGRAPHY SCALE

### Headings (Manrope, weight 400 only)
| Token | Size | Line Height | Letter Spacing |
|-------|------|-------------|----------------|
| text-9xl | 128px | 136px | -1px |
| text-8xl | 96px | 104px | 0 |
| text-7xl | 72px | 80px | 0 |
| text-6xl | 60px | 68px | 0 |
| text-5xl | 48px | 56px | 0 |
| text-4xl | 36px | 42px | 0 |
| text-3xl | 30px | 36px | 0 |
| text-2xl | 24px | 36px | 0 |

### Body (Open Sans, weights 400/500/600)
| Token | Size | Line Height |
|-------|------|-------------|
| text-xl | 20px | 30px |
| text-lg | 18px | 28px |
| text-base | 16px | 24px |
| text-sm | 14px | 20px |
| text-xs | 12px | 18px |

---

## COLORS

### Primary (Brand)
| Step | Hex |
|------|-----|
| 50 | #eaf2ff |
| 100 | #d4e5ff |
| 200 | #bfd7ff |
| 300 | #a9caff |
| 400 | #7eb0ff |
| 500 | #5495ff |
| **600 (BASE)** | **#277aff** |
| 700 | #0050e6 |
| 800 | #002d9c |
| 900 | #002d76 |

### Grey
| Step | Hex |
|------|-----|
| 50 | #fafafa |
| 100 | #f4f4f4 |
| 200 | #e9e9e9 |
| 300 | #dfdfdf |
| 400 | #cacaca |
| 500 | #989898 |
| 600 | #6f6f6f |
| 700 | #525252 |
| 800 | #393939 |
| 900 | #161616 |
| 950 | #161616 |

### Base
Black: #000000 | White: #ffffff

### Connectivity
| Color | Hex | Meaning |
|-------|-----|---------|
| Green 600 (BASE) | #00d661 | Good connection |
| Green scale | 50:#d6ffe9 100:#adffd2 200:#85ffbc 300:#5cffa5 400:#33ff8f 500:#0aff78 600:#00d661 700:#00b853 800:#008f40 900:#00662e |
| Yellow | #ffc93d | Moderate connection |
| Red | #ed1c24 | Bad connection |

---

## SEMANTIC COLOR MAPPING

### ☀️ Light Mode
| Role | Token |
|------|-------|
| Primary text | Grey 950 (#161616) |
| Secondary text | Grey 600 (#6f6f6f) |
| Primary icons | Grey 950 |
| Secondary icons | Grey 600 |
| Connected status | Green 600 (#00d661) |
| Not connected | Red (#ed1c24) |
| Main background | White (#ffffff) |
| Default dividers | Grey 200 (#e9e9e9) |
| Light dividers | Grey 100 (#f4f4f4) |
| Primary button | Fill: Primary 600, Hover: Primary 700, Text: White |
| Secondary button | Outline: Primary 600, Hover: fill Primary 700 |
| Primary link | Primary 600 |
| Secondary link | Underlined |

### 🌙 Dark Mode (mainly used in Giga Maps)
| Role | Token |
|------|-------|
| Primary text | Grey 50 (#fafafa) |
| Secondary text | Grey 400 (#cacaca) |
| Primary icons | Grey 50 |
| Secondary icons | Grey 400 |
| Connected status | Green 600 |
| Not connected | Red |
| Main background | Grey 950 (#161616) |
| Default dividers | Grey 800 (#393939) |
| Light dividers | Grey 900 (#161616) |
| Link color | Primary 600 |
| Buttons | Same as light mode |

---

## shadcn/ui CSS VARIABLES (globals.css)

```css
:root {
  /* Semantic */
  --background: 0 0% 100%;
  --foreground: 0 0% 9%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 9%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 9%;
  --primary: 214 100% 58%;
  --primary-foreground: 0 0% 100%;
  --secondary: 0 0% 96%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 91%;
  --muted-foreground: 0 0% 44%;
  --accent: 214 100% 95%;
  --accent-foreground: 0 0% 9%;
  --destructive: 357 88% 52%;
  --destructive-foreground: 0 0% 100%;
  --border: 0 0% 91%;
  --input: 0 0% 91%;
  --ring: 214 100% 58%;
  --radius: 6px;
}

.dark {
  --background: 0 0% 9%;
  --foreground: 0 0% 98%;
  --card: 0 0% 9%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 9%;
  --popover-foreground: 0 0% 98%;
  --primary: 214 100% 58%;
  --primary-foreground: 0 0% 100%;
  --secondary: 0 0% 9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 22%;
  --muted-foreground: 0 0% 79%;
  --accent: 0 0% 22%;
  --accent-foreground: 0 0% 98%;
  --destructive: 357 88% 52%;
  --destructive-foreground: 0 0% 100%;
  --border: 0 0% 22%;
  --input: 0 0% 22%;
  --ring: 214 100% 58%;
}
```

---

## BORDER RADIUS

| Component | Radius |
|-----------|--------|
| Small card | 6px |
| Big card | 8px |
| Badge | 4px |
| Small button | 4px |
| Standard button | 6px |
| Pill button | 9999px |
| All inputs | 6px |

---

## SHADOWS

| Level | Use Case |
|-------|----------|
| shadow | Form controls, tabs, toggles |
| shadow-sm | Small cards, list items, badges |
| shadow-md | Medium cards, panels |
| shadow-lg | Dropdowns, tooltips, popovers, notifications |
| shadow-xl | Modals, dialogs, sheets, large overlays |
| shadow-2xl | Full-screen overlays, drawer panels |
| shadow-inner | Focused inputs, pressed states |

**HOVER RULE**: All interactive elements with shadow go UP one step on hover (shadow-sm → shadow-md → shadow-lg → shadow-xl).

---

## MOTION

| Element size | Curve | Duration (Figma equivalent) |
|-------------|-------|----------------------------|
| Medium/large | spring(mass:1, stiffness:180, damping:30) | ~400ms |
| Small | spring(mass:1, stiffness:720, damping:60) | ~200ms |

---

## shadcn/ui COMPONENTS TO USE

All components should be installed vanilla via `npx shadcn@latest add [component]` and will automatically inherit the Giga theme through the CSS variables above. Priority components:

Button, Input, Card, Dialog, Table, Tabs, Select, Form, Sidebar, Navigation Menu, Sheet, Charts (Recharts), Badge, Toast (Sonner), Tooltip

---

## RULES SUMMARY

1. Only Manrope and Open Sans fonts — nothing else
2. shadcn/ui components, vanilla installation, themed via CSS variables
3. Next.js + React + Tailwind CSS stack
4. All colors from the Giga palette — never use arbitrary colors
5. Shadow goes up one step on hover
6. Border radius follows the component table exactly
7. Spring animations for all transitions
