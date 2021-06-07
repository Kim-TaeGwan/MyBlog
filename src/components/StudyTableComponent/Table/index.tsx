import React, { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
// import PartTitle from 'components/common/PartTitle';
import TableItem from './TableItem';
import { studyApi } from 'shared/Api';
import Pagination from 'components/common/Pagination';

interface Props {
  main?: boolean;
}
const TableComponent: FC<Props> = ({ main }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    async function fetchStudyList() {
      setIsLoading(true);
      try {
        const result = await studyApi.get('/');
        setList(result.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    fetchStudyList();
  }, []);

  // pagination

  let postsPerPage: any = 10;
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFist = indexOfLast - postsPerPage;
  function currentPosts(tmp: any) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFist, indexOfLast);
    return currentPosts;
  }

  return (
    <div className="table_container">
      <h4 className="part_title">StudyTable</h4>
      {main && (
        <div className="all_btn">
          <Link to="/studyTable">전체보기</Link>
        </div>
      )}
      {isLoading && <div className="loader" />}
      <table className={main ? 'main' : ''}>
        <tbody>
          {/*{list &&*/}
          {/*  currentPosts(list).map((item, i): any => (*/}
          {/*    <TableItem*/}
          {/*      key={i}*/}
          {/*      title={item.title}*/}
          {/*      date={moment(item.date).format('YY.MM.DD HH:mm')}*/}
          {/*      category={item.category}*/}
          {/*      url={item.url}*/}
          {/*    />*/}
          {/*  ))}*/}
          {list &&
            list.map((item: any, i) => (
              <TableItem
                key={i}
                title={item.title}
                date={moment(item.date).format('YY.MM.DD HH:mm')}
                category={item.category}
                url={item.url}
              />
            ))}
        </tbody>
      </table>
      {main ? '' : <Pagination postsPerpage={postsPerPage} totalPosts={list.length} paginate={setCurrentPage} />}
    </div>
  );
};

export default TableComponent;
