import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Segmented,
  Select,
  Avatar,
  List,
  InputNumber,
} from 'antd';
import { CalendarOutlined, FormOutlined } from '@ant-design/icons';
import { segmentedOptions, categories } from './constants';
import { SegmentedValue } from 'antd/es/segmented';
import { useAppDispatch, useAppSelector } from 'shared/hook';
import {
  StateValue,
  addTransaction,
  updateTransaction,
} from 'core/store/slices/transactionSlice';
import styles from './TransactionModal.module.scss';
import { TRANSACTION_ACTIONS } from 'core/constants';
import { closeModal } from 'core/store/slices/UISlice';
import { CategoryIcon } from 'components/CategoryIcon';

interface PropsType {
  transaction: StateValue | null;
  action: number | null;
}

export const TransactionModal = (props: PropsType) => {
  const isAdd = props.action === TRANSACTION_ACTIONS.add;
  const isEdit = props.action === TRANSACTION_ACTIONS.edit;

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const [transactionType, setTransactionType] =
    useState<SegmentedValue>('expense');

  const [form] = Form.useForm();
  const transaction = Form.useWatch([], form);
  const category = Form.useWatch('category', form);

  const onTransactionTypeChange = (value: SegmentedValue) => {
    form.setFieldValue('category', categories[value][0].value);
    setTransactionType(value);
  };

  const onOk = () => {
    if (isAdd)
      dispatch(
        addTransaction({
          ...transaction,
          date: dayjs(transaction?.date).valueOf(),
          uid: user.id,
        })
      );

    if (isEdit) {
      if (!props.transaction) return;
      dispatch(
        updateTransaction({
          id: props.transaction.id,
          data: {
            ...transaction,
            date: dayjs(transaction?.date).valueOf(),
            uid: user.id,
          },
        })
      );
    }

    closeDialog();
  };

  const closeDialog = () => {
    dispatch(closeModal());
    form.resetFields();
  };

  useEffect(() => {
    if (props.transaction)
      form.setFieldsValue({
        ...props.transaction.data,
        date: dayjs(props.transaction.data.date),
      });
  }, [props.transaction, form]);

  return (
    <Modal
      open={isAdd || isEdit}
      onOk={onOk}
      onCancel={closeDialog}
      width={350}
      closable={false}
    >
      <Form
        form={form}
        initialValues={{
          amount: null,
          type: 'expense',
          category: categories[transactionType][0].value,
          date: dayjs(),
          description: null,
        }}
      >
        <Form.Item name="type" noStyle>
          <Segmented
            value={transactionType}
            onChange={onTransactionTypeChange}
            block
            options={segmentedOptions}
          />
        </Form.Item>
        <List className={styles.list}>
          <List.Item>
            <List.Item.Meta
              className={styles.meta}
              avatar={
                <Avatar
                  size={35}
                  style={{ background: transaction?.amount && '#1677FF' }}
                >
                  ₴
                </Avatar>
              }
              description={
                <Form.Item name="amount" noStyle>
                  <InputNumber
                    size="small"
                    bordered={false}
                    placeholder="Enter the amount"
                    type="number"
                  />
                </Form.Item>
              }
            />
          </List.Item>

          <List.Item>
            <List.Item.Meta
              className={styles.meta}
              avatar={
                <CategoryIcon
                  type={transactionType as string}
                  category={category}
                />
              }
              title={`${transactionType === 'income' ? 'From' : 'To'} category`}
              description={
                <Form.Item noStyle name="category">
                  <Select
                    bordered={false}
                    size="small"
                    options={categories[transactionType]}
                  />
                </Form.Item>
              }
            />
          </List.Item>

          <List.Item>
            <List.Item.Meta
              className={styles.meta}
              avatar={
                <Avatar
                  size={35}
                  icon={<CalendarOutlined />}
                  style={{ background: transaction?.date && '#1677FF' }}
                />
              }
              description={
                <Form.Item noStyle name="date">
                  <DatePicker
                    format={'D MMM, YYYY'}
                    allowClear={false}
                    bordered={false}
                    suffixIcon={false}
                  />
                </Form.Item>
              }
            />
          </List.Item>

          <List.Item>
            <List.Item.Meta
              className={styles.meta}
              avatar={
                <Avatar
                  size={35}
                  icon={<FormOutlined />}
                  style={{ background: transaction?.description && '#1677FF' }}
                />
              }
              description={
                <Form.Item noStyle name="description">
                  <Input.TextArea
                    placeholder="Enter the description"
                    autoSize
                    bordered={false}
                  />
                </Form.Item>
              }
            />
          </List.Item>
        </List>
      </Form>
    </Modal>
  );
};
