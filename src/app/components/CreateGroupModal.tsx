import { useState } from "react";
import { X, MapPin } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    module: "",
    city: "",
    type: "presentiel" as "presentiel" | "en-ligne",
    description: "",
  });

  const modules = [
    "Data Science",
    "SQL",
    "Architecture",
    "Systèmes d'Information",
    "Réseaux",
    "Développement Web",
    "Intelligence Artificielle",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nouveau groupe créé:", formData);
    onClose();
    setFormData({
      name: "",
      module: "",
      city: "",
      type: "presentiel",
      description: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div
        className="bg-card w-full max-w-2xl rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card border-b border-[#E2E8F0] p-4 sm:p-6">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-xl sm:text-2xl text-[#111111]" style={{ fontWeight: 600 }}>
              {t("modal.createTitle")}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-[#111111] transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            {t("modal.createSubtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label className="block mb-2 text-sm text-[#111111]" style={{ fontWeight: 600 }}>
                {t("modal.groupName")}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={t("modal.groupNamePlaceholder")}
                className="w-full px-4 py-3 bg-background border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition-all text-sm sm:text-base"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-[#111111]" style={{ fontWeight: 600 }}>
                {t("modal.module")}
              </label>
              <select
                value={formData.module}
                onChange={(e) =>
                  setFormData({ ...formData, module: e.target.value })
                }
                className="w-full px-4 py-3 bg-background border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition-all appearance-none cursor-pointer text-sm sm:text-base"
                required
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23111111' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
              >
                <option value="">{t("modal.selectModule")}</option>
                {modules.map((module) => (
                  <option key={module} value={module}>
                    {module}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm text-[#111111]" style={{ fontWeight: 600 }}>
                {t("modal.city")}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  placeholder={t("modal.cityPlaceholder")}
                  className="w-full pl-11 pr-4 py-3 bg-background border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition-all text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm text-[#111111]" style={{ fontWeight: 600 }}>
                {t("modal.meetingType")}
              </label>
              <div className="flex gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, type: "presentiel" })
                  }
                  className={`flex-1 px-3 sm:px-4 py-3 rounded-lg border-2 transition-all text-sm sm:text-base ${
                    formData.type === "presentiel"
                      ? "border-[#003366] bg-[#003366]/5 text-[#003366]"
                      : "border-[#E2E8F0] text-[#111111] hover:border-gray-300"
                  }`}
                  style={{ fontWeight: formData.type === "presentiel" ? 600 : 400 }}
                >
                  {t("modal.inPerson")}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, type: "en-ligne" })
                  }
                  className={`flex-1 px-3 sm:px-4 py-3 rounded-lg border-2 transition-all text-sm sm:text-base ${
                    formData.type === "en-ligne"
                      ? "border-[#003366] bg-[#003366]/5 text-[#003366]"
                      : "border-[#E2E8F0] text-[#111111] hover:border-gray-300"
                  }`}
                  style={{ fontWeight: formData.type === "en-ligne" ? 600 : 400 }}
                >
                  {t("modal.online")}
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm text-[#111111]" style={{ fontWeight: 600 }}>
                {t("modal.description")}
                <span className="text-gray-400 ml-1" style={{ fontWeight: 400 }}>
                  {t("modal.optional")}
                </span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder={t("modal.descriptionPlaceholder")}
                rows={4}
                className="w-full px-4 py-3 bg-background border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent transition-all resize-none text-sm sm:text-base"
              />
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-600">
                {t("modal.visibilityNote")}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-[#111111] border border-[#E2E8F0] rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1"
              style={{ fontWeight: 500 }}
            >
              {t("modal.cancel")}
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#003366] text-white rounded-lg hover:bg-[#004080] transition-colors order-1 sm:order-2"
              style={{ fontWeight: 600 }}
            >
              {t("modal.create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
