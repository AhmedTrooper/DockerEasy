'use client';

import { useTheme } from '../../app/context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
