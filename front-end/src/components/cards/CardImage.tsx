// /components/ImageCard.tsx
'use client';

import { useState } from 'react';
import { Image as AntImage, Tooltip, Popconfirm } from 'antd';
import { Image } from '@/actions/media-library/imageLibrary';
import CustomButton from '@/components/buttons/CustomButton';

interface ImageCardProps {
  image: Image;
  onDelete: (imageId: string) => void;
}

export default function ImageCard({ image, onDelete }: ImageCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true); // เริ่ม animation
    setTimeout(() => {
      onDelete(image.id); // ลบจริงหลัง animation เสร็จ
    }, 300); // ระยะเวลา animation 300ms
  };

  return (
    <div
      className={`bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-2 hover:shadow-lg transition-all duration-200 ${
        isDeleting ? 'animate-fade-out' : ''
      }`}
    >
      <AntImage
        src={image.url}
        alt={image.name}
        width={128}
        height={128}
        className="object-cover rounded"
        preview
      />
      <p className="text-sm text-gray-800">{image.name}</p>
      <Tooltip title="ลบรูปภาพนี้">
        <Popconfirm
          title="คุณแน่ใจหรือไม่ว่าต้องการลบรูปภาพนี้?"
          onConfirm={handleDelete}
          okText="ใช่"
          cancelText="ไม่"
          placement="top"
        >
          <CustomButton
            type="secondary"
            icon={<i className="bi bi-trash" />}
            className="text-red-500 hover:!text-red-700"
            disabled={isDeleting}
          >
            ลบ
          </CustomButton>
        </Popconfirm>
      </Tooltip>
    </div>
  );
}