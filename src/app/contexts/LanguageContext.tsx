import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "fr" | "en";

interface Translations {
  [key: string]: {
    fr: string;
    en: string;
  };
}

const translations: Translations = {
  // Register
  "register.title": { fr: "Créer un profil étudiant", en: "Create a student profile" },
  "register.subtitle": { fr: "Rejoignez la communauté StudyConnect et trouvez vos partenaires de révision.", en: "Join the StudyConnect community and find your study partners." },
  "register.fullName": { fr: "Nom Complet", en: "Full Name" },
  "register.fullNamePlaceholder": { fr: "Entrez votre nom complet", en: "Enter your full name" },
  "register.email": { fr: "Email Académique", en: "Academic Email" },
  "register.emailPlaceholder": { fr: "votre.nom@universite.ma", en: "your.name@university.ma" },
  "register.city": { fr: "Ville", en: "City" },
  "register.cityPlaceholder": { fr: "Sélectionnez votre ville", en: "Select your city" },
  "register.password": { fr: "Mot de passe", en: "Password" },
  "register.passwordPlaceholder": { fr: "Créez un mot de passe sécurisé", en: "Create a secure password" },
  "register.submit": { fr: "S'inscrire gratuitement", en: "Sign up for free" },
  "register.hasAccount": { fr: "Déjà membre ?", en: "Already a member?" },
  "register.login": { fr: "Connectez-vous ici", en: "Sign in here" },

  // Login
  "login.title": { fr: "Ravi de vous revoir", en: "Welcome back" },
  "login.email": { fr: "Email", en: "Email" },
  "login.emailPlaceholder": { fr: "votre@email.com", en: "your@email.com" },
  "login.password": { fr: "Mot de passe", en: "Password" },
  "login.passwordPlaceholder": { fr: "Entrez votre mot de passe", en: "Enter your password" },
  "login.rememberMe": { fr: "Se souvenir de moi", en: "Remember me" },
  "login.forgotPassword": { fr: "Mot de passe oublié ?", en: "Forgot password?" },
  "login.submit": { fr: "Se connecter", en: "Sign in" },
  "login.noAccount": { fr: "Pas encore de compte ?", en: "Don't have an account?" },
  "login.register": { fr: "Rejoignez-nous", en: "Join us" },

  // FAQ
  "faq.title": { fr: "Foire Aux Questions", en: "Frequently Asked Questions" },
  "faq.subtitle": { fr: "Tout ce que vous devez savoir sur StudyConnect", en: "Everything you need to know about StudyConnect" },
  "faq.q1": { fr: "Comment rejoindre un groupe de révision ?", en: "How do I join a study group?" },
  "faq.a1": { fr: "Recherchez par module et ville, puis cliquez sur 'Rejoindre' sur la carte du groupe.", en: "Search by module and city, then click 'Join' on the group card." },
  "faq.q2": { fr: "Est-ce que StudyConnect est gratuit pour tous les étudiants ?", en: "Is StudyConnect free for all students?" },
  "faq.a2": { fr: "Oui, la plateforme est entièrement gratuite pour faciliter l'entraide académique.", en: "Yes, the platform is completely free to facilitate academic mutual aid." },
  "faq.q3": { fr: "Puis-je créer mon propre groupe si je ne trouve pas de module ?", en: "Can I create my own group if I can't find a module?" },
  "faq.a3": { fr: "Absolument ! Utilisez le bouton 'Créer un groupe' dans la barre de navigation.", en: "Absolutely! Use the 'Create a group' button in the navigation bar." },
  "faq.q4": { fr: "Comment fonctionne le chat intégré ?", en: "How does the integrated chat work?" },
  "faq.a4": { fr: "Une fois le groupe rejoint, vous accédez à un espace de discussion en temps réel pour fixer vos rendez-vous.", en: "Once you join the group, you access a real-time discussion space to schedule your meetings." },
  "faq.q5": { fr: "Les groupes sont-ils en présentiel ou en ligne ?", en: "Are the groups in-person or online?" },
  "faq.a5": { fr: "Les deux ! Chaque groupe précise son mode de rencontre sur sa carte de présentation.", en: "Both! Each group specifies its meeting mode on its presentation card." },

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
