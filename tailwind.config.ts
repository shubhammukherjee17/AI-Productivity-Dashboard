import type { Config } from "tailwindcss";

export default {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['var(--font-sans)'],
  		},
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
        keyframes: {
            float: {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-5px)' },
            },
            shimmer: {
                '0%': { transform: 'skewX(-12deg) translateX(-150%)' },
                '100%': { transform: 'skewX(-12deg) translateX(150%)' },
            }
        },
        animation: {
            float: 'float 3s ease-in-out infinite',
            shimmer: 'shimmer 2s infinite',
        }
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
