import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home',
    link: '/pages/dashboard',
    home: true,
  },
  // {
  //   title: 'Edit Profile',
  //   icon: 'edit-2-outline',
  //   link: '/pages/forms/inputs',
  // },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: 'Master Settings',
    icon: 'layout-outline',
    children: [
      {
        title: 'CMS',
        link: '/pages/cms',
      },
      {
        title: 'Map Setting',
        link: '/pages/map-setting',
      },
      {
        title: 'Slider Management',
        link: '/pages/slider-management',
      },
      {
        title: 'Other Settings',
        link: '/pages/layout/infinite-list',
      },
      {
        title: 'Characteristics',
        link: '/pages/characteristic-listing'
      },
      {
        title:'Compliance',
        link: '/pages/compliance-listing'  
      }
    ],
  },
  {
    title: 'Device Management',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Device Listing',
        link: '/pages/device-innovators-listing',
      }
    ],
  },
  {
    title:'Device Innovator Listing',
    icon: 'keypad-outline',
    link: '/pages/website-user-listing'
  },
  {
    title:'Hospitals Listing',
    icon: 'keypad-outline',
    link: '/pages/hospitals-users'
  },
  {
    title:'Hospital & ICU Needs Listing',
    icon: 'keypad-outline',
    link: '/pages/hospitals-list'
  },
  {
    title:'ICU Needs Listing',
    icon: 'keypad-outline',
    link: '/pages/icu-need-List'
  },
  {
    title: 'Reviewer Listing',
    icon: 'keypad-outline',
    link: '/pages/reviewer-user-listing'
  },
  ];
