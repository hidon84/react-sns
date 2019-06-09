import React, { useState, useCallback, memo, useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import Router from 'next/router';

const TextInput = memo(({ value, onChange }) => {
  return <Input name="user-id" value={value} required onChange={onChange} />;
});
/**
 * 커스텀 훅
 * @param {} initValue
 */
export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback(e => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};
const Signup = () => {
  //   const [id, setId] = useState('');
  const dispatch = useDispatch();
  const [id, onChangeId] = useInput('');
  const [nick, setNick] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);
  const { isSigningUp, me } = useSelector(state => state.user);
  useEffect(() => {
    if (me) {
      Router.push('/');
    }
  }, [me && me.id]);
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (term == false) {
        return setTermError(true);
      }

      console.log({ id, nick, password, passwordCheck, term });
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { id, nick, password, passwordCheck, term }
      });
    },
    [password, passwordCheck, term]
  );
  //   const onChangeId = e => {
  //     setId(e.target.value);
  //   };
  const onChangeNicname = e => {
    setNick(e.target.value);
  };
  const onChangePassword = e => {
    setPassword(e.target.value);
  };
  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );
  const onChangeTerm = useCallback(e => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <>
      <Form onSubmit={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <TextInput value={id} onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <TextInput
            name="user-nick"
            value={nick}
            required
            onChange={onChangeNicname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <TextInput
            name="user-password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호확인</label>
          <br />
          <TextInput
            name="user-password-check"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
        </div>
        {passwordError && (
          <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>
        )}
        <div>
          <Checkbox name="user-term" onChange={onChangeTerm} /> 약관에
          동의하시겠습니까?
          {termError && (
            <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>
          )}
        </div>
        <div style={{ marginTop: 10 }} />
        <div>
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </div>
      </Form>
    </>
  );
};
export default Signup;
