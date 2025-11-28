'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from './ThemeProvider';

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, isMounted } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      className={cn(
        'focus-ring relative h-10 w-10 rounded-full border border-border/80 bg-card/60 text-foreground shadow-sm transition-colors hover:bg-accent hover:text-foreground',
        className,
      )}
      onClick={toggleTheme}
      aria-label="Alternar tema claro/escuro"
      aria-pressed={isDark}
      disabled={!isMounted}
    >
      <Sun
        aria-hidden
        className={cn(
          'absolute h-5 w-5 transition-all duration-300',
          isDark ? 'translate-y-3 opacity-0' : 'translate-y-0 opacity-100',
        )}
      />
      <Moon
        aria-hidden
        className={cn(
          'absolute h-5 w-5 transition-all duration-300',
          isDark ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
        )}
      />
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}
