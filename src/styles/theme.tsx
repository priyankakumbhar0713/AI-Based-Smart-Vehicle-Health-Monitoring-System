export const Colors = {
  light: {
    background: '#FFFFFF',
    card: '#F8F8F8',
    text: '#111827',
    tint: '#2563EB',
    muted: '#6B7280',
  },
  dark: {
    background: '#0B1220',
    card: '#0F1724',
    text: '#E6EEF3',
    tint: '#60A5FA',
    muted: '#94A3B8',
  },
} as const;

export const Fonts = {
  regular: 'System',
  rounded: 'System',
  mono: 'Menlo',
} as const;

export default { Colors, Fonts };
