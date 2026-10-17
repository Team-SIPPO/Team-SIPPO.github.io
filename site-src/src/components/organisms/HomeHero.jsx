import { homeActivities } from '../../data/homeActivities';
import { ActivityTag } from '../molecules/ActivityTag';
import { HeroMotion } from '../molecules/HeroMotion';

export function HomeHero() {
  return (
    <section className="mx-auto max-w-container-wide px-page-x pt-[72px] sm:pt-[100px]">
      <h1 className="text-center text-[22px] font-normal leading-tight text-ink sm:text-[34px]">
        Let&apos;s take a little coffee break.
      </h1>

      <div className="hero-stage mx-auto mt-7">
        <HeroMotion className="hero-person pointer-events-none absolute left-1/2 top-[82px] w-[530px] -translate-x-1/2 select-none sm:w-[620px]" />

        {homeActivities.map((item) => (
          <ActivityTag key={item.label} item={item} />
        ))}
      </div>
    </section>
  );
}
