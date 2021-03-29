import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { AuthApi } from 'API';
import { useCookies } from 'react-cookie';

const cx = classNames.bind(styles);

const Login = ({ loginFunc }) => {
  const [login, setLogin] = useState({
    userId: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [fields, setField] = useState([]);
  const [cookies] = useCookies(null);

  const inputChange = (e, type) => {
    setLogin({
      ...login,
      [type]: e.target.value,
    });
  };

  const clickLogin = e => {
    e.preventDefault();

    if (login.userId === '') {
      setField(['userId']);
      return setError('아이디나 비밀번호가 맞지 않습니다.');
    }
    if (login.password === '') {
      setField(['password']);
      return setError('아이디나 비밀번호가 맞지 않습니다.');
    }

    // 이부분에서 로그인 정보 확인 및 쿠키 등록
    return AuthApi.createAuth(login)
      .then(loginFunc)
      .catch(data => {
        console.log('catch', data);
        setError('아이디나 비밀번호가 맞지 않습니다.');
      });
  };

  if (cookies.token) {
    return <Redirect to={'/'} />;
  }

  return (
    <div className={cx('login__wrap')}>
      <h2>Login</h2>
      <form>
        <div className={cx('login__input__wrap')}>
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            value={login.userId}
            className={
              fields.length > 0 && fields.includes('userId')
                ? cx('login__error__input')
                : cx('login__input')
            }
            onChange={e => inputChange(e, 'userId')}
          />
        </div>
        <div className={cx('login__input__wrap')}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={login.password}
            className={
              fields.length > 0 && fields.includes('password')
                ? cx('login__error__input')
                : cx('login__input')
            }
            onChange={e => inputChange(e, 'password')}
          />
        </div>
        {error && <div className={cx('login__error')}>{error}</div>}
        <div className={cx('login__button')}>
          <button onClick={e => clickLogin(e)}>로그인</button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Login);
