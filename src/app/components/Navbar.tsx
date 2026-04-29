import { useState, useEffect } from "react";
import { Link } from "react-router";
import { GraduationCap, Moon, Sun, Menu, X, Languages } from "lucide-react";
import { CreateGroupModal } from "./CreateGroupModal";
import { useLanguage } from "../contexts/LanguageContext";

export function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  return (
    <>
      <nav className="bg-white dark:bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <span className="text-lg sm:text-xl text-primary" style={{ fontWeight: 600 }}>
              StudyConnect
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link
              to="/search"
              className="text-foreground hover:text-primary transition-colors text-sm lg:text-base"
            >
              {t("nav.myGroups")}
            </Link>
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors text-sm lg:text-base"
            >
              {t("nav.profile")}
            </Link>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-2 text-foreground hover:text-primary transition-colors text-sm"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-primary-foreground px-3 lg:px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm lg:text-base whitespace-nowrap"
            >
              {t("nav.createGroup")}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white dark:bg-card">
            <div className="px-4 py-3 space-y-3">
              <Link
                to="/search"
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.myGroups")}
              </Link>
              <Link
                to="/"
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.profile")}
              </Link>
              <div className="flex items-center gap-3 py-2">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-3 py-2 text-foreground hover:text-primary transition-colors border border-border rounded-lg flex-1"
                >
                  <Languages className="w-4 h-4" />
                  <span className="uppercase">{language === "fr" ? "Français" : "English"}</span>
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 text-foreground hover:text-primary transition-colors border border-border rounded-lg"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                {t("nav.createGroup")}
              </button>
            </div>
          </div>
        )}
      </nav>

      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
