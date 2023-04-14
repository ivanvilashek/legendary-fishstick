import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 48, fontWeight: 500 }} spin />
);

export const Loading = () => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Spin
      indicator={loadingIcon}
      style={{ color: '#fff', fontSize: 20 }}
      tip="Loading..."
    />
  </div>
);
