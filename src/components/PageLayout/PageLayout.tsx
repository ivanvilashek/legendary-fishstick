import { Outlet, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  AreaChartOutlined,
  RiseOutlined,
  SettingOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { ROUTES } from '../../constants';
import './PageLayout.css';
import { getAuth, signOut } from 'firebase/auth';

const { Sider, Content } = Layout;

export const PageLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const auth = getAuth();

  const logoutHandler = () => {
    signOut(auth).catch(console.error);
  };

  return (
    <Layout style={{ height: '100vh', background: 'none' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
        }}
      >
        <Menu
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
      </Sider>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '30px 20px',
          padding: 30,
          minHeight: 282,
          background: '#fff',
          borderRadius: 25,
          boxShadow:
            'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};
