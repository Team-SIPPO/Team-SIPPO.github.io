export const navigation = [
  { label: "What's new", to: '/news' },
  {
    label: 'About us',
    to: '/about-us',
    children: [
      { label: 'About us', to: '/about-us' },
      { label: 'Members', to: '/members' },
    ],
  },
  {
    label: 'Activities',
    to: '/activities/play',
    children: [
      { label: 'play', to: '/activities/play' },
      { label: 'co-creation', to: '/activities/co-creation' },
      { label: 'IT/IoT lesson', to: '/activities/it-iot-lesson' },
      { label: 'Cafe Wa-create', to: '/activities/cafe-wa-create' },
    ],
  },
  { label: 'Contact us', to: '/contactus' },
];
