import React from 'react';
import _ from 'lodash';

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  console.log('이미지카운터 = ', itemsCount);
  console.log('pageSize카운터  = ', pageSize);
  console.log('currentPage카운터 = ', currentPage);
  console.log('onPageChange = ', onPageChange);
  const pageCount = Math.ceil(itemsCount / pageSize);
  console.log('페이지 카운터 = ', pageCount);

  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'} // Bootstrap을 이용하여 현재 페이지를 시각적으로 표시
            style={{ cursor: 'pointer' }}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>{' '}
            {/* 페이지 번호 클릭 이벤트 처리기 지정 */}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
