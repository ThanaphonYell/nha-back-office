"use client"

import '@ant-design/v5-patch-for-react-19';
import { useState } from 'react';
import { Button, Modal } from 'antd';

function ModalTest() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    return (
      <>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </>
    );
}

export default ModalTest