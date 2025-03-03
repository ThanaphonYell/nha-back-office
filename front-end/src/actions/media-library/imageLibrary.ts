// /lib/imageLibrary.ts
export type Image = {
  id: string;
  name: string;
  url: string;
};

export type Folder = {
  id: string;
  name: string;
  imageCount: number;
  images: Image[];
};

// Mock ข้อมูลโฟลเดอร์
export const mockFolders: Folder[] = [
  {
    id: '1', name: 'Vacation 2024', imageCount: 5, images: [
      { id: '1-1', name: 'Beach.jpg', url: 'https://www.techsmith.com/blog/wp-content/uploads/2023/08/What-are-High-Resolution-Images.png' },
      { id: '1-2', name: 'Mountain.jpg', url: 'https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg' },
      { id: '2-1', name: 'Meeting.jpg', url: 'https://img.freepik.com/premium-photo/colorful-planet-with-rings-background_81048-9457.jpg' },
    ]
  },
  {
    id: '2', name: 'Work Photos', imageCount: 3, images: [
      { id: '2-1', name: 'Meeting.jpg', url: 'https://img.freepik.com/premium-photo/colorful-planet-with-rings-background_81048-9457.jpg' },
    ]
  },
];

// จำลอง fetch โฟลเดอร์ทั้งหมด
export async function fetchFolders(): Promise<Folder[]> {
  return new Promise((resolve) => setTimeout(() => resolve(mockFolders), 500));
}

// จำลอง fetch รูปภาพในโฟลเดอร์
export async function fetchFolderImages(folderId: string): Promise<Image[]> {
  const folder = mockFolders.find((f) => f.id === folderId);
  return new Promise((resolve) =>
    setTimeout(() => resolve(folder?.images || []), 500)
  );
}

// จำลองการสร้างโฟลเดอร์
export async function createFolder(name: string): Promise<Folder> {
  const newFolder: Folder = {
    id: `${Date.now()}`, // จำลอง ID
    name,
    imageCount: 0,
    images: [],
  };
  mockFolders.push(newFolder);
  return new Promise((resolve) => setTimeout(() => resolve(newFolder), 500));
}

// จำลองการแก้ไขชื่อโฟลเดอร์
export async function editFolderName(folderId: string, newName: string): Promise<Folder> {
  const folder = mockFolders.find((f) => f.id === folderId);
  if (!folder) throw new Error('Folder not found');
  folder.name = newName;
  return new Promise((resolve) => setTimeout(() => resolve(folder), 500));
}

// จำลองการลบโฟลเดอร์
export async function deleteFolder(folderId: string): Promise<void> {
  const index = mockFolders.findIndex((f) => f.id === folderId);
  if (index === -1) throw new Error('Folder not found');
  mockFolders.splice(index, 1);
  return new Promise((resolve) => setTimeout(() => resolve(), 500));
}

// จำลองการอัปโหลดรูปภาพ
export async function uploadImage(folderId: string, file: File): Promise<Image> {
  const newImage: Image = {
    id: `${folderId}-${Date.now()}`, // จำลอง ID
    name: file.name,
    url: `/mock/${file.name}`, // จำลอง URL
  };
  const folder = mockFolders.find((f) => f.id === folderId);
  if (folder) {
    folder.images.push(newImage);
    folder.imageCount = folder.images.length;
  }
  return new Promise((resolve) => setTimeout(() => resolve(newImage), 500));
}

// จำลองการลบรูปภาพ
export async function deleteImage(folderId: string, imageId: string): Promise<void> {
  const folder = mockFolders.find((f) => f.id === folderId);
  if (folder) {
    folder.images = folder.images.filter((img) => img.id !== imageId);
    folder.imageCount = folder.images.length;
  }
  return new Promise((resolve) => setTimeout(() => resolve(), 500));
}