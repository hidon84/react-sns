import React from 'react';
import { Card, Avatar, Menu, Input, Button, Row, Col, Form } from 'antd';
const NicnameEditForm = () => {
  return (
    <Form
      style={{
        marginBottom: '20px',
        border: '1px solid #d9d9d9',
        padding: '20px'
      }}
    >
      <Input addonBefore="닉네임" />
      <Button type="primary">수정</Button>
    </Form>
  );
};

export default NicnameEditForm;
