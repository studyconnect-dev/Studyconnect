import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "fr" | "en";

interface Translations {
  [key: string]: {
    fr: string;
    en: string;
  };
}

const translations: Translations = {
  // Navbar
  "nav.myGroups": { fr: "Mes Groupes", en: "My Groups" },
  "nav.profile": { fr: "Profil", en: "Profile" },
  "nav.createGroup": { fr: "Créer un groupe", en: "Create a Group" },

  // Home
  "home.title": { fr: "Apprendre ensemble, réussir mieux.", en: "Learn together, succeed better." },
  "home.subtitle": { fr: "Trouvez votre groupe de révision en quelques clics.", en: "Find your study group in just a few clicks." },
  "home.moduleLabel": { fr: "Quel module révisez-vous ?", en: "Which module are you studying?" },
  "home.modulePlaceholder": { fr: "Ex: Data Science, SQL, Architecture...", en: "Ex: Data Science, SQL, Architecture..." },
  "home.cityLabel": { fr: "Dans quelle ville ?", en: "In which city?" },
  "home.cityPlaceholder": { fr: "Ex: Oujda, Casablanca...", en: "Ex: Oujda, Casablanca..." },
  "home.searchButton": { fr: "Rechercher", en: "Search" },
  "home.popularCategories": { fr: "Catégories populaires", en: "Popular categories" },

  // Search Results
  "search.title": { fr: "Résultats de recherche", en: "Search Results" },
  "search.resultsFor": { fr: "Résultats pour", en: "Results for" },
  "search.allGroups": { fr: "Tous les groupes", en: "All groups" },
  "search.filters": { fr: "Filtres", en: "Filters" },
  "search.meetingType": { fr: "Type de rencontre", en: "Meeting Type" },
  "search.online": { fr: "En ligne", en: "Online" },
  "search.inPerson": { fr: "Présentiel", en: "In Person" },
  "search.availability": { fr: "Disponibilité", en: "Availability" },
  "search.availableSpots": { fr: "Places disponibles", en: "Available spots" },
  "search.students": { fr: "étudiants", en: "students" },
  "search.joinGroup": { fr: "Rejoindre le groupe", en: "Join Group" },
  "search.noResults": { fr: "Aucun groupe trouvé. Essayez d'ajuster vos filtres.", en: "No groups found. Try adjusting your filters." },

  // Group Chat
  "chat.backToResults": { fr: "Retour aux résultats", en: "Back to results" },
  "chat.members": { fr: "Membres", en: "Members" },
  "chat.online": { fr: "En ligne", en: "Online" },
  "chat.planMeeting": { fr: "Planifier une rencontre", en: "Plan a Meeting" },
  "chat.onlineSession": { fr: "Session en ligne", en: "Online Session" },
  "chat.inPersonMeeting": { fr: "Rencontre présentielle", en: "In-Person Meeting" },
  "chat.addToCalendar": { fr: "Ajouter au calendrier", en: "Add to Calendar" },
  "chat.groupDiscussion": { fr: "Discussion du groupe", en: "Group Discussion" },
  "chat.typePlaceholder": { fr: "Tapez votre message...", en: "Type your message..." },

  // Create Group Modal
  "modal.createTitle": { fr: "Créer un nouveau groupe", en: "Create a New Group" },
  "modal.createSubtitle": { fr: "Remplissez les détails ci-dessous pour inviter d'autres étudiants à réviser avec vous.", en: "Fill in the details below to invite other students to study with you." },
  "modal.groupName": { fr: "Nom du groupe", en: "Group Name" },
  "modal.groupNamePlaceholder": { fr: "ex: Révisions Intenses SQL - EST", en: "ex: Intense SQL Review - EST" },
  "modal.module": { fr: "Module concerné", en: "Related Module" },
  "modal.selectModule": { fr: "Sélectionnez un module", en: "Select a module" },
  "modal.city": { fr: "Ville", en: "City" },
  "modal.cityPlaceholder": { fr: "ex: Oujda, Casablanca...", en: "ex: Oujda, Casablanca..." },
  "modal.meetingType": { fr: "Type de rencontre", en: "Meeting Type" },
  "modal.inPerson": { fr: "📍 Présentiel", en: "📍 In Person" },
  "modal.online": { fr: "💻 En ligne", en: "💻 Online" },
  "modal.description": { fr: "Description", en: "Description" },
  "modal.optional": { fr: "(optionnel)", en: "(optional)" },
  "modal.descriptionPlaceholder": { fr: "Précisez l'objectif du groupe, les chapitres à réviser, ou le lieu de rendez-vous...", en: "Specify the group's objective, chapters to review, or meeting location..." },
  "modal.visibilityNote": { fr: "✨ Votre groupe sera visible instantanément par les étudiants de votre ville.", en: "✨ Your group will be instantly visible to students in your city." },
  "modal.cancel": { fr: "Annuler", en: "Cancel" },
  "modal.create": { fr: "Créer le groupe", en: "Create Group" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "fr" || savedLang === "en")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
