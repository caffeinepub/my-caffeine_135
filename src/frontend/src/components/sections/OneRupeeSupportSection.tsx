import { content } from '@/content/hi';
import { Card, CardContent } from '@/components/ui/card';
import { Coins } from 'lucide-react';

export function OneRupeeSupportSection() {
  return (
    <section id="one-rupee-support" className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Coins className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
              {content.oneRupeeSupport.title}
            </h2>
          </div>

          {/* Content Card */}
          <Card className="border-2 border-primary/20 shadow-lg bg-background">
            <CardContent className="p-8 md:p-12">
              <div className="text-lg sm:text-xl md:text-2xl text-foreground leading-relaxed whitespace-pre-line text-center">
                {content.oneRupeeSupport.body}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
