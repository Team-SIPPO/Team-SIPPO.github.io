import { activitiesBySlug } from './activities';

// ヒーロー上の荷札タグの配置(タグの文言・リンク先は activities.js が正)
const placements = [
  {
    slug: 'cafe-wa-create',
    className: 'left-[2%] top-[37%] w-[260px] sm:left-[5%] sm:w-[288px]',
    lineClassName: 'left-[23%] top-[47%] w-[180px] rotate-0 sm:w-[210px]',
  },
  {
    slug: 'co-creation',
    className: 'left-[1%] top-[64%] w-[240px] sm:left-[1%] sm:w-[288px]',
    lineClassName: 'left-[26%] top-[74%] w-[130px] -rotate-[58deg] sm:w-[150px]',
  },
  {
    slug: 'play',
    className: 'right-[4%] top-[20%] w-[245px] sm:right-[6%] sm:w-[288px]',
    lineClassName: 'left-[56%] top-[18%] w-[145px] rotate-[8deg] sm:w-[170px]',
  },
  {
    slug: 'it-iot-lesson',
    className: 'right-[0%] top-[47%] w-[255px] sm:right-[1%] sm:w-[288px]',
    lineClassName: 'left-[63%] top-[58%] w-[130px] -rotate-[24deg] sm:w-[155px]',
  },
];

export const homeActivities = placements.map(({ slug, ...placement }) => {
  const activity = activitiesBySlug[slug];
  return { label: activity.title, to: activity.to, ...placement };
});
