import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import ManageData from './layouts/dashboard/ManageData';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import AddAccess from './pages/AddAccess';
//
import Logout from './Logout';
import Blog from './pages/Blog';
import DashboardApp from './pages/DashboardApp';
import EditAccount from './pages/EditAccount';
import Login from './pages/Login';
import NewAccount from './pages/NewAccount';
import NotFound from './pages/Page404';
import Products from './pages/Products';
import Register from './pages/Register';
import Skins from './pages/Skins';
import TrackAccount from './pages/TrackAccount';
import User from './pages/User';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'all-account', element: <DashboardApp /> },
        { path: 'agents', element: <Products /> },
        { path: 'skins', element: <Skins /> },
        { path: 'logs', element: <User /> },
        { path: 'logout', element: <Logout /> },
        
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/all-account" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    {
      path: '/account',
      element: <ManageData />,
      children: [
        { path: 'create', element: <NewAccount /> },
        { path: 'edit/:slug', element: <EditAccount /> },
        { path: 'track', element: <TrackAccount /> },
        { path: 'addAccess', element: <AddAccess /> },
      ],
    },

  ]);
}
