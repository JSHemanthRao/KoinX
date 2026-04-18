import { ReactNode, useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const Header = () => {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="w-full bg-card border-b border-border py-4 px-6 md:px-12 flex justify-between items-center shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="font-bold text-2xl tracking-tight flex items-center">
          <span className="text-card-blue">Koin</span>
          <span className="text-text">X</span>
          <span className="text-[10px] bg-yellow-100 text-yellow-600 font-semibold px-1 py-0.5 rounded ml-1 relative -top-2">TM</span>
        </div>
      </div>
      <button 
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-background transition-colors focus:outline-none"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <Sun className="w-5 h-5 text-text" /> : <Moon className="w-5 h-5 text-text" />}
      </button>
    </header>
  );
};

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-text">
      <Header />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {children}
      </main>
    </div>
  );
};
