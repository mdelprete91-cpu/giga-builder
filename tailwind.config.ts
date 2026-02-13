import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
        sans: ["Open Sans", "sans-serif"],
      },
      fontSize: {
        "9xl": ["128px", { lineHeight: "136px", letterSpacing: "-1px" }],
        "8xl": ["96px",  { lineHeight: "104px", letterSpacing: "0" }],
        "7xl": ["72px",  { lineHeight: "80px",  letterSpacing: "0" }],
        "6xl": ["60px",  { lineHeight: "68px",  letterSpacing: "0" }],
        "5xl": ["48px",  { lineHeight: "56px",  letterSpacing: "0" }],
        "4xl": ["36px",  { lineHeight: "42px",  letterSpacing: "0" }],
        "3xl": ["30px",  { lineHeight: "36px",  letterSpacing: "0" }],
        "2xl": ["24px",  { lineHeight: "36px",  letterSpacing: "0" }],
        xl:   ["20px", { lineHeight: "30px", letterSpacing: "0" }],
        lg:   ["18px", { lineHeight: "28px", letterSpacing: "0" }],
        base: ["16px", { lineHeight: "24px", letterSpacing: "0" }],
        sm:   ["14px", { lineHeight: "20px", letterSpacing: "0" }],
        xs:   ["12px", { lineHeight: "18px", letterSpacing: "0" }],
      },
      borderRadius: {
        lg: "var(--radius-lg)",     // 8px — big card
        md: "var(--radius)",        // 6px — standard btn, input, small card
        sm: "var(--radius-sm)",     // 4px — badge, small btn
        pill: "var(--radius-pill)", // 9999px — pill btn
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card:        { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover:     { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        primary:     { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary:   { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted:       { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent:      { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border: "hsl(var(--border))",
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",
        chart: { "1": "hsl(var(--chart-1))", "2": "hsl(var(--chart-2))", "3": "hsl(var(--chart-3))", "4": "hsl(var(--chart-4))", "5": "hsl(var(--chart-5))" },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        giga: {
          primary: {
            50: "hsl(var(--primary-50))", 100: "hsl(var(--primary-100))", 200: "hsl(var(--primary-200))",
            300: "hsl(var(--primary-300))", 400: "hsl(var(--primary-400))", 500: "hsl(var(--primary-500))",
            600: "hsl(var(--primary-600))", 700: "hsl(var(--primary-700))", 800: "hsl(var(--primary-800))",
            900: "hsl(var(--primary-900))", DEFAULT: "hsl(var(--primary-600))",
          },
          grey: {
            50: "hsl(var(--grey-50))", 100: "hsl(var(--grey-100))", 200: "hsl(var(--grey-200))",
            300: "hsl(var(--grey-300))", 400: "hsl(var(--grey-400))", 500: "hsl(var(--grey-500))",
            600: "hsl(var(--grey-600))", 700: "hsl(var(--grey-700))", 800: "hsl(var(--grey-800))",
            900: "hsl(var(--grey-900))", 950: "hsl(var(--grey-950))",
          },
          green: {
            50: "hsl(var(--green-50))", 100: "hsl(var(--green-100))", 200: "hsl(var(--green-200))",
            300: "hsl(var(--green-300))", 400: "hsl(var(--green-400))", 500: "hsl(var(--green-500))",
            600: "hsl(var(--green-600))", 700: "hsl(var(--green-700))", 800: "hsl(var(--green-800))",
            900: "hsl(var(--green-900))", DEFAULT: "hsl(var(--green-600))",
          },
          yellow: "hsl(var(--yellow-base))",
          red: "hsl(var(--red-base))",
        },
      },
      transitionDuration: {
        DEFAULT: "400ms",
        fast: "200ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
