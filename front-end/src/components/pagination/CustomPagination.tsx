'use client';

import { Pagination } from 'antd';
import { PaginationProps } from 'antd';

interface CustomPaginationProps extends PaginationProps {
  total: number;
  pageSize: number;
  current: number;
  onPageChange: (page: number) => void;
}

export default function CustomPagination({
  total,
  pageSize,
  current,
  onPageChange,
  ...rest
}: CustomPaginationProps) {
  return (
    <Pagination
      total={total}
      pageSize={pageSize}
      current={current}
      onChange={onPageChange}
      showSizeChanger={false} // ไม่แสดงตัวเลือกเปลี่ยน pageSize
      className="flex justify-center mt-6"
      {...rest}
    />
  );
}