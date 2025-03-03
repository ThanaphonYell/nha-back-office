'use client';

import { useState, useEffect } from 'react';
import { Input } from 'antd';
import CardContent from '@/components/cards/CardContent';
import CardMain from '@/components/cards/CardMain';
import { createFolder, fetchFolders, Folder } from '@/actions/media-library/imageLibrary';
import FolderCard from '@/components/cards/CardFolder';
import Loading from '@/components/loading/Loading';
import CustomButton from '@/components/buttons/CustomButton';
import CustomDrawer from '@/components/drawers/CustomDrawer';

export default function ImageLibraryPage() {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [loading, setLoading] = useState(true);
    const [newFolderName, setNewFolderName] = useState('');
    const [drawerVisible, setDrawerVisible] = useState(false);

    useEffect(() => {
        const loadFolders = async () => {
            try {
                const data = await fetchFolders();
                setFolders(data);
            } catch (error) {
                console.error('Error loading folders:', error);
            } finally {
                setLoading(false);
            }
        };
        loadFolders();
    }, []);

    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) return;
        try {
            const newFolder = await createFolder(newFolderName);
            setFolders((prev) => [...prev, newFolder]);
            setNewFolderName('');
            setDrawerVisible(false);
        } catch (error) {
            console.error('Error creating folder:', error);
        }
    };

    const handleUpdateFolder = (updatedFolder: Folder) => {
        setFolders((prev) =>
            prev.map((folder) => (folder.id === updatedFolder.id ? updatedFolder : folder))
        );
    };

    const handleDeleteFolder = (folderId: string) => {
        setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
    };

    const openDrawer = () => setDrawerVisible(true);
    const closeDrawer = () => {
        setNewFolderName('');
        setDrawerVisible(false);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <CardMain breadcrumbs={[{ label: 'คลังรูปภาพ' }, { label: 'จัดการโฟลเดอร์' }]}>
            <CardContent title="จัดการคลังรูปภาพ">
                <div className="mb-6 flex items-center space-x-4">
                    <CustomButton
                        type="primary"
                        icon={<i className="bi bi-plus" />}
                        onClick={openDrawer}
                    >
                        สร้างโฟลเดอร์
                    </CustomButton>
                    <CustomDrawer
                        title="สร้างโฟลเดอร์ใหม่"
                        open={drawerVisible}
                        onClose={closeDrawer}
                        onSubmit={handleCreateFolder}
                        submitText="สร้าง"
                        submitDisabled={!newFolderName.trim()}
                    >
                        <Input
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            placeholder="ชื่อโฟลเดอร์ใหม่"
                            className="rounded-lg"
                        />
                    </CustomDrawer>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {folders.map((folder) => (
                        <FolderCard
                            key={folder.id}
                            folder={folder}
                            onUpdate={handleUpdateFolder}
                            onDelete={handleDeleteFolder} // ส่ง callback เพื่อลบ
                        />
                    ))}
                </div>
            </CardContent>
        </CardMain>
    );
}