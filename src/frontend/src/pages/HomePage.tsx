import React, { Suspense } from 'react';
import { SiteHeader } from '../components/layout/SiteHeader';
import { SiteFooter } from '../components/layout/SiteFooter';
import { HeroSection } from '../components/sections/HeroSection';
import { WelcomeMissionSection } from '../components/sections/WelcomeMissionSection';
import { GoalSection } from '../components/sections/GoalSection';
import { OneRupeeSupportSection } from '../components/sections/OneRupeeSupportSection';
import { ValuesSection } from '../components/sections/ValuesSection';
import { MemberRegistrationSection } from '../components/sections/MemberRegistrationSection';
import { ContactSection } from '../components/sections/ContactSection';
import { Skeleton } from '@/components/ui/skeleton';

// Loading fallback component
function SectionLoader() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <WelcomeMissionSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <GoalSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <OneRupeeSupportSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ValuesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <MemberRegistrationSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
