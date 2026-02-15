import { SiteHeader } from './components/layout/SiteHeader';
import { SiteFooter } from './components/layout/SiteFooter';
import { HeroSection } from './components/sections/HeroSection';
import { WelcomeMissionSection } from './components/sections/WelcomeMissionSection';
import { GoalSection } from './components/sections/GoalSection';
import { OneRupeeSupportSection } from './components/sections/OneRupeeSupportSection';
import { ValuesSection } from './components/sections/ValuesSection';
import { MemberRegistrationSection } from './components/sections/MemberRegistrationSection';
import { ContactSection } from './components/sections/ContactSection';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <WelcomeMissionSection />
        <GoalSection />
        <OneRupeeSupportSection />
        <ValuesSection />
        <MemberRegistrationSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
}

export default App;
