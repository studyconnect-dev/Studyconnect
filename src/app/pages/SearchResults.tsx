import { useState } from "react";
import { useSearchParams, Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Users, MapPin, Video, Filter } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface Group {
  id: string;
  name: string;
  module: string;
  type: "presentiel" | "en-ligne";
  currentMembers: number;
  maxMembers: number;
  city: string;
}

const mockGroups: Group[] = [
  {
    id: "1",
    name: "Projet Data - Team Alpha",
    module: "Data Science",
    type: "presentiel",
    currentMembers: 3,
    maxMembers: 4,
    city: "Oujda",
  },
  {
    id: "2",
    name: "SQL Masters",
    module: "SQL",
    type: "en-ligne",
    currentMembers: 2,
    maxMembers: 5,
    city: "Oujda",
  },
  {
    id: "3",
    name: "Architecture Cloud Study Group",
    module: "Architecture",
    type: "presentiel",
    currentMembers: 4,
    maxMembers: 6,
    city: "Oujda",
  },
  {
    id: "4",
    name: "Data Science Bootcamp",
    module: "Data Science",
    type: "en-ligne",
    currentMembers: 5,
    maxMembers: 8,
    city: "Oujda",
  },
];

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  const module = searchParams.get("module") || "";
  const city = searchParams.get("city") || "";

  const [filterType, setFilterType] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredGroups = mockGroups.filter((group) => {
    const matchesModule = !module || group.module.toLowerCase().includes(module.toLowerCase());
    const matchesCity = !city || group.city.toLowerCase().includes(city.toLowerCase());
    const matchesType = filterType.length === 0 || filterType.includes(group.type);
    return matchesModule && matchesCity && matchesType;
  });

  const handleTypeFilter = (type: string) => {
    setFilterType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl text-foreground mb-2" style={{ fontWeight: 600 }}>
            {t("search.title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {module && city ? `${t("search.resultsFor")} "${module}" à "${city}"` : t("search.allGroups")}
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden mb-4 flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg w-full sm:w-auto"
        >
          <Filter className="w-4 h-4" />
          {t("search.filters")}
        </button>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block md:w-64 shrink-0`}>
            <div className="bg-card rounded-lg p-4 sm:p-6 shadow-sm">
              <h3 className="mb-4 text-foreground" style={{ fontWeight: 600 }}>
                {t("search.filters")}
              </h3>

              <div className="mb-6">
                <p className="mb-3 text-sm text-foreground" style={{ fontWeight: 500 }}>
                  {t("search.meetingType")}
                </p>
                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterType.includes("en-ligne")}
                    onChange={() => handleTypeFilter("en-ligne")}
                    className="w-4 h-4 accent-primary cursor-pointer"
                  />
                  <span className="text-sm text-foreground">{t("search.online")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterType.includes("presentiel")}
                    onChange={() => handleTypeFilter("presentiel")}
                    className="w-4 h-4 accent-primary cursor-pointer"
                  />
                  <span className="text-sm text-foreground">{t("search.inPerson")}</span>
                </label>
              </div>

              <div>
                <p className="mb-3 text-sm text-foreground" style={{ fontWeight: 500 }}>
                  {t("search.availability")}
                </p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-primary cursor-pointer"
                  />
                  <span className="text-sm text-foreground">{t("search.availableSpots")}</span>
                </label>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid gap-4">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  className="bg-card rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                        <h3 className="text-base sm:text-lg text-foreground" style={{ fontWeight: 600 }}>
                          {group.name}
                        </h3>
                        <span className="px-3 py-1 bg-secondary text-primary text-xs sm:text-sm rounded-full w-fit">
                          {group.module}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {group.type === "en-ligne" ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                          <span>{group.type === "en-ligne" ? t("search.online") : t("search.inPerson")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {group.currentMembers}/{group.maxMembers} {t("search.students")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/group/${group.id}`}
                      className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-2 rounded-lg hover:opacity-90 transition-opacity text-center text-sm sm:text-base whitespace-nowrap"
                    >
                      {t("search.joinGroup")}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredGroups.length === 0 && (
              <div className="bg-card rounded-lg p-8 sm:p-12 text-center">
                <p className="text-muted-foreground text-sm sm:text-base">
                  {t("search.noResults")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
