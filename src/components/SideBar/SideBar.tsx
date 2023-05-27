import { Layout } from 'antd';
import logo from 'shared/assets/icons/logo.svg';
import styles from './SideBar.module.scss';

export const SideBar = ({ children }: React.PropsWithChildren) => {
  return (
    <Layout.Sider className={styles.sideBar} theme="light">
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <span>MoneyTrack</span>
      </div>
      {children}
    </Layout.Sider>
  );
};
