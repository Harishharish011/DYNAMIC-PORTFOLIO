/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Semantic (CSS-vars-backed) design tokens
        background: {
          DEFAULT: "var(--color-background)",
          deep: "var(--color-background-deep)",
          surface: "var(--color-background-surface)",
        },
        purple: {
          600: "var(--color-primary-purple)",
          700: "var(--color-secondary-purple)",
        },
        blue: {
          500: "var(--color-accent-blue)",
          400: "var(--color-accent-blue-soft)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        glass: {
          bg: "var(--glass-bg)",
          bgStrong: "var(--glass-bg-strong)",
          border: "var(--glass-border)",
          edge: "var(--glass-edge)",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial"],
      },
      fontSize: {
        // Typography tokens (clamp-based)
        heroXL: ["clamp(4.5rem, 7vw, 14rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        heroLarge: ["clamp(3.5rem, 5vw, 10rem)", { lineHeight: "0.94", letterSpacing: "-0.035em" }],
        heroMedium: ["clamp(2.75rem, 3.8vw, 6.5rem)", { lineHeight: "0.97", letterSpacing: "-0.03em" }],

        headingXL: ["clamp(2rem, 2.6vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        headingLarge: ["clamp(1.5rem, 2vw, 2.25rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        headingMedium: ["clamp(1.25rem, 1.6vw, 1.75rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],

        bodyLarge: ["clamp(1rem, 1.2vw, 1.125rem)", { lineHeight: "1.6", letterSpacing: "-0.005em" }],
        bodyMedium: ["1rem", { lineHeight: "1.65", letterSpacing: "-0.005em" }],
        caption: ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],

        button: ["0.95rem", { lineHeight: "1", letterSpacing: "0.01em" }],
      },
      spacing: {
        // Spacing tokens from theme.css (canonical scale)
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        7: "var(--space-7)",
        8: "var(--space-8)",
        9: "var(--space-9)",
        10: "var(--space-10)",
        11: "var(--space-11)",
        12: "var(--space-12)",
      },
      container: {
        center: true,
        padding: "1rem",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        // System shadows / glows
        "glow-purple": "var(--glow-purple-medium)",
        "glow-blue": "var(--glow-blue)",
        "glow-cosmic": "var(--glow-cosmic)",
        glass: "var(--shadow-glass)",
        soft: "var(--shadow-soft)",
      },
      transitionTimingFunction: {
        "ease-out-quad": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};
