import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to home page after login
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8" style={{ borderRadius: '8px' }}>
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="w-10 h-10" style={{ color: '#003366' }} />
              <span className="text-2xl" style={{ fontWeight: 600, color: '#003366' }}>
                StudyConnect
              </span>
            </div>
            <h1 className="text-2xl" style={{ fontWeight: 600, color: '#003366' }}>
              {t("login.title")}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block mb-2 text-sm"
                style={{ fontWeight: 500, color: '#003366' }}
              >
                {t("login.email")}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("login.emailPlaceholder")}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring bg-secondary"
                style={{ borderRadius: '8px' }}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block mb-2 text-sm"
                style={{ fontWeight: 500, color: '#003366' }}
              >
                {t("login.password")}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("login.passwordPlaceholder")}
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border focus:ring-2 focus:ring-ring accent-primary"
                  style={{ borderRadius: '4px' }}
                />
                <span className="text-sm text-muted-foreground">
                  {t("login.rememberMe")}
                </span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm hover:underline transition-colors"
                style={{ color: '#003366' }}
              >
                {t("login.forgotPassword")}
              </Link>
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
              {t("login.submit")}
            </button>
          </form>

          {/* Footer - Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t("login.noAccount")}{" "}
              <Link 
                to="/register" 
                className="hover:underline transition-colors"
                style={{ color: '#003366', fontWeight: 500 }}
              >
                {t("login.register")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
