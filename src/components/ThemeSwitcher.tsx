import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    // @ts-ignore - document.startViewTransition is not yet in all TS definitions
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // @ts-ignore
    document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
      // Force immediate DOM update for the transition snapshot
      document.documentElement.classList.remove("light", "dark", "beige", "burgundy");
      if (newTheme !== "system") {
        document.documentElement.classList.add(newTheme);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 shrink-0">
          <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-3.5 w-3.5 sm:h-4 sm:w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")} className={theme === 'light' ? 'bg-accent' : ''}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Blanc</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")} className={theme === 'dark' ? 'bg-accent' : ''}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Noir</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("beige")} className={theme === 'beige' ? 'bg-accent' : ''}>
          <Palette className="mr-2 h-4 w-4 text-[#d2b48c]" />
          <span>Beige</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("burgundy")} className={theme === 'burgundy' ? 'bg-accent' : ''}>
          <Palette className="mr-2 h-4 w-4 text-[#800020]" />
          <span>Rouge Bordeaux</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
