export type MenuItem = {
    label: string;
    icon: string;
  };
  
  export type MenuGroup = {
    title: string | null;
    items: MenuItem[];
  };
  
  export const mockMenuGroups: MenuGroup[] = [
    { title: null, items: [{ label: 'Dashboard', icon: 'bi bi-grid' }] },
    {
      title: 'MENU',
      items: [
        { label: 'เครื่องประเมิน', icon: 'bi bi-display' },
        { label: 'จัดการแบบประเมิน', icon: 'bi bi-check-square' },
      ],
    },
    {
      title: 'RESOURCE',
      items: [
        { label: 'หน่วยประเมิน (Object)', icon: 'bi bi-person' },
        { label: 'คลังภาพ', icon: 'bi bi-images' },
      ],
    },
    {
      title: 'REPORT',
      items: [
        { label: 'Report', icon: 'bi bi-bar-chart' },
        { label: 'Transaction', icon: 'bi bi-currency-exchange' },
      ],
    },
    {
      title: 'SETTING',
      items: [
        { label: 'Business', icon: 'bi bi-building' },
        { label: 'จัดการผู้ใช้งาน', icon: 'bi bi-gear' },
      ],
    },
  ];
  
  export async function fetchMenuGroups(): Promise<MenuGroup[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockMenuGroups), 500); // delay 500ms
    });
    // ตัวอย่าง API จริง:
    // return await AppRequest.fetch<R>('/api/v1/oauth/url-authorize');

    // const response = await fetch('/api/menu-groups');
    // if (!response.ok) throw new Error('Failed to fetch menu groups');
    // return response.json();
  }