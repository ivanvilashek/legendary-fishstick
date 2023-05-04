import { useEffect, useState } from 'react';
import {
  DatePicker,
  Form,
  Input,
  Modal,
  Segmented,
  Select,
  Avatar,
  List,
} from 'antd';
import {
  CalendarOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  UserOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { ImSpoonKnife, ImPencil, ImAirplane } from 'react-icons/im';
import styles from './NewTransaction.module.scss';
import dayjs from 'dayjs';

const categories = [
  {
    value: 'food',
    label: 'Food',
    icon: <ImSpoonKnife />,
    color: '#fcba03',
  },
  {
    value: 'education',
    label: 'Education',
    icon: <ImPencil />,
    color: '#eb4034',
  },
  { value: 'travel', label: 'Travel', icon: <ImAirplane />, color: '#32a852' },
];

export const NewTransaction = () => {
  const [value, setValue] = useState<string | number>('expense');
  const [CategoryIcon, setCategoryIcon] = useState(<UserOutlined />);

  const [form] = Form.useForm();
  const selectedItem = Form.useWatch('category', form);

  const segmentedChangeHandler = (value: string | number) => setValue(value);

  useEffect(() => {
    const selected = categories.find((item) => item.value === selectedItem);
    if (selected) {
      setCategoryIcon(
        <Avatar
          size={35}
          icon={selected.icon}
          className={styles.categoryIcon}
          style={{ background: selected.color }}
        />
      );
    }
  }, [selectedItem]);

  return (
    <Modal open={true} closable={false} width={350}>
      <Segmented
        block
        value={value}
        onChange={segmentedChangeHandler}
        options={[
          {
            value: 'income',
            label: 'Income',
            icon: <PlusCircleOutlined />,
          },
          {
            value: 'expense',
            label: 'Expense',
            icon: <MinusCircleOutlined />,
          },
        ]}
      />
      <Form
        form={form}
        initialValues={{ category: 'education', date: dayjs() }}
      >
        <List className={styles.list}>
          <List.Item>
            <List.Item.Meta
              className={styles.meta}
              avatar={CategoryIcon}
              title="На категорію"
              description={
                <Form.Item noStyle name="category">
                  <Select bordered={false} size="small" options={categories} />
                </Form.Item>
              }
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              className={styles.meta}
              avatar={<Avatar size={35} icon={<UserOutlined />} />}
              description="Готівка"
              title="З рахунку"
            />
          </List.Item>
          <List.Item>
            <List.Item.Meta
              className={styles.meta}
              avatar={<Avatar size={35} icon={<CalendarOutlined />} />}
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
              avatar={<Avatar size={35} icon={<FormOutlined />} />}
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
