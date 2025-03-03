// /components/FolderCard.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Folder, editFolderName, deleteFolder } from '@/actions/media-library/imageLibrary';
import { Avatar, Card, Modal, Input, Dropdown, MenuProps, Popconfirm, message } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import CustomButton from '@/components/buttons/CustomButton';

interface FolderCardProps {
  folder: Folder;
  onUpdate?: (updatedFolder: Folder) => void;
  onDelete?: (folderId: string) => void; // Callback เพื่อลบใน parent
}

const actions: React.ReactNode[] = [
  <SettingOutlined key="setting" />,
];

export default function FolderCard({ folder, onUpdate, onDelete }: FolderCardProps) {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [newFolderName, setNewFolderName] = useState(folder.name);

  const handleEdit = () => {
    setIsEditModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const updatedFolder = await editFolderName(folder.id, newFolderName);
      if (onUpdate) onUpdate(updatedFolder);
      message.success('แก้ไขชื่อโฟลเดอร์สำเร็จ');
      setIsEditModalVisible(false);
    } catch (error) {
      console.error('Error editing folder name:', error);
      message.error('แก้ไขชื่อโฟลเดอร์ล้มเหลว');
    }
  };

  const handleCancel = () => {
    setNewFolderName(folder.name);
    setIsEditModalVisible(false);
  };

  const handleDelete = async () => {
    try {
      await deleteFolder(folder.id);
      if (onDelete) onDelete(folder.id);
      message.success('ลบโฟลเดอร์สำเร็จ');
    } catch (error) {
      console.error('Error deleting folder:', error);
      message.error('ลบโฟลเดอร์ล้มเหลว');
    }
  };

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'delete',
      label: (
        <Popconfirm
          title="คุณแน่ใจหรือไม่ว่าต้องการลบโฟลเดอร์นี้?"
          onConfirm={handleDelete}
          okText="ใช่"
          cancelText="ไม่"
          placement="left"
        >
          <span className="text-red-500 hover:text-red-700 flex items-center gap-2">
            <DeleteOutlined /> ลบ
          </span>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Card
        actions={[
          <EditOutlined key="edit" onClick={handleEdit} />,
          ...actions,
          <Dropdown menu={{ items: dropdownItems }} trigger={['click']} placement="bottomRight">
            <EllipsisOutlined key="ellipsis" />
          </Dropdown>,
        ]}
        style={{ minWidth: 300 }}
        className="shadow-md space-x-4 hover:shadow-lg transition-all duration-200"
      >
        <Link href={`/media-library/${folder.id}`}>
          <Card.Meta
            avatar={<i className="bi bi-folder text-3xl text-indigo-600"></i>}
            title={folder.name}
            description={<p className="text-sm text-gray-500">{folder.imageCount} รูปภาพ</p>}
          />
        </Link>
      </Card>
      <Modal
        title="แก้ไขชื่อโฟลเดอร์"
        open={isEditModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="บันทึก"
        cancelText="ยกเลิก"
        footer={[
          <CustomButton key="cancel" type="secondary" onClick={handleCancel}>
            ยกเลิก
          </CustomButton>,
          <CustomButton
            key="submit"
            type="primary"
            onClick={handleOk}
            disabled={!newFolderName.trim() || newFolderName === folder.name}
          >
            บันทึก
          </CustomButton>,
        ]}
      >
        <Input
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="ชื่อโฟลเดอร์ใหม่"
          className="rounded-lg"
        />
      </Modal>
    </>
  );
}