/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        carbon: '#0A0A0D',
        graphite: '#111116',
        panel: '#16151A',
        bone: '#F6EFE5',
        muted: '#A99F91',
        gold: '#D8A84E',
        amber: '#FFB86B',
        rose: '#C98A7A',
        cyan: '#7DD3FC',
        mint: '#8FE388'
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace']
      },
      boxShadow: {
        glow: '0 0 80px rgba(216, 168, 78, 0.16)',
        cyan: '0 0 90px rgba(125, 211, 252, 0.14)',
        rose: '0 0 90px rgba(201, 138, 122, 0.14)'
      },
      backgroundImage: {
        'radial-grid': 'radial-gradient(circle at center, rgba(246,239,229,.08) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
