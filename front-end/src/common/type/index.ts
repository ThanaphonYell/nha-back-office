export interface IAppRequest<T = unknown> {
    meta: {
        response_code: string | number;
        response_desc: string;
        response_datetime: string;
    },
    data: T
}