import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Typography, message } from 'antd';
import { useAuth } from '../../hook';
import { ROUTES } from '../../constants';
import { Rule } from 'antd/es/form';

const { Title } = Typography;

export const Register = () => {
  const { signUp } = useAuth();

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

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
      {contextHolder}
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
            <Button type="default" onClick={() => navigate(ROUTES.LOGIN)}>
              Log in
            </Button>
          </Space.Compact>
        </Form.Item>
      </Form>
    </div>
  );
};
