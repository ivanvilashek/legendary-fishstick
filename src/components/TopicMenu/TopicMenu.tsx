import { Menu, MenuProps } from 'antd';
import { menuItems } from './constants';
import styles from './TopicMenu.module.scss';
import { useAuth } from 'shared/hook';

export const TopicMenu = () => {
  const { logOut } = useAuth();

  const onClick: MenuProps['onClick'] = (e) => e.key === '5' && logOut();

  return (
    <Menu
      className={styles.Menu}
      style={{ border: 'none' }}
      defaultSelectedKeys={['1']}
      onClick={onClick}
      items={menuItems}
    />
  );
};
