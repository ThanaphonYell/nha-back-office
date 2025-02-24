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
            {
                label: 'Components',
                iconClass: 'bi bi-menu-button-wide',
                link: '/',
                items: [
                    {
                        label: 'Alerts',
                        link: '/'
                    },
                    {
                        label: 'Accordion',
                        link: '/'
                    },
                    {
                        label: 'Badges',
                        link: '/'
                    },
                ]
            }
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