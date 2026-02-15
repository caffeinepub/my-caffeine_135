import { content } from '@/content/hi';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  const scrollToWelcome = () => {
    const element = document.getElementById('welcome');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-bg.dim_1600x900.png"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary leading-tight">
              {content.organizationName}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
              {content.tagline}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
              {content.quote}
            </p>
          </div>

          <Button
            size="lg"
            onClick={scrollToWelcome}
            className="mt-8 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            और जानें
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
