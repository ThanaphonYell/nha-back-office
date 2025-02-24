"use client";

import '@ant-design/v5-patch-for-react-19';
import { Button, notification, Result } from "antd"
import { useClient } from "@/common/hook/useClient";
import Loading from "@/components/loading/Loading"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { actionVerifyCode } from '@/actions/authenticate/actionVerifyCode';

function Page() {
    const [notificationMessage, contextHolder] = notification.useNotification();
    const [error, setError] = useState<string | null>(null);
    const isClient = useClient();
    const router = useRouter();
    const searchParams = useSearchParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await actionVerifyCode({
                    code: searchParams?.get('code') ?? '',
                    state: searchParams?.get('state') ?? '',
                });
      
                if(res?.meta?.response_code !== 20000) {
                    throw new Error(res?.meta?.response_desc ?? 'Invalid response code');
                }

                if(!res?.cookie) {
                    throw new Error('Error server cannot set cookie');
                }

                router.push('/');
            } catch (error) {
                const textError = (error as { message: string })?.message;
                notificationMessage.error({
                    message: 'Error fetching',
                    description: textError
                })

                setError(textError);
                return;
            }
        };

        fetchData();
    }, [searchParams, notificationMessage, router]);

    return (
        <div className="flex w-full h-[100dvh]">
            {isClient && contextHolder}
            <div className="flex mx-auto">
                {error === null ? 
                    <Loading label="กรุณารอสักครู่ ระบบกำลังตรวจสอบ" />
                    :
                    <Result
                        status="500"
                        title="500"
                        subTitle={error}
                        extra={<Button type="primary">Back Home</Button>}
                    />
                }
            </div>
        </div>
    )
}

export default Page