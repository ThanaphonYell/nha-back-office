'use server'

import { AppRequest } from "@/common/core/AppRequest"
import { cookies } from "next/headers";

export interface IResponseVerifyCode {
    access_token: string;
    id_token: string;
    refresh_token: string;
    scope: string;
    session_expire: string | number;
    token: string;
    token_type: string;
}

export async function actionVerifyCode(data: {
    code: string;
    state?: string;
}) {
    const cookieStore = await cookies()

    const res =  await AppRequest.fetch<IResponseVerifyCode>('/api/v1/oauth/verify-code', {
        method: 'POST',
        data: data
    });

    if(res?.meta?.response_code === 20000) {
        if(res?.data && Object.keys(res?.data)?.length > 0) {
            for (const [key, value] of Object.entries(res?.data)) {
                cookieStore.set(key, value);
            }
        }
    }

    return {
        ...res,
        cookie: cookieStore.getAll()
    }
}