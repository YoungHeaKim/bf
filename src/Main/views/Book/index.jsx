import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './stylesheet.scss';
import { Store, Plus } from 'Main/components/index';
import { Modal } from 'components/index';

const cx = classNames.bind(styles);

const Book = ({ date }) => {
  const [books, setBook] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const modalOpen = () => {
    return setIsModalOpen(true);
  };

  const modalClose = () => {
    return setIsModalOpen(false);
  };

  return (
    <div className={cx('book__wrap')}>
      <div className={cx('book__title')}>장부</div>
      {books.length !== 0 &&
        books.map((book, i) => (
          <Store
            className={cx('book__container')}
            book={book}
            key={i}
            onClick={modalOpen}
          />
        ))}
      <Plus className={cx('book__container')} onClick={modalOpen} />
      <Modal isOpen={isModalOpen} isClose={modalClose}>
        <div>수정</div>
      </Modal>
    </div>
  );
};

export default withRouter(Book);
