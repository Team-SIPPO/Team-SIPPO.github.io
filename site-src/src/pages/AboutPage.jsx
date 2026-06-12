import { PageIntro } from '../components/molecules/PageIntro';
import { AboutCopySection } from '../components/organisms/AboutCopySection';

const aboutCopyGroups = [
  ['しっぽにちは。 Team-S!PPOです。'],
  ['笑顔のために技術を創りたい。', '私たちはそんな想いで集った技術者・研究者のチームです。'],
  [
    '効率や便利を追い求めるのではなく、人が現実を密度濃く感じて暮らすことができるような技術。',
    'そんな技術を創っています。',
  ],
  [
    '私たちの強みは、AIやIoTやデザイン。',
    'それらを駆使して、新しい体験を創り、自ら楽しみ、笑顔を咲かせたい。',
  ],
  [
    '本サイトでは活動の紹介をします。',
    '　- サークル活動『Team-S!PPO』',
    '　- IT/IoT相談所',
    '　- IT/IoT教室（準備中）',
    '　- IoTカフェ（オープン準備中）',
  ],
  ['面白そうだと思った方は是非遊びに来てください。'],
];

export function AboutPage() {
  return (
    <main className="page-main">
      <PageIntro
        title="About us"
        lead={['technologies for your smile', '-技術であなたを笑顔に-']}
        image="top-image.png"
        align="center"
      />
      <AboutCopySection groups={aboutCopyGroups} />
    </main>
  );
}
