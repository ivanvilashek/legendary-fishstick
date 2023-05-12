import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space, Typography } from 'antd';
import { ROUTES } from '../../core/constants';
import { useAuth } from '../../shared/hook';
import styles from './Login.module.scss';

const { Title } = Typography;

export const Login = () => {
  const { signIn, signInWithGoogle } = useAuth();

  const [form] = Form.useForm();

  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div className="wrapper">
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
          <Space.Compact block direction="vertical">
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
            <Button
              icon={<GoogleOutlined className="googleIcon" />}
              type="default"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </Button>
          </Space.Compact>
          Or <Link to={ROUTES.REGISTER}>register now!</Link>
          <Link to="" className={styles.forgotLink}>
            Forgot password
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
