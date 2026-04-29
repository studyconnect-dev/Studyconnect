import { useState } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Search } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [module, setModule] = useState("");
  const [city, setCity] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?module=${encodeURIComponent(module)}&city=${encodeURIComponent(city)}`);
  };

  const popularCategories = ["Data Science", "SQL", "Architecture"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl px-4" style={{ fontWeight: 600, color: '#003366' }}>
            {t("home.title")}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground px-4">
            {t("home.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="bg-card p-4 sm:p-6 rounded-2xl shadow-lg border border-border">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1">
                <label className="block mb-2 text-sm text-foreground">
                  {t("home.moduleLabel")}
                </label>
                <input
                  type="text"
                  value={module}
                  onChange={(e) => setModule(e.target.value)}
                  placeholder={t("home.modulePlaceholder")}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block mb-2 text-sm text-foreground">
                  {t("home.cityLabel")}
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={t("home.cityPlaceholder")}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-primary text-primary-foreground px-6 sm:px-8 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 sm:self-end"
              >
                <Search className="w-5 h-5" />
                <span className="sm:inline">{t("home.searchButton")}</span>
              </button>
            </div>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            {t("home.popularCategories")}
          </p>
          <div className="flex gap-3 justify-center flex-wrap px-4">
            {popularCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setModule(category);
                }}
                className="px-4 sm:px-6 py-2 bg-card border border-border rounded-full hover:border-primary hover:text-primary transition-colors text-sm sm:text-base"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
