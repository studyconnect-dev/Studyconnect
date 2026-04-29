import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface FAQItem {
  questionKey: string;
  answerKey: string;
}

const faqItems: FAQItem[] = [
  {
    questionKey: "faq.q1",
    answerKey: "faq.a1",
  },
  {
    questionKey: "faq.q2",
    answerKey: "faq.a2",
  },
  {
    questionKey: "faq.q3",
    answerKey: "faq.a3",
  },
  {
    questionKey: "faq.q4",
    answerKey: "faq.a4",
  },
  {
    questionKey: "faq.q5",
    answerKey: "faq.a5",
  },
];

export function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl mb-3"
            style={{ fontWeight: 600, color: '#003366' }}
          >
            {t("faq.title")}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-border overflow-hidden transition-all duration-200"
              style={{ borderRadius: '8px' }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span 
                  className="text-sm sm:text-base pr-4"
                  style={{ fontWeight: 500, color: '#003366' }}
                >
                  {t(item.questionKey)}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  style={{ color: '#003366' }}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div 
                  className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base leading-relaxed"
                  style={{ color: '#333333' }}
                >
                  {t(item.answerKey)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
