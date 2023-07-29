// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'All Account',
    path: '/dashboard/all-account',
    icon: getIcon('material-symbols:switch-account-rounded'),
  },
  {
    title: 'Crosshair',
    path: '/dashboard/crosshair',
    icon: getIcon('ph:crosshair-bold'),
  },
  {
    title: 'Track Account',
    path: '/account/track',
    icon: getIcon('ic:outline-track-changes'),
  },
  {
    title: 'Update Valorant',
    path: '/dashboard/update-valorant',
    icon: getIcon('ic:outline-update'),
  },
  {
    title: 'Esports Schedule',
    path: '/dashboard/esport-schedule',
    icon: getIcon('material-symbols:auto-schedule'),
  },
  {
    title: 'Agents',
    path: '/dashboard/agents',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Skins',
    path: '/dashboard/skins',
    icon: getIcon('mdi:pistol'),
  },
  {
    title: 'Log Out',
    path: '/dashboard/logout',
    icon: getIcon('humbleicons:logout'),
  },

  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // }
];

export default navConfig;
