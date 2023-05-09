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
import { useAppDispatch } from '../../hook';
import { addTransaction } from '../../store/slices/transactionSlice';
import styles from './NewTransaction.module.scss';
import { on } from 'events';

interface PropsType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uid: string | null;
}

export const NewTransaction = ({ open, setOpen, uid }: PropsType) => {
  const dispatch = useAppDispatch();

  const [transactionType, setTransactionType] =
    useState<SegmentedValue>('expense');
  const [CategoryIcon, setCategoryIcon] = useState(
    categories[transactionType][0].icon
  );
  const [amount, setAmount] = useState<null | number>(25);

  const [form] = Form.useForm();
  const transaction = Form.useWatch([], form);
  const selectedItem = Form.useWatch('category', form);

  const onTransactionTypeChange = (value: SegmentedValue) => {
    form.setFieldValue('category', categories[value][0].value);
    setTransactionType(value);
  };

  const onAmountChange = (value: null | number) => {
    const reg = new RegExp('/(^([1-9]d*)|0)(.d+)?$/g');
    if (!value) return;
    if (reg.test(value?.toString())) setAmount(value);
  };

  const onCancel = () => setOpen(false);

  const onOk = () => {
    dispatch(
      addTransaction({
        ...transaction,
        date: dayjs(transaction?.date).valueOf(),
        uid,
      })
    );
    form.resetFields();
    setOpen(false);
  };

  useEffect(() => {
    const selected = categories[transactionType].find(
      (item: { value: string }) => item.value === selectedItem
    );
    setCategoryIcon(
      <Avatar
        size={35}
        icon={selected?.icon}
        className={styles.categoryIcon}
        style={{ background: selected?.color }}
      />
    );
  }, [selectedItem, transactionType]);

  return (
    <Modal
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      closable={false}
      width={350}
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
              avatar={CategoryIcon}
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

          {/* <List.Item>
            <List.Item.Meta
              className={styles.meta}
              avatar={<Avatar size={35} icon={<UserOutlined />} />}
              description="Готівка"
              title="З рахунку"
            />
          </List.Item> */}

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
