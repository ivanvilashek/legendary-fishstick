import { Menu } from 'antd';
import { menuItems } from './constants';
import styles from './TopicMenu.module.scss';

export const TopicMenu = () => {
  return (
    <Menu
      className={styles.Menu}
      style={{ border: 'none' }}
      defaultSelectedKeys={['1']}
      items={menuItems}
    />
  );
};
