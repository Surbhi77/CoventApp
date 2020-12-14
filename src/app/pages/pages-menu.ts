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
  },
  {
    title:"Add Hospitals Item",
    icon: 'lock-outline',
    link: '/pages/hospital-need-item-form'
  },
  {
    title:"Hospitals Item List",
    icon: 'lock-outline',
    link: '/pages/hospital-item-list'
  }
];

export const REVIEWER_ITEMS: NbMenuItem[]=[
  {
    title: 'Dashboard',
    icon: 'home',
    link: '/pages/review-list',
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
    link: '/pages/review-list',
  },
  {
    title: 'Change Password',
    icon: 'edit-2-outline',
    link: '/pages/change-password',
  },

];