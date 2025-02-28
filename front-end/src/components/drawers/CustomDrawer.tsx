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
  progress?: number; // เพิ่ม prop สำหรับ % ความคืบหน้า
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
  progress,
}: CustomDrawerProps) {
  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      open={open}
      width={width}
      className="shadow-lg"
      styles={{ body: { backgroundColor: '#f9fafb', padding: '24px' } }} 
    >
      <div className="space-y-6">
        {children}
        {progress !== undefined && (
          <div className="mt-4">
            <progress value={progress} max={100} className="w-full h-2 rounded bg-indigo-100" />
            <p className="text-sm text-gray-600 mt-1">{progress}%</p>
          </div>
        )}
        <div className="flex justify-end gap-2">
          <CustomButton type="secondary" onClick={onClose}>
            {cancelText}
          </CustomButton>
          <CustomButton
            type="primary"
            onClick={onSubmit}
            disabled={submitDisabled || progress !== undefined} // ปิดปุ่มขณะอัปโหลด
          >
            {submitText}
          </CustomButton>
        </div>
      </div>
    </Drawer>
  );
}