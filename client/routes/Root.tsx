import React from 'react';
import { json, Outlet, useNavigate } from 'react-router-dom';
import Navigation, { DrawerItem } from '../components/Navigation/Navigation';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

export interface AuthorizationStatus {
  status: number;
  statusText: string;
}

const Root = () => {
  const navigate = useNavigate();

  const drawerItems: DrawerItem[] = React.useMemo(
    () => [
      {
        text: 'New Trip',
        icon: <AddCircleOutlineIcon />,
        onClick: () => navigate('trip/new'),
      },
      {
        text: 'My Trips',
        icon: <CardTravelIcon />,
        onClick: () => navigate('/'),
      },
      {
        text: 'My Profile',
        icon: <AccountBoxIcon />,
        onClick: () => navigate('profile'),
      },

      {
        text: 'Logout',
        icon: <LogoutIcon />,
        onClick: async () => {
          await fetch('/auth/signout');
          navigate('/signin');
        },
      },
    ],
    [navigate]
  );
  return (
    <Navigation drawerItems={drawerItems}>
      <Outlet />
    </Navigation>
  );
};

export default Root;
