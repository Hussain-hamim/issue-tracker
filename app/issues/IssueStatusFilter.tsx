'use client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const statuses: { label: string; value?: string }[] = [
  { label: 'All', value: 'ALL' } /** TODO: fixed*/,
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const obj = {
    // ...searchParams.getAll('orderBy'),
    orderBy: searchParams.get('orderBy'),
    status: searchParams.get('status'),
  };
  console.log('why', obj);
  // const orderBy = searchParams.get('orderBy');

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || ''}
      onValueChange={(status) => {
        const query = status === 'ALL' ? '' : `?status=${status}`;
        router.push('/issues' + query);
        // if (orderBy) {
        //   router.push('/issues' + query + '&' + 'orderBy=' + orderBy);
        // }
      }}
    >
      <Select.Trigger placeholder='Filter by status...' />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || ''}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
