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
    title: 'Members',
    path: '/dashboard/products',
    icon: getIcon('eva:people-fill'),
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // }
];

export default navConfig;
