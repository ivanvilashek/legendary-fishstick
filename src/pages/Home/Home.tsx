import { Typography, Space, FloatButton, List, Avatar } from 'antd';
import VirtualList from 'rc-virtual-list';
import { useAppDispatch, useAppSelector } from 'shared/hook';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  StateValue,
  deleteTransaction,
} from 'core/store/slices/transactionSlice';
import { TRANSACTION_ACTIONS } from 'core/constants';
import { openModal } from 'core/store/slices/UISlice';
import { CategoryIcon } from 'components/CategoryIcon';

const { Title } = Typography;

export const Home = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const transactions = useAppSelector((state) => state.transactions);

  const sortedTransactions = [...transactions].sort(
    (a, b) => b.data.date - a.data.date
  );

  const addTransaction = () =>
    dispatch(openModal({ action: TRANSACTION_ACTIONS.add }));

  const onUpdate = (transaction: StateValue) =>
    dispatch(openModal({ action: TRANSACTION_ACTIONS.edit, transaction }));

  const onDelete = (id: string) => dispatch(deleteTransaction(id));

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
