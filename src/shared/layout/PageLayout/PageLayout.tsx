import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { SideBar, NavBar, TopicMenu, TransactionModal } from 'components';
import styles from './PageLayout.module.scss';
import { useResponsive, useAppSelector } from 'shared/hook';

const { Content } = Layout;

export const PageLayout = () => {
  const { action, transaction } = useAppSelector((state) => state.UI.modal);
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
        <TransactionModal action={action} transaction={transaction} />
      </Content>
    </Layout>
  );
};
