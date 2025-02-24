"use client";

import '@ant-design/v5-patch-for-react-19';
import { Button, notification, Result } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useClient } from '@/common/hook/useClient';
import Loading from '@/components/loading/Loading';
import { actionGetUrlOauth } from '@/actions/authenticate/actionGetUrlOauth';

function Page() {
    const [notificationMessage, contextHolder] = notification.useNotification();
    const [url, setUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const isClient = useClient();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await actionGetUrlOauth<{ url: string }>();
                if(res?.meta?.response_code !== 20000) {
                    throw new Error(res?.meta?.response_desc ?? 'Invalid response code');
                }

                setUrl(res?.data?.url || null);
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
    }, [notificationMessage]);

    useEffect(() => {
        if(url) {
            router.push(url);
        }
    }, [url, router])

    return (
        <div className="flex w-full h-[100dvh]">
            {isClient && contextHolder}
            <div className="flex mx-auto">
                {error === null ? 
                    <Loading label='กำลังเชื่อมต่อ Okta' />
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
    );
}

export default Page