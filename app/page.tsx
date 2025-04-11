import React from 'react';
import Pagination from './components/Pagination';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // const page = Number((await searchParams).page) || 1; // my solution

  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1; // Default to page 1 if invalid or missing
  console.log('page', page);

  return <Pagination itemCount={100} pageSize={10} currentPage={page} />;
}
