import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";

const Prices = () => {
  const pricingPlans = [
    {
      title: "Минимум",
      price: "от 25.000₽",
      duration: "1 неделя",
      description: "Идеально для стартапов и малого бизнеса",
      features: [
        "Уникальный дизайн",
        "1 страница",
        "Адаптивная вёрстка",
        "SEO базовая настройка",
        "Форма обратной связи"
      ]
    },
    {
      title: "Стандарт",
      price: "от 60.000₽",
      duration: "от 3х недель",
      description: "Полноценный сайт для бизнеса",
      features: [
        "Уникальный дизайн",
        "До 5 страниц",
        "Адаптивная вёрстка",
        "CMS для управления",
        "SEO оптимизация",
        "Аналитика",
        "Форма обратной связи"
      ]
    },
    {
      title: "Премиум",
      price: "от 120.000₽",
      duration: "от 3 до 8 недель",
      description: "Комплексное решение с расширенным функционалом",
      features: [
        "Уникальный дизайн",
        "Неограниченно страниц",
        "Адаптивная вёрстка",
        "CMS + интеграции",
        "E-commerce функции",
        "SEO продвижение",
        "Аналитика + отчёты",
        "Техподдержка 3 месяца"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-card-foreground hover:text-muted-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="text-sm uppercase tracking-wider">Back</span>
          </Link>
          <div className="h-px bg-card-border flex-1"></div>
          <h1 className="text-2xl font-bold text-card-foreground uppercase tracking-wider">Prices</h1>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <Card key={plan.title} className="bg-card border-2 border-card-border p-8 shadow-xl">
              <div className="space-y-6">
                {/* Plan Header */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-card-foreground uppercase tracking-wider mb-2">
                    {plan.title}
                  </h3>
                  <div className="text-3xl font-bold text-card-foreground mb-1">
                    {plan.price}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    {plan.duration}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  {plan.description}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check size={16} className="text-card-foreground flex-shrink-0" />
                      <span className="text-sm text-card-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Contact Button */}
                <div className="pt-4">
                  <a 
                    href="https://t.me/k_k0stya" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full block text-center py-3 px-6 border border-card-border text-card-foreground hover:bg-muted transition-colors uppercase tracking-wider text-sm"
                  >
                    Заказать
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prices;