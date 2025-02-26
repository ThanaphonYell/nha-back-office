"use client";

import '@ant-design/v5-patch-for-react-19'; 
import { Button, Form, Input, Checkbox, notification, Space, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useClient } from '@/common/hook/useClient';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/logo/Logo';
import { actionSignIn } from '@/actions/authenticate/actionSignIn';
import Loading from '@/components/loading/Loading';

const { Title, Text } = Typography;

interface SignInFormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [notificationApi, contextHolder] = notification.useNotification();
  const isClient = useClient();
  const router = useRouter();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (values: SignInFormValues) => {
      setIsLoading(true);
      try {
        const res = await actionSignIn({
          username: values.username,
          password: values.password,
        });

        if (res?.meta?.response_code !== 20000) {
          throw new Error(res?.meta?.response_desc ?? 'Invalid credentials');
        }

        notificationApi.success({
          message: 'Login Successful',
          description: 'Redirecting to dashboard...',
        });

        router.push('/');
      } catch (error) {
        const errorMessage = (error as { message: string })?.message;
        notificationApi.error({
          message: 'Login Failed',
          description: errorMessage,
        });
        form.setFields([
          {
            name: 'password',
            errors: [errorMessage],
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [form, notificationApi, router],
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isClient && contextHolder}
      {isLoading ? (
        <Loading label="กำลังเข้าสู่ระบบ..." />
      ) : (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <Space direction="vertical" size="middle" className="w-full">
            <div className="flex justify-center py-4">
              <Logo isAlignCenter={true} />
            </div>

            <Title level={4} className="text-center">
              Login to Your Account
            </Title>
            <Text type="secondary" className="text-center block">
              Enter your username & password to login
            </Text>

            <Form
              form={form}
              name="login_form"
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{ remember: true }}
              requiredMark={false}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please enter your username!' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Username"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  Login
                </Button>
              </Form.Item>

            </Form>
          </Space>
        </div>
      )}
    </div>
  );
}