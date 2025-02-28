// /components/FolderCard.tsx
'use client';

import Link from 'next/link';
import { Folder } from '@/actions/media-library/imageLibrary';
import { Avatar, Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
interface FolderCardProps {
    folder: Folder;
}

const actions: React.ReactNode[] = [
    <EditOutlined key="edit" />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
];

export default function FolderCard({ folder }: FolderCardProps) {
    return (
        <Card actions={actions} style={{ minWidth: 300 }} className="shadow-md space-x-4 hover:shadow-lg transition-all duration-200">
            <Link href={`/media-library/${folder.id}`}>
                <Card.Meta
                    avatar={<i className="bi bi-folder text-3xl text-indigo-600"></i>}
                    title={folder.name}
                    description={<p className="text-sm text-gray-500">{folder.imageCount} รูปภาพ</p>}
                />
            </Link>
        </Card>
    );
}