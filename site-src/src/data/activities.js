// サイト内の4活動の正データ。
// ホームのActivitiesカード・ナビゲーション・ヒーローの荷札タグはここを参照する。
// (各活動ページの中身は activityPages.js)
export const activities = [
  {
    slug: 'play',
    title: 'play',
    description: '全力で遊び、楽しみ、語り、創る場',
    icon: 'bulb',
    to: '/activities/play',
  },
  {
    slug: 'co-creation',
    title: 'co-creation',
    description: '共に創る、一緒に考える活動',
    icon: 'wrench',
    to: '/activities/co-creation',
  },
  {
    slug: 'it-iot-lesson',
    title: 'IT/IoT lesson',
    description: '基礎から応用まで、学べるIoT教室',
    icon: 'laptop',
    to: '/activities/it-iot-lesson',
  },
  {
    slug: 'cafe-wa-create',
    title: 'Cafe Wa-create',
    description: 'コーヒーを片手に、遊ぶように創るサークル活動',
    icon: 'cup',
    to: '/activities/cafe-wa-create',
  },
];

export const activitiesBySlug = Object.fromEntries(
  activities.map((activity) => [activity.slug, activity]),
);
