'use client';

import '@ant-design/v5-patch-for-react-19';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import CardContent from '@/components/cards/CardContent';
import CardMain from '@/components/cards/CardMain';
import { deleteImage, fetchFolderImages, Image, uploadImage } from '@/actions/media-library/imageLibrary';
import ImageCard from '@/components/cards/CardImage';
import Loading from '@/components/loading/Loading';
import CustomPagination from '@/components/pagination/CustomPagination';

const { Dragger } = Upload;

export default function FolderDetailPage() {
    const { folderId } = useParams();
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploadProgress, setUploadProgress] = useState<number | undefined>(undefined);

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

    const handleUpload = async (file: File) => {
        try {
            setUploadProgress(0);
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev === undefined) return 0;
                    if (prev >= 90) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 10;
                });
            }, 200);

            const newImage = await uploadImage(folderId as string, file);
            setUploadProgress(100);
            clearInterval(interval);
            setImages((prev) => [...prev, newImage]);
            setUploadProgress(undefined);
            message.success(`${file.name} อัปโหลดสำเร็จ`);
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadProgress(undefined);
            message.error(`${file.name} อัปโหลดล้มเหลว`);
        }
        return false; // ป้องกันการอัปโหลดอัตโนมัติของ Ant Design
    };

    const handleDelete = async (imageId: string) => {
        try {
            await deleteImage(folderId as string, imageId);
            setImages((prev) => prev.filter((img) => img.id !== imageId));
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handlePageChange = (page: number) => {
        // setCurrentPage(page);
      };

    if (loading) {
        return <Loading />;
    }

    return (
        <CardMain
            breadcrumbs={[
                { label: 'คลังรูปภาพ' },
                { label: 'จัดการโฟลเดอร์', link: '/image-library' },
                { label: 'รายละเอียดโฟลเดอร์' },
            ]}
        >
            <CardContent title="อัพโหลดรูปภาพ">
                <div className="mb-6">
                    <Dragger
                        customRequest={({ file }) => handleUpload(file as File)}
                        showUploadList={false}
                        multiple={true}
                        accept="image/*"
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined className="text-indigo-600 text-4xl" />
                        </p>
                        <p className="ant-upload-text text-indigo-800 font-semibold">
                            คลิกหรือลากไฟล์มาวางที่นี่เพื่ออัปโหลด
                        </p>
                        <p className="ant-upload-hint text-gray-600">
                            รองรับเฉพาะไฟล์รูปภาพ (jpg, png, etc.)
                        </p>
                        {uploadProgress !== undefined && (
                            <div className="mt-4">
                                <progress
                                    value={uploadProgress}
                                    max={100}
                                    className="w-full h-2 rounded bg-indigo-100"
                                />
                                <p className="text-sm text-gray-600 mt-1">{uploadProgress}%</p>
                            </div>
                        )}
                    </Dragger>
                </div>
                <h4 className="card-title">รายละเอียดโฟลเดอร์</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {images.map((image) => (
                        <ImageCard key={image.id} image={image} onDelete={handleDelete} />
                    ))}
                </div>
                <CustomPagination
                    total={images.length}
                    pageSize={1}
                    current={1}
                    onPageChange={handlePageChange}
                />
            </CardContent>

        </CardMain>
    );
}