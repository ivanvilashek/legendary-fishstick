import { useState } from 'react';
import { Typography, Space, FloatButton } from 'antd';
import { NewTransaction } from '../../components';
import { useAppSelector } from '../../hook';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector((state) => state.user);

  const modalOpenHandler = () => setIsModalOpen(true);

  return (
    <Space align="center" direction="vertical">
      <Title level={1}>Home page</Title>
      <Title level={2}>{user.displayName}</Title>
      <NewTransaction
        open={isModalOpen}
        setOpen={setIsModalOpen}
        uid={user.id}
      />
      <FloatButton
        onClick={modalOpenHandler}
        type="primary"
        icon={<PlusOutlined />}
      />
    </Space>
  );
};
