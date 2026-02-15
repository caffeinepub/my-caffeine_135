import { content } from '@/content/hi';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, Heart } from 'lucide-react';

export function WelcomeMissionSection() {
  return (
    <section id="welcome" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Welcome Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
              {content.welcome}
            </h2>
          </div>

          {/* Quote Card */}
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-foreground leading-relaxed whitespace-pre-line">
                "{content.quote}"
              </blockquote>
            </CardContent>
          </Card>

          {/* Mission Section */}
          <div id="mission" className="space-y-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-foreground">
              हमारा मिशन
            </h3>
            
            <Card className="bg-accent/50 border-accent">
              <CardContent className="p-8 md:p-10">
                <p className="text-lg sm:text-xl text-foreground leading-relaxed whitespace-pre-line text-center">
                  {content.mission}
                </p>
              </CardContent>
            </Card>

            {/* Mission Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg">सामुदायिक सहायता</h4>
                  <p className="text-sm text-muted-foreground">
                    हर व्यक्ति को समर्थन और मार्गदर्शन
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg">कानूनी सहायता</h4>
                  <p className="text-sm text-muted-foreground">
                    कानून के दायरे में न्याय के लिए
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg">मानवीय दृष्टिकोण</h4>
                  <p className="text-sm text-muted-foreground">
                    सहानुभूति और समझ के साथ
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
