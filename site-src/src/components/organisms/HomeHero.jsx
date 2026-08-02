import { homeActivities } from '../../data/homeActivities';
import { IconImage } from '../atoms/IconImage';
import { ActivityTag } from '../molecules/ActivityTag';

export function HomeHero() {
  return (
    <section className="mx-auto max-w-container-wide px-page-x pt-[72px] sm:pt-[100px]">
      <h1 className="text-center text-[22px] font-normal leading-tight text-ink sm:text-[34px]">
        Let&apos;s take a little coffee break.
      </h1>

      <div className="hero-stage mx-auto mt-7">
        <IconImage
          className="hero-person pointer-events-none absolute left-1/2 top-[82px] w-[530px] -translate-x-1/2 select-none sm:w-[620px]"
          name="top-image.png"
          alt="コーヒーを飲みながらアイデアを考える人物"
        />

        {homeActivities.map((item) => (
          <ActivityTag key={item.label} item={item} />
        ))}
      </div>
    </section>
  );
}
