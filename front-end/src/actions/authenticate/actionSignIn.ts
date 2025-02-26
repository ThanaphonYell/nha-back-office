'use server';

import { AppRequest } from '@/common/core/AppRequest';
import { IAppRequest } from '@/common/type';
import { cookies } from 'next/headers';

interface SignInResponseData {
  idToken: string;
  session_expire: number;
  refresh_token: string;
}

// interface SignInResponse {
//   meta: {
//     response_code: number;
//     response_desc: string;
//     response_datetime: string;
//   };
//   data: SignInResponseData | null;
//   cookie?: ReturnType<typeof cookies>['getAll'];
// }

export async function actionSignIn(data: {
  username: string;
  password: string;
}){
  
  const cookieStore = await cookies();

  try {
    const res = await AppRequest.fetch<SignInResponseData>('/api/v1/authentication/sign-in', {
      method: 'POST',
      data: {
        username: data.username,
        password: data.password,
      },
    });

    if (res?.meta?.response_code === 20000 && res?.data) {
      if(res?.data && Object.keys(res?.data)?.length > 0) {
        for (const [key, value] of Object.entries(res?.data)) {
            cookieStore.set(key, value);
        }
    }
    }

    return {
      ...res,
      cookie: cookieStore.getAll(),
    };
  } catch (error) {
    return {
      meta: {
        response_code: 40100,
        response_desc: (error as Error).message || 'Authentication failed',
        response_datetime: new Date().toISOString(),
      },
      data: null,
      cookie: cookieStore.getAll(),
    };
  }
}