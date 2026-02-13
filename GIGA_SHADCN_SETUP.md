# Giga Design System — shadcn/ui Setup

This document defines how to initialize a new project with shadcn/ui using the **Nova** style and Radix base, then apply **Giga** typography, colors, radius, and tokens from the files in this folder.

---

## 1. Recommended init command (shadcn Create preset)

Use the following command to create a new Next.js app with shadcn pre-configured. This matches a preset created on [ui.shadcn.com/create](https://ui.shadcn.com/create) (style: **Nova**, base: **Radix**, gray + blue, Tabler icons, default radius).

```bash
npx shadcn@latest create --preset "https://ui.shadcn.com/init?base=radix&style=nova&baseColor=gray&theme=blue&iconLibrary=tabler&font=inter&menuAccent=subtle&menuColor=default&radius=default&template=next&rtl=false" --template next
```

For an **existing** Next.js project, use `init` instead of `create`:

```bash
npx shadcn@latest init --preset "https://ui.shadcn.com/init?base=radix&style=nova&baseColor=gray&theme=blue&iconLibrary=tabler&font=inter&menuAccent=subtle&menuColor=default&radius=default&template=next&rtl=false"
```

---

## 2. Preset parameters (and Giga alignment)

| Parameter       | Preset value | Giga usage |
|----------------|--------------|------------|
| **base**       | `radix`      | Keep. Components use Radix primitives. |
| **style**      | `nova`       | Keep. Defines the look of the component library (Nova style). |
| **baseColor**  | `gray`       | Keep. Neutral scale = Giga **Grey** (see `giga-design-tokens.json`). |
| **theme**      | `blue`       | Keep. Accent/primary = Giga **Primary** blue (#277aff). |
| **iconLibrary**| `tabler`    | Keep. Use Tabler icons. |
| **font**       | `inter`     | **Override.** Giga uses **Manrope** (headings) + **Open Sans** (body). Apply via `giga-globals.css` and `tailwind.config.ts`. |
| **menuAccent** | `subtle`    | Keep. |
| **menuColor**  | `default`   | Keep. |
| **radius**     | `default`   | **Keep.** Use shadcn’s radius from the preset (no Giga override). |
| **template**   | `next`      | Keep. Next.js. |
| **rtl**        | `false`     | Keep. |

---

## 3. After init: apply Giga foundation

1. **Replace or merge `globals.css`** with the contents of **`giga-globals.css`** from this folder (fonts, primitive tokens, semantic tokens, typography utilities, shadow-hover, motion). **Do not override radius** — keep the radius values that shadcn generates from the preset.
2. **Replace or merge `tailwind.config.ts`** with **`tailwind.config.ts`** from this folder (fontFamily: Manrope + Open Sans, fontSize scale, colors from CSS vars, `giga.*` palette, transition durations). Use Tailwind’s `borderRadius` from the shadcn-generated config (preset radius), not Giga’s custom radius tokens.
3. **Use only Giga colors and typography** — no arbitrary colors; only Manrope and Open Sans (see **`GIGA_SYSTEM_PROMPT.md`**).

---

## 4. Giga tokens used by this setup

- **Typography:** `GIGA_SYSTEM_PROMPT.md` (Fonts, Typography scale) + `giga-globals.css` (`@layer base` + text utilities).
- **Colors:** `giga-design-tokens.json` + `giga-globals.css` (primitive + semantic CSS variables).
- **Radius:** Use the radius from the shadcn preset (last link); no Giga radius override. For non-preset projects, see **Border radius** in `GIGA_SYSTEM_PROMPT.md`.
- **Shadows & motion:** `GIGA_SYSTEM_PROMPT.md` + shadow/motion utilities in `giga-globals.css`.

---

## 5. Summary

- **Init:** Use the Nova + Radix + gray + blue + Tabler preset above.
- **Then:** Override only font (Manrope + Open Sans) via the Giga `globals.css` and Tailwind config from this folder. Radius stays the one from the shadcn preset.
- **Always:** Install components with `npx shadcn@latest add [component]`; they will inherit the Giga theme from CSS variables.
