'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Input } from 'antd';
import CardContent from '@/components/cards/CardContent';
import CardMain from '@/components/cards/CardMain';
import { deleteImage, fetchFolderImages, Image, uploadImage } from '@/actions/media-library/imageLibrary';
import ImageCard from '@/components/cards/CardImage';
import CustomButton from '@/components/buttons/CustomButton';
import CustomDrawer from '@/components/drawers/CustomDrawer';
import Loading from '@/components/loading/Loading';

export default function FolderDetailPage() {
  const { folderId } = useParams();
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await fetchFolderImages(folderId as string);
        setImages(data);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, [folderId]);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const newImage = await uploadImage(folderId as string, file);
      setImages((prev) => [...prev, newImage]);
      setFile(null);
      setDrawerVisible(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDelete = async (imageId: string) => {
    try {
      await deleteImage(folderId as string, imageId);
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => {
    setFile(null);
    setDrawerVisible(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <CardMain
      breadcrumbs={[
        { label: 'คลังรูปภาพ' },
        { label: 'จัดการโฟลเดอร์', link: '/media-library' },
        { label: 'รายละเอียดโฟลเดอร์' },
      ]}
    >
      <CardContent title="รายละเอียดโฟลเดอร์">
        <div className="mb-6 flex items-center space-x-4">
          <CustomButton
            type="primary"
            icon={<i className="bi bi-upload" />}
            onClick={openDrawer}
          >
            อัปโหลดรูปภาพ
          </CustomButton>
          <CustomDrawer
            title="อัปโหลดรูปภาพ"
            open={drawerVisible}
            onClose={closeDrawer}
            onSubmit={handleUpload}
            submitText="อัปโหลด"
            submitDisabled={!file}
          >
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="border rounded-lg px-4 py-2"
            />
          </CustomDrawer>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} onDelete={handleDelete} />
          ))}
        </div>
      </CardContent>
    </CardMain>
  );
}