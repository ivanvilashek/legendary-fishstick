import { Typography, Space, FloatButton, List } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useAppSelector } from 'shared/hook';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { Transaction } from 'core/store/slices/transactionSlice';
import { CategoryIcon } from 'components/CategoryIcon';
import useActions from 'shared/hook/useActions';

const { Title } = Typography;

export const Home = () => {
  const { transactions, user } = useAppSelector((state) => state);

  const { deleteTransaction, openModal } = useActions();

  const sortedTransactions = [...transactions].sort(
    (a, b) => b.data.date - a.data.date
  );

  const addTransaction = () => openModal(null);

  const onUpdate = (transaction: Transaction) => openModal(transaction);

  const onDelete = (id: string) => deleteTransaction(id);

  return (
    <Space align="center" direction="vertical">
      <Title level={1}>Home page</Title>
      <Title level={2}>{user.displayName}</Title>
      {/* <h2>
        {transactions.reduce((acc, item) => (acc += item.data.amount), 0)}
      </h2> */}
      <List
        bordered
        style={{ width: 300, background: '#fff' }}
        header="Last transactions"
      >
        <VirtualList
          data={sortedTransactions}
          itemKey="id"
          height={400}
          itemHeight={47}
        >
          {(item) => (
            <List.Item
              key={item.id}
              actions={[
                <DeleteOutlined
                  onClick={() => {
                    onDelete(item.id);
                  }}
                />,
                <PlusOutlined onClick={() => onUpdate(item)} />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <CategoryIcon
                    type={item.data.type}
                    category={item.data.category}
                  />
                }
                title={item.data.category}
              />
              <div>{item.data.amount} ₴</div>
            </List.Item>
          )}
        </VirtualList>
      </List>

      <FloatButton
        onClick={addTransaction}
        type="primary"
        icon={<PlusOutlined />}
      />
    </Space>
  );
};
