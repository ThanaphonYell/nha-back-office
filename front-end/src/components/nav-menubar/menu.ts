import { Url } from "next/dist/shared/lib/router/router";

export interface IMenuItem {
    label: string;
    link: Url;
    iconClass?: string;
    items?: IMenuItem[];
}

export interface IMenuGroup {
    title: string | null;
    menu: IMenuItem[];
}

export const menu: IMenuGroup[] = [
    {
        title: null,
        menu: [
            {
                label: 'Dashboard',
                iconClass: 'bi bi-grid',
                link: '/'
            },
        ]
    },
    {
        title: 'MENU',
        menu: [
            {
                label: 'เครื่องประเมิน',
                iconClass: 'bi bi-display',
                link: '/'
            },
            {
                label: 'จัดการแบบประเมิน',
                iconClass: 'bi bi-check-square',
                link: '/'
            },
            
        ]
    },
    {
        title: 'RESOURCE',
        menu: [
            {
                label: 'หน่วยประเมิน (Object)',
                iconClass: 'bi bi-person',
                link: '/'
            },
            {
                label: 'คลังภาพ',
                iconClass: 'bi bi-images',
                link: '/media-library'
            },

        ]
    },
    {
        title: 'REPORT',
        menu: [
            {
                label: 'Report',
                iconClass: 'bi bi-check-square',
                link: '/'
            },
            {
                label: 'Transaction',
                iconClass: 'bi bi-person',
                link: '/'
            },

        ]
    },
    {
        title: 'SETTING',
        menu: [
            {
                label: 'Business',
                iconClass: 'bi bi-bank',
                link: '/'
            },
            {
                label: 'จัดการผู้ใช้งาน',
                iconClass: 'bi bi-person',
                link: '/access-control'
            },

        ]
    },
    {
        title: 'PAGES',
        menu: [
            {
                label: 'Login',
                iconClass: 'bi bi-box-arrow-in-right',
                link: '/login'
            },

        ]
    }
];