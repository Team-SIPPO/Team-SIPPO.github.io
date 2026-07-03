import { activities } from './activities';

export const navigation = [
  { label: "What's new", to: '/news' },
  {
    label: 'About us',
    to: '/#about-us',
    children: [
      { label: 'About us', to: '/#about-us' },
      { label: 'Members', to: '/members' },
    ],
  },
  {
    label: 'Activities',
    to: activities[0].to,
    children: activities.map((activity) => ({ label: activity.title, to: activity.to })),
  },
  { label: 'Contact us', to: '/contactus' },
];
