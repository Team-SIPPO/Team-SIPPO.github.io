export const activityPages = {
  play: {
    title: 'Play',
    leadGroups: [
      [
        'しっぽにちは。',
        '『Team-S!PPO』です。',
        '笑顔のための技術を創る活動をしています。',
        '全力で遊び、楽しみ、語り、創る場です。',
      ],
    ],
    items: [
      {
        year: '2019',
        title: 'プロトタイプアプリCHEEEEZ',
        image: 'activity-cheeeez.png',
        href: 'https://team-sippo.github.io/cheeeez.html',
      },
      {
        year: '2019',
        title: '自転車用アプリcYclip',
        image: 'activity-cyclip.png',
        href: 'https://play.google.com/store/apps/details?id=com.laboratory.kna.cyclip&hl=ja',
      },
      {
        year: '2020',
        title: 'ZEN展にフライアブル出展',
        image: 'activity-zen.jpg',
        href: 'https://zenten.info/?page_id=4774',
      },
      {
        year: '2019',
        title: 'TSG2019セミファイナル進出',
        image: 'activity-flyable.jpg',
        href: 'https://tokyo-startup.jp/2019/qualifiers2019/',
      },
    ],
  },
  coCreation: {
    title: 'co-creation',
    leadGroups: [
      [
        'IT、IoT、AI、ロボット、3Dモデリングなど',
        '専門性を持つTeam-S!PPO メンバーが',
        'プロトタイプを作成。',
      ],
      ['「課題や悩み、実現したいことがあるけど、ITで解決できるのかわからない」'],
      ['そんなもやもやした状態でも大丈夫。', '一緒に考えて作りましょう。'],
    ],
    items: [
      {
        year: '2021',
        title: '家庭用マッサージチェア課金制化IoT『ちょりん君』提供',
        image: 'activity-comingsoon.png',
      },
    ],
  },
  lesson: {
    title: 'IT/IoT lesson',
    leadGroups: [
      ['IT/IoT教室は現在準備中です。'],
      ['プログラミング、電子工作、IoTを', '手を動かしながら学べる形へ整えています。'],
    ],
    items: [
      {
        year: 'Coming soon',
        title: 'IT/IoT lesson 準備中',
        image: 'activity-comingsoon.png',
      },
    ],
  },
  cafe: {
    title: 'Cafe Wa-create',
    // ヒーロー: 座標はイラストの viewBox(1774×887)単位。cx/cy は円の中心、r は半径
    hero: {
      image: 'cafe-hero.svg',
      alt: 'カフェでコーヒーを淹れたり、パソコンを広げたりしてくつろぐ人たちのイラスト',
      width: 1774,
      height: 887,
      focusX: 0.42, // スマホで画面中央に来る横位置(0=左端, 1=右端)
      spots: [
        {
          to: '/calc-waterhardness',
          label: 'ざっくり水硬度計算機',
          cx: 630,
          cy: 378,
          r: 64,
        },
      ],
    },
    leadGroups: [
      ['情報技術を使って', 'もっと気軽にやりたいことをしたい'],
      ['ワクワク作って、ワイワイシェアできる', 'カフェのオープン準備中'],
      ['2027年オープン予定', '（それまでは不定期開催）'],
    ],
  },
};
