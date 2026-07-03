import { HomeHero } from '../components/organisms/HomeHero';
import { HomeAboutSection } from '../components/organisms/HomeAboutSection';
import { HomeNewsSection } from '../components/organisms/HomeNewsSection';
import { HomeActivitiesSection } from '../components/organisms/HomeActivitiesSection';
import { HomeContactSection } from '../components/organisms/HomeContactSection';

export function HomePage() {
  return (
    <main className="flex-1">
      <HomeHero />
      <HomeAboutSection />
      <HomeNewsSection />
      <HomeActivitiesSection />
      <HomeContactSection />
    </main>
  );
}
