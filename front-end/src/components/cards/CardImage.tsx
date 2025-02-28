// /components/ImageCard.tsx
'use client';

import { Image as AntImage, Tooltip } from 'antd';
import { Image } from '@/actions/media-library/imageLibrary';
import CustomButton from '@/components/buttons/CustomButton';

interface ImageCardProps {
    image: Image;
    onDelete: (imageId: string) => void;
}

export default function ImageCard({ image, onDelete }: ImageCardProps) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-2 hover:shadow-lg transition-all duration-200">
            <AntImage
                src={image.url}
                alt={image.name}
                width={128} // w-32 = 128px
                height={128} // h-32 = 128px
                className="object-cover rounded"
                preview
            />
            <p className="text-sm text-gray-800">{image.name}</p>
            <Tooltip title="ลบรูปภาพนี้">
                <CustomButton
                    type="secondary"
                    onClick={() => onDelete(image.id)}
                    icon={<i className="bi bi-trash" />}
                    className="text-red-500 hover:!text-red-700"
                >
                    ลบ
                </CustomButton>
            </Tooltip>
        </div>
    );
}