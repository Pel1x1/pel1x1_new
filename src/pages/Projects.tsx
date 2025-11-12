import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Загородный комплекс «ЗВЁЗДНЫЙ»",
      description: "Современный сайт отеля",
      link: "https://zvezdny-complex.ru/",
      images: ["/img/zvezdny/1.webp", "/img/zvezdny/2.webp", "/img/zvezdny/3.webp", "/img/zvezdny/4.webp","/img/zvezdny/5.webp"],
      technologies: ["Next.Js", "TypeScript", "Strapi", "PostgreSQL", "Tailwind"]
    },
    {
      id: 2,
      title: "Постельное бельё «НЮКТА»",
      description: "Дизайнерский сайт магазина",
      link: "https://нюкта.рф",
      images: ["/img/nukta/1.webp", "/img/nukta/2.webp", "/img/nukta/3.webp"],
      technologies: ["React", "Tailwind", "Node.Js", "Strapi"]
    },
    {
      id: 3,
      title: "Клининг компания «Даймонд»",
      description: "Creative portfolio for artist",
      link: "https://jungebadmoscow.ru",
      images: ["/img/diamond/1.webp", "/img/diamond/2.webp", "/img/diamond/3.webp"],
      technologies: ["React", "Tailwind", "Strapi"]
    },
    {
      id: 4,
      title: "Визитка",
      description: "Сайт-визитка для ведущей мероприятий",
      link: "https://irinasemenova.ru",
      images: ["/img/irina/1.webp", "/img/irina/2.webp", "/img/irina/3.webp"],
      technologies: ["React", "Tailwind"]    
    },
    {
      id: 5,
      title: "JungebadMoscow",
      description: "Сайт о масляно-дисперсионных ваннах и восстановлении теплового баланса",
      link: "https://jungebadmoscow.ru/",
      images: ["/img/jungebad/1.webp", "/img/jungebad/2.webp", "/img/jungebad/3.webp", "/img/jungebad/4.webp", "/img/jungebad/5.webp"],
      technologies: ["React", "Tailwind", "Node.Js"]
    },
    
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
          <h1 className="text-2xl font-bold text-card-foreground uppercase tracking-wider">Projects</h1>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="bg-card border-2 border-card-border p-6 shadow-xl">
              <div className="space-y-4">
                <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm md:text-base text-card-foreground uppercase relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-card-border after:origin-bottom-right after:transition-transform after:duration-700 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {project.title}
              </a>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                
                {/* Image Carousel */}
                <Carousel className="w-full">
                  <CarouselContent>
                    {project.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-video bg-muted rounded flex items-center justify-center overflow-hidden">
                          <img 
                            src={image} 
                            alt={`Project ${project.title} Image ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute w-full h-full bg-black/30"></div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>

                {/* Technologies */}
                <div className="space-y-2">
                  <h4 className="text-xs text-card-foreground font-medium uppercase tracking-wider">Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs uppercase tracking-wider border border-card-border rounded"
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

export default Projects;