import React, { useState, useCallback, useEffect } from 'react';
import {
  Card,
  Avatar,
  List,
  Comment,
  Input,
  Button,
  Row,
  Col,
  Form,
  Icon
} from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import PostForm from './PostForm';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [
    {
      User: {
        id: 1,
        nicname: '제로초'
      },
      contents: '테스트',
      img:
        'https://s3.ap-northeast-2.amazonaws.com/dev-artrioz-image/4yhxl_319jy_7vc4d_%EB%8D%94%20%EC%95%84%EB%A6%84%EB%8B%A4%EC%9A%B4%20%EB%AA%A9%EC%97%85.jpg'
    }
  ]
};
const PostCard = ({ post }) => {
  const [commentFormOpend, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState('');
  const { me } = useSelector(state => state.user);
  const { commentAdded } = useSelector(state => state.post);
  const { isAddingComment } = useSelector(state => state.post);
  const dispatch = useDispatch();

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
  }, []);
  const onSubmitComment = useCallback(
    e => {
      e.preventDefault();
      if (!me) {
        return alert('로그인해주세요');
      }
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          postId: post.id
        }
      });
    },
    [me && me.id]
  );
  useEffect(() => {
    setCommentText('');
  }, [commentAdded === true]);
  const onChangeCommentText = useCallback(e => {
    setCommentText(e.target.value);
  }, []);
  return (
    <div>
      <Card
        key={+post.createdAt}
        cover={post.img && <img alt="example" src={post.img} />}
        actions={[
          <Icon type="retweet" key="retweet" />,
          <Icon type="heart" key="heart" />,
          <Icon type="message" key="message" onClick={onToggleComment} />,
          <Icon type="ellipsis" key="ellipsis" />
        ]}
        extra={<Button>팔로우</Button>}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nicname}</Avatar>}
          title={post.User.nicname}
          description={post.contents}
        />
      </Card>
      {commentFormOpend && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item>
              <Input.TextArea
                rows={4}
                value={commentText}
                onChange={onChangeCommentText}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddingComment}>
              삐약
            </Button>
          </Form>
          <List
            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  );
};
PostCard.propTypes = {
  post: PropTypes.shape({
    User: PropTypes.object,
    content: PropTypes.string,
    img: PropTypes.string,
    createdAt: PropTypes.object
  })
};
export default PostCard;
