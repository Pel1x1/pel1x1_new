import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Code, Server, Palette, Zap } from "lucide-react";

const Technologies = () => {
  const techCategories = [
    {
      title: "Frontend",
      icon: <Code size={24} color="#ffd3ff"/>,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js"],
      description: "Современные адаптивные интерфейсы с плавной анимацией и идеальным UX"
    },
    {
      title: "Backend",
      icon: <Server size={24} color="#ffd3ff"/>,
      technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST API"],
      description: "Масштабируемая серверная архитектура с базами данных и безопасной аутентификацией"
    },
    {
      title: "Design",
      icon: <Palette size={24} color="#ffd3ff"/>,
      technologies: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Blender"],
      description: "Красивый дизайн пользовательского интерфейса/UX от концепции до реализации"
    },
    {
      title: "Extra",
      icon: <Zap size={24} color="#ffd3ff"/>,
      technologies: ["Docker", "AWS", "Git", "SEO", "Analytics"],
      description: "Развертывание, оптимизация и аналитика для достижения максимальной производительности"
    }
  ];

  return (
<div className="min-h-screen p-8 bg-transparent pointer-events-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-card-foreground hover:text-muted-foreground transition-colors"
          >
            <ArrowLeft size={20} color="#ffd3ff"/>
            <span className="text-sm uppercase tracking-wider text-[#ffd3ff]">Back</span>
          </Link>
          <div className="h-px bg-card-border flex-1"></div>
          <h1 className="text-2xl font-bold text-card-foreground uppercase tracking-wider">Technologies</h1>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techCategories.map((category) => (
            <Card key={category.title} className="bg-card border-2 border-card-border p-8 shadow-xl">
              <div className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <div className="text-card-foreground ">{category.icon}</div>
                  <h3 className="text-xl font-bold text-card-foreground uppercase tracking-wider">
                    {category.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {category.description}
                </p>

                {/* Technologies List */}
                <div className="space-y-2">
                  <h4 className="text-sm text-card-foreground font-medium uppercase tracking-wider">Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-muted text-muted-foreground text-xs uppercase tracking-wider border border-card-border rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technologies;