import { FC } from "hono/jsx";
import { Sun, Moon } from "lucide-static";

export const ThemeSwitcher: FC = () => {
  return (
    <div class="theme-switcher">
      <button 
        class="theme-switcher-button" 
        aria-label="Toggle theme"
        data-theme-toggle
      >
        <span class="theme-icon light-icon" dangerouslySetInnerHTML={{ __html: Sun }} />
        <span class="theme-icon dark-icon" dangerouslySetInnerHTML={{ __html: Moon }} />
      </button>
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          const button = document.querySelector('[data-theme-toggle]');
          if (button) {
            button.addEventListener('click', function() {
              const html = document.documentElement;
              const currentTheme = html.getAttribute('data-theme') || 'light';
              const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
              
              html.setAttribute('data-theme', newTheme);
              
              // Save preference. If switching to system default, clear storage
              const systemPreference = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              if (newTheme === systemPreference) {
                // User is switching to their system preference, so clear manual override
                localStorage.removeItem('theme');
              } else {
                // User is choosing opposite of system preference
                localStorage.setItem('theme', newTheme);
              }
            });
          }
        });
      `}} />
    </div>
  );
};