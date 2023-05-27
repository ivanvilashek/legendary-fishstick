import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Space, Typography } from 'antd';
import { useAuth } from 'shared/hook';
import { ROUTES } from 'core/constants';
import { Rule } from 'antd/es/form';

const { Title } = Typography;

export const Register = () => {
  const { signUp, signInWithGoogle } = useAuth();

  const [form] = Form.useForm();

  useEffect(() => {
    document.title = 'Register';
  }, []);

  const validatePasswords = (rule: Rule, value: String) => {
    return !value || form.getFieldValue('password') === value
      ? Promise.resolve()
      : Promise.reject(new Error('Passwords do not match'));
  };

  return (
    <div className="wrapper">
      <Form className="form" form={form} onFinish={signUp}>
        <Title level={1} className="formTitle">
          Register
        </Title>

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input
            prefix={<UserOutlined className="inputIcon" />}
            placeholder="Name"
          />
        </Form.Item>

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
            prefix={<MailOutlined className="inputIcon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="inputIcon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          rules={[
            { validator: validatePasswords },
            { required: true, message: 'Please confirm your password' },
          ]}
          dependencies={['password']}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="inputIcon" />}
            placeholder="Confirm your password"
          />
        </Form.Item>

        <Form.Item>
          <Space.Compact block direction="vertical">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <Button
              icon={<GoogleOutlined className="googleIcon" />}
              type="default"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </Button>
          </Space.Compact>
          Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
