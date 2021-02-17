import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Store } from 'Main/components/index';

const cx = classNames.bind(styles);

const Book = ({ date }) => {
  const [books, setBook] = useState([]);

  useEffect(() => {
    // 이부분에서 date로 Axios 값 불러오기
    setBook([
      {
        id: '1',
        nickName: '이름1',
        items: [
          {
            price: 8000,
            name: '고추',
            quantity: 5,
          },
          {
            price: 8000,
            name: '참기름',
            quantity: 5,
          },
          {
            price: 8000,
            name: '깨',
            quantity: 5,
          },
        ],
      },
      {
        id: '2',
        nickName: '이름2',
        items: [
          {
            price: 8000,
            name: '고추',
            quantity: 5,
          },
        ],
      },
      {
        id: '3',
        nickName: '이름3',
        items: [],
      },
      {
        id: '4',
        nickName: '이름4',
        items: [
          {
            price: 8000,
            name: '고추',
            quantity: 5,
          },
        ],
      },
    ]);
  }, []);

  return (
    <div className={cx('book__wrap')}>
      <div className={cx('book__title')}>장부</div>
      {books.length === 0 ? (
        // TODO: 이부분에 데이터 없으면 생성하는 버튼 만들기
        <div> 데이터가 없습니다.</div>
      ) : (
        books.map((book, i) => <Store book={book} key={i} />)
      )}
    </div>
  );
};

export default withRouter(Book);
