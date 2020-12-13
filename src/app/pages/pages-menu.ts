import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Edit Profile',
    icon: 'edit-2-outline',
    link: '/pages/forms/inputs',
  },
  {
    title: 'Add Device Innovation',
    icon: 'edit-2-outline',
    link: '/pages/device-listing'
  },
  {
    title: 'Device Listing',
    icon: 'edit-2-outline',
    link: '/pages/data-listing',
  },
  {
    title:"Change Password",
    icon: 'lock-outline',
    link: '/pages/change-password'
  }
];

export const REVIEWER_ITEMS: NbMenuItem[]=[
  {
    title: 'Dashboard',
    icon: 'home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Edit Profile',
    icon: 'edit-2-outline',
    link: '/pages/forms/inputs',
  },
  {
    title: 'Review Listing',
    icon: 'edit-2-outline',
    link: '/pages/forms/inputs',
  },
  {
    title: 'Change Password',
    icon: 'edit-2-outline',
    link: '/pages/forms/inputs',
  },

];