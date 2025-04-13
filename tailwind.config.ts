
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        remarket: {
          // Light mode colors
          DEFAULT: '#6B7FDB',        // Primary Brand
          secondary: '#FF758F',      // Secondary
          accent: '#4CCEAC',         // Accent (Success)
          warning: '#FFAA5C',        // Warning
          dark: '#2D3436',           // Primary Text
          muted: '#F5F5F5',          // App Background
          'card-bg': '#FFFFFF',      // Card/Box BG
          'text-secondary': '#636E72', // Secondary Text
          'text-on-primary': '#FFFFFF', // Text on Primary
          'price-tag': '#00B894',    // Price Tag
          'category-badge': '#A29BFE', // Category Badge
          'card-border': '#DFE6E9',  // Border (Cards)
          
          // Dark mode specific colors for reference - will be used with dark: prefix
          'dark-primary': '#7E8EF3',   // Dark mode Primary Brand
          'dark-secondary': '#FF8FA3',  // Dark mode Secondary
          'dark-accent': '#55EFC4',    // Dark mode Accent
          'dark-bg': '#1A1A1A',        // Dark mode App Background
          'dark-card-bg': '#2D3436',    // Dark mode Card/Box BG
          'dark-navbar': '#252525',     // Dark mode Header/Navbar
          'dark-text': '#ECF0F1',       // Dark mode Primary Text
          'dark-text-secondary': '#B2BEC3', // Dark mode Secondary Text
          'dark-price-tag': '#00CEA9',  // Dark mode Price Tag
          'dark-category-badge': '#B8A1FF', // Dark mode Category Badge
          'dark-card-border': '#3E4A4E' // Dark mode Border (Cards)
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        'slide-in': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'lift-up': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-5px)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.4s ease-out',
        'lift-up': 'lift-up 0.2s ease-out forwards'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif']
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
