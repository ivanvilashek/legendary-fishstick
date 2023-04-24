import {
  UserOutlined,
  AreaChartOutlined,
  RiseOutlined,
  SettingOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import { ROUTES } from '../../constants';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import styles from './TopicMenu.module.scss';

export const TopicMenu = () => {
  const auth = getAuth();

  const logoutHandler = () => {
    signOut(auth).catch(console.error);
  };
  return (
    <Menu
      className={styles.Menu}
      style={{ border: 'none' }}
      defaultSelectedKeys={['1']}
      items={[
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
          onClick: logoutHandler,
        },
      ]}
    />
  );
};
