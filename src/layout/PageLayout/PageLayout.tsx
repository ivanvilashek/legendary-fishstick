import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { SideBar, NavBar, TopicMenu } from '../../components';
import styles from './PageLayout.module.scss';
import { useResponsive } from '../../hook';

const { Content } = Layout;

export const PageLayout = () => {
  const { isTablet } = useResponsive();
  return (
    <Layout className={styles.pageLayout}>
      {isTablet ? (
        <SideBar>
          <TopicMenu />
        </SideBar>
      ) : (
        <NavBar>
          <TopicMenu />
        </NavBar>
      )}

      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};
