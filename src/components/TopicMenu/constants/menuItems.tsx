import {
  UserOutlined,
  AreaChartOutlined,
  RiseOutlined,
  SettingOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import { ROUTES } from 'core/constants';
import { Link } from 'react-router-dom';

export const menuItems = [
  {
    key: 1,
    icon: <UserOutlined />,
    label: <Link to={ROUTES.HOME}>Home</Link>,
  },
  {
    key: 2,
    icon: <AreaChartOutlined />,
    label: <Link to={ROUTES.DASHBOARD}>Dashboard</Link>,
  },
  {
    key: 3,
    icon: <RiseOutlined />,
    label: <Link to={ROUTES.CURRENCY}>Currency</Link>,
  },
  {
    key: 4,
    icon: <SettingOutlined />,
    label: <Link to={ROUTES.SETTINGS}>Settings</Link>,
  },
  {
    key: 5,
    icon: <UserDeleteOutlined />,
    label: 'Sign Out',
    danger: true,
  },
];
