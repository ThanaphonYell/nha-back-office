// /components/drawers/CustomDrawer.tsx
'use client';

import { Drawer } from 'antd';
import { ReactNode } from 'react';
import CustomButton from '@/components/buttons/CustomButton';

interface CustomDrawerProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
  submitText?: string;
  cancelText?: string;
  width?: number;
  submitDisabled?: boolean;
}

export default function CustomDrawer({
  title,
  open,
  onClose,
  onSubmit,
  children,
  submitText = 'บันทึก',
  cancelText = 'ยกเลิก',
  width = 400,
  submitDisabled = false,
}: CustomDrawerProps) {
  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      open={open}
      width={width}
    >
      <div className="space-y-4">
        {children}
        <div className="flex justify-end gap-2">
          <CustomButton type="secondary" onClick={onClose}>
            {cancelText}
          </CustomButton>
          <CustomButton
            type="primary"
            onClick={onSubmit}
            disabled={submitDisabled}
          >
            {submitText}
          </CustomButton>
        </div>
      </div>
    </Drawer>
  );
}