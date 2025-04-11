import React from 'react';
import Pagination from './components/Pagination';

const HomePage = () => {
  return <Pagination itemCount={101} pageSize={10} currentPage={2} />;
};

export default HomePage;
