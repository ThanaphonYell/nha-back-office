// /components/PermissionRow.tsx
'use client';

import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { MenuItem } from '@/actions/access-control/access';

type PermissionAction = 'View' | 'Edit' | 'Delete' | 'Export';

interface PermissionRowProps {
  item: MenuItem;
  groupIndex: number;
  itemIndex: number;
  selectedPermissions: string[];
  onPermissionChange: (label: string, action: PermissionAction, checked: boolean) => void;
}

export default function PermissionRow({
  item,
  groupIndex,
  itemIndex,
  selectedPermissions,
  onPermissionChange,
}: PermissionRowProps) {
  const actions: PermissionAction[] = ['View', 'Edit', 'Delete', 'Export'];

  return (
    <tr key={`${groupIndex}-${itemIndex}`} className="table-row">
      <td className="table-cell text-left">
        <i className={`${item.icon} mr-2`}></i>
        {item.label}
      </td>
      {actions.map((action) => (
        <td key={action} className="table-cell text-center">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={selectedPermissions.includes(`${action} ${item.label}`)}
            onChange={(checked) => onPermissionChange(item.label, action, checked)}
          />
        </td>
      ))}
    </tr>
  );
}