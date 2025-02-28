'use client';

import '@ant-design/v5-patch-for-react-19';
import { useState, useEffect } from 'react';
import CardContent from '@/components/cards/CardContent';
import CardMain from '@/components/cards/CardMain';
import { fetchMenuGroups, MenuGroup } from '@/actions/access-control/access';
import PermissionRow from '@/components/access-control/PermissionRow';
import Loading from '@/components/loading/Loading';
import CustomButton from '@/components/buttons/CustomButton';

export default function Page() {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [menuData, setMenuData] = useState<MenuGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenuGroups = async () => {
      try {
        const data = await fetchMenuGroups();
        setMenuData(data);
      } catch (error) {
        console.error('Error loading menu groups:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMenuGroups();
  }, []);

  const handlePermissionChange = (
    menuLabel: string,
    action: 'View' | 'Edit' | 'Delete' | 'Export',
    checked: boolean
  ) => {
    const permissionKey = `${action} ${menuLabel}`;
    setSelectedPermissions((prev) =>
      checked ? [...prev, permissionKey] : prev.filter((p) => p !== permissionKey)
    );
  };

  const handleSave = () => {
    console.log('Selected Permissions:', selectedPermissions);
  };

  const handleCancel = () => {
    setSelectedPermissions([]);
    console.log('Changes cancelled');
  };

  if (loading) {
    return <Loading />
  }

  return (
    <CardMain breadcrumbs={[{ label: 'จัดการผู้ใช้งาน' }, { label: 'จัดการสิทธิ์' }]}>
      <CardContent title="จัดการสิทธิ์">
        <table className="permissions-table">
          <thead>
            <tr>
              <th className="table-cell text-left w-[70%]">ชื่อเมนู</th>
              <th className="table-cell text-center">เรียกดู</th>
              <th className="table-cell text-center">สร้าง/แก้ไข</th>
              <th className="table-cell text-center">ลบ</th>
              <th className="table-cell text-center">Export</th>
            </tr>
          </thead>
          <tbody>
            {menuData.map((group: MenuGroup, groupIndex: number) => (
              <>
                {group.title && (
                  <tr key={`group-${groupIndex}`}>
                    <td colSpan={5} className="group-header">
                      {group.title}
                    </td>
                  </tr>
                )}
                {group.items.map((item, itemIndex) => (
                  <PermissionRow
                    key={`${groupIndex}-${itemIndex}`}
                    item={item}
                    groupIndex={groupIndex}
                    itemIndex={itemIndex}
                    selectedPermissions={selectedPermissions}
                    onPermissionChange={handlePermissionChange}
                  />
                ))}
              </>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-6 gap-3">
          <CustomButton type="secondary" onClick={handleCancel}>
            ยกเลิก
          </CustomButton>
          <CustomButton
            type="primary"
            onClick={handleSave}
          >
            สร้าง
          </CustomButton>
        </div>
      </CardContent>
    </CardMain>
  );
}