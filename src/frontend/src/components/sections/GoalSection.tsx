import { content } from '@/content/hi';
import { Card, CardContent } from '@/components/ui/card';
import { Target, TrendingUp } from 'lucide-react';

export function GoalSection() {
  return (
    <section id="goal" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Target className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              हमारा लक्ष्य
            </h2>
          </div>

          <Card className="border-2 border-primary shadow-xl bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-10 md:p-16">
              <div className="text-center space-y-6">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                  {content.goal}
                </p>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-6 w-6" />
                  <p className="text-lg">
                    एक मजबूत और एकजुट समुदाय का निर्माण
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-3">
                <h4 className="font-bold text-lg text-primary">ईमानदारी</h4>
                <p className="text-muted-foreground">
                  हम ईमानदार और समर्पित साथियों की तलाश में हैं जो समाज की सेवा करना चाहते हैं।
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-3">
                <h4 className="font-bold text-lg text-primary">एकता</h4>
                <p className="text-muted-foreground">
                  साथ मिलकर हम एक बेहतर और न्यायपूर्ण समाज का निर्माण कर सकते हैं।
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
