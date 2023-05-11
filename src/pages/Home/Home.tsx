import { useState } from 'react';
import { Typography, Space, FloatButton, List, Avatar, App } from 'antd';
import VirtualList from 'rc-virtual-list';
import { TransactionModal } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hook';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { categories } from '../../components/TransactionModal/constants';
import {
  StateValue,
  deleteTransaction,
} from '../../store/slices/transactionSlice';
import { TRANSACTION_ACTIONS } from '../../constants';

const { Title } = Typography;

export const Home = () => {
  const [action, setAction] = useState<number>();
  const [updateTransaction, setUpdateTransaction] = useState<StateValue | null>(
    null
  );

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const transactions = useAppSelector((state) => state.transactions);

  const sortedTransactions = [...transactions].sort(
    (a, b) => b.data.date - a.data.date
  );

  const addTransaction = () => setAction(TRANSACTION_ACTIONS.add);

  const onTransactionModalClose = () => {
    setAction(TRANSACTION_ACTIONS.none);
    if (updateTransaction) setUpdateTransaction(null);
  };

  const onUpdate = (transaction: StateValue) => {
    setUpdateTransaction(transaction);
    setAction(TRANSACTION_ACTIONS.edit);
  };

  const onDelete = (id: string) => {
    dispatch(deleteTransaction(id));
  };

  const getCategoryIcon = (item: StateValue) => {
    const selected = categories[item.data.type].find(
      (category: { value: string }) => category.value === item.data.category
    );
    return (
      <Avatar
        size={35}
        icon={selected?.icon}
        style={{ background: selected?.color }}
      />
    );
  };

  return (
    <Space align="center" direction="vertical">
      <Title level={1}>Home page</Title>
      <Title level={2}>{user.displayName}</Title>
      <h2>
        {transactions.reduce((acc, item) => (acc += item.data.amount), 0)}
      </h2>
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
                avatar={getCategoryIcon(item)}
                title={item.data.category}
              />
              <div>{item.data.amount} ₴</div>
            </List.Item>
          )}
        </VirtualList>
      </List>

      <TransactionModal
        action={action}
        transaction={updateTransaction}
        onClose={onTransactionModalClose}
      />
      <FloatButton
        onClick={addTransaction}
        type="primary"
        icon={<PlusOutlined />}
      />
    </Space>
  );
};
