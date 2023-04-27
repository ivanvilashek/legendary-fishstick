import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './Loading.module.scss';

const LoadingIcon = () => (
  <LoadingOutlined style={{ fontSize: 48, fontWeight: 500 }} spin />
);

export const Loading = () => (
  <div className={styles.loadingWrapper}>
    <Spin
      className={styles.spinIndicator}
      indicator={<LoadingIcon />}
      tip="Loading..."
    />
  </div>
);
