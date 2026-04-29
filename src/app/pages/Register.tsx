import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { GraduationCap, Eye, EyeOff, ChevronDown } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const cities = [
  { value: "oujda", label: "Oujda" },
  { value: "casablanca", label: "Casablanca" },
  { value: "rabat", label: "Rabat" },
];

export function Register() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to login page after registration
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4 py-6 sm:py-8">
      <div className="w-full max-w-md">
        <div 
          className="bg-white p-6 sm:p-8"
          style={{ 
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}
        >
          {/* Logo */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#003366' }} />
              <span className="text-xl sm:text-2xl" style={{ fontWeight: 600, color: '#003366' }}>
                StudyConnect
              </span>
            </div>
          </div>

          {/* Title and Welcome Text */}
          <div className="text-center mb-5 sm:mb-6">
            <h1 className="text-xl sm:text-2xl mb-2" style={{ fontWeight: 600, color: '#003366' }}>
              {t("register.title")}
            </h1>
            <p className="text-sm text-muted-foreground px-2 sm:px-0">
              {t("register.subtitle")}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Full Name Field */}
            <div>
              <label 
                htmlFor="fullName" 
                className="block mb-2 text-sm"
                style={{ fontWeight: 500, color: '#003366' }}
              >
                {t("register.fullName")}
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t("register.fullNamePlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-secondary"
                style={{ borderRadius: '8px' }}
                required
              />
            </div>

            {/* Academic Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block mb-2 text-sm"
                style={{ fontWeight: 500, color: '#003366' }}
              >
                {t("register.email")}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("register.emailPlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-secondary"
                style={{ borderRadius: '8px' }}
                required
              />
            </div>

            {/* City Dropdown */}
            <div>
              <label 
                htmlFor="city" 
                className="block mb-2 text-sm"
                style={{ fontWeight: 500, color: '#003366' }}
              >
                {t("register.city")}
              </label>
              <div className="relative">
                <select
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-secondary appearance-none cursor-pointer"
                  style={{ borderRadius: '8px' }}
                  required
                >
                  <option value="" disabled>{t("register.cityPlaceholder")}</option>
                  {cities.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <ChevronDown 
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" 
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block mb-2 text-sm"
                style={{ fontWeight: 500, color: '#003366' }}
              >
                {t("register.password")}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("register.passwordPlaceholder")}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-secondary pr-12"
                  style={{ borderRadius: '8px' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              style={{ 
                backgroundColor: '#003366', 
                borderRadius: '8px',
                fontWeight: 600 
              }}
            >
              {t("register.submit")}
            </button>
          </form>

          {/* Footer - Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t("register.hasAccount")}{" "}
              <Link 
                to="/login" 
                className="hover:underline transition-colors"
                style={{ color: '#003366', fontWeight: 500 }}
              >
                {t("register.login")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
