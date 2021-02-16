import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';

const cx = classNames.bind(styles);

const Book = ({ date }) => {
  const [books, setBook] = useState([]);

  useEffect(() => {
    // 이부분에서 date로 Axios 값 불러오기
    setBook([{ name: '1' }, { name: '2' }, { name: '3' }, { name: '4' }]);
  }, []);

  return (
    <div>
      {books.length === 0 ? (
        <div> 데이터가 없습니다.</div>
      ) : (
        books.map((book, i) => <div key={i}>{book.name}</div>)
      )}
    </div>
  );
};

export default withRouter(Book);
