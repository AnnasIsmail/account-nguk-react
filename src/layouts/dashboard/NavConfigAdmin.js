// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfigAdmin = [
  {
    title: 'Manage Account',
    path: '/dashboard/manage-account',
    icon: getIcon('mdi:account-cog'),
  },
  {
    title: 'Logs',
    path: '/dashboard/logs',
    icon: getIcon('fluent:phone-span-in-28-filled'),
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // }
];

export default navConfigAdmin;
