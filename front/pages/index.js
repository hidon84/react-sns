import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Input, Form, Icon, Button, Card, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { loginAction, logoutAction } from '../reducers/user';

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  //dep에 [] 만 넣으면 컴포넌트didmount랑 동일
  // useEffect(() => {
  //   dispatch(loginAction);
  // }, []);
  return (
    <div>
      {isLoggedIn && <PostForm />}
      {mainPosts.map(c => {
        return <PostCard key={c} post={c} />;
      })}
    </div>
  );
};
export default Home;
