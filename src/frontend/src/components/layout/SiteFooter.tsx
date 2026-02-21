import { Heart } from 'lucide-react';
import { content } from '@/content/hi';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'jan-kalyan-ekta-sangathan'
  );

  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Organization Info */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-primary">
              {content.organizationNameEnglish}
            </h3>
            <p className="text-lg font-semibold text-foreground">
              {content.organizationName}
            </p>
            <p className="text-sm text-muted-foreground italic">
              {content.tagline}
            </p>
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-border" />

          {/* Attribution */}
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <p>© {currentYear} {content.organizationNameEnglish}. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Built with <Heart className="h-4 w-4 text-primary fill-primary" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
