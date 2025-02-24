import axios, { AxiosRequestConfig } from "axios"
import { IAppRequest } from "../type";

export class AppRequest {

    public static async fetch<R = unknown, T = unknown>(path: string, config?: AxiosRequestConfig<T>): Promise<IAppRequest<R> | null | undefined> {
        const host = process.env?.HOST_API;
        const options: AxiosRequestConfig<T> = {
            ...config,
        }

        const res = await axios?.request({
            ...options,
            url: `${host}${path}`
        })

        if(res?.status >= 200 && res?.status < 300) {
            return res?.data ?? null;
        }

        return res.data
    }

    public static getData() {
        return process.env
    }
}