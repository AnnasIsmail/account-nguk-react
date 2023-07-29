// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfigAdmin = [
  {
    title: 'Add New Access',
    path: '/account/addAccess',
    icon: getIcon('ic:baseline-person-add-alt-1'),
  },
  {
    title: 'User Management',
    path: '/dashboard/user-management',
    icon: getIcon('fa6-solid:user-gear'),
  },
  {
    title: 'Logs',
    path: '/dashboard/logs',
    icon: getIcon('fluent:arrow-repeat-all-20-filled'),
  },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: getIcon('eva:file-text-fill'),
  // }
];

export default navConfigAdmin;
