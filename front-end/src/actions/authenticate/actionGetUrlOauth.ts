'use server'

import { AppRequest } from "@/common/core/AppRequest"

export async function actionGetUrlOauth<R = unknown>() {
    return await AppRequest.fetch<R>('/api/v1/oauth/url-authorize');
}