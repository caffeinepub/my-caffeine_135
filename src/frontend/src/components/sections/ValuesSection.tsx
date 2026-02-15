import { content } from '@/content/hi';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export function ValuesSection() {
  return (
    <section id="values" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              हमारे मूल्य
            </h2>
          </div>

          <Card className="border-2 border-primary/20 shadow-xl bg-accent/30">
            <CardContent className="p-10 md:p-12">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-primary leading-relaxed">
                {content.values}
              </p>
            </CardContent>
          </Card>

          {/* Values Icons */}
          <div className="flex justify-center">
            <img
              src="/assets/generated/values-icons-set.dim_1024x256.png"
              alt="मूल्य चिह्न - एकता, पारदर्शिता, मानवता, न्याय"
              className="max-w-full h-auto"
            />
          </div>

          {/* Individual Values */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.valuesArray.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg hover:border-primary/50 transition-all"
              >
                <CardContent className="p-6 space-y-3">
                  <div className="text-4xl font-bold text-primary">
                    {index + 1}
                  </div>
                  <h4 className="font-bold text-xl text-foreground">
                    {value.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {value.nameEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <p className="text-lg text-foreground leading-relaxed">
                ये चार स्तंभ हमारे संगठन की नींव हैं। हम इन मूल्यों के साथ समाज में सकारात्मक बदलाव लाने के लिए प्रतिबद्ध हैं।
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
