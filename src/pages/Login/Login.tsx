import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography, message } from 'antd';
import { ROUTES } from '../../constants';
import { useAuth } from '../../hook';
import styles from './Login.module.scss';

const { Title } = Typography;

export const Login = () => {
  const { signIn } = useAuth();

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div className="wrapper">
      {contextHolder}
      <Form
        className="form"
        form={form}
        onFinish={signIn}
        initialValues={{ remember: true }}
      >
        <Title level={1} className="formTitle">
          Log in
        </Title>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Incorrect email',
            },
            { required: true, message: 'Please enter your email' },
          ]}
        >
          <Input
            prefix={<UserOutlined className="inputIcon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            prefix={<LockOutlined className="inputIcon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            className={styles.submitButton}
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
          Or <Link to={ROUTES.REGISTER}>register now!</Link>
          <Link to="" className={styles.forgotLink}>
            Forgot password
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
