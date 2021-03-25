import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { useCookies } from 'react-cookie';

const cx = classNames.bind(styles);

const Login = ({ loginFunc }) => {
  const [cookies, setCookie] = useCookies(['rememberNumber']);
  const [login, setLogin] = useState({
    id: '',
    psd: '',
  });

  const inputChange = (e, type) => {
    setLogin({
      ...login,
      [type]: e.target.value,
    });
  };

  const clickLogin = () => {
    // 이부분에서 로그인 정보 확인 및 쿠키 등록
    console.log('login');
    loginFunc(login);
  };

  return (
    <div className={cx('login__wrap')}>
      <h2>Login</h2>
      <form>
        <div className={cx('login__input__wrap')}>
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            value={login.name}
            className={cx('login__input')}
            onChange={e => inputChange(e, 'id')}
          />
        </div>
        <div className={cx('login__input__wrap')}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={login.psd}
            className={cx('login__input')}
            onChange={e => inputChange(e, 'psd')}
          />
        </div>
        <div className={cx('login__button')}>
          <button onClick={clickLogin}>로그인</button>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Login);
