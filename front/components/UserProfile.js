import React, { useCallback } from 'react';
import { Card, Avatar, Menu, Input, Button, Row, Col, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  //use콜백으로 감싸는 이유는 자식컴포넌트에 props로 전달하기때문에
  const onLogout = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST });
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />
          {me.Post.length}
        </div>,
        <div key="twit">
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key="twit">
          팔로워
          <br />
          {me.Followers.length}
        </div>
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nicname}</Avatar>} title={me.nicname} />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};
export default UserProfile;
