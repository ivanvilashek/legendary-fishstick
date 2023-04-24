import { useState } from 'react';
import { Drawer, Button, Layout } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import logo from '../../logo.svg';
import styles from './NavBar.module.scss';

export const NavBar = ({ children }: React.PropsWithChildren) => {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <Layout.Header className={styles.navBar}>
      <Button
        size="large"
        shape="round"
        className={styles.button}
        type="primary"
        icon={<MenuOutlined />}
        onClick={openDrawer}
      />
      <Drawer
        bodyStyle={{ padding: 0 }}
        closable={false}
        width={200}
        onClose={onClose}
        open={open}
      >
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={logo} alt="Logo" />
          <span>MoneyTrack</span>
        </div>

        {children}
      </Drawer>
    </Layout.Header>
  );
};
