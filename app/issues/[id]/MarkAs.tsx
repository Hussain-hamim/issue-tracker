'use client';

import { Issue } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const MarkAs = ({ issue }: { issue: Issue }) => {
  const statuses: { label: string; value: string }[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  const assignStatus = (status: string) => {
    axios
      .patch('/api/issues/' + issue.id, {
        status: status || null,
      })
      .then(() => {
        toast.success('Issue Successfully Marked');
      })
      .catch(() => {
        toast.error('Changes could not be saved.');
      });
  };

  return (
    <>
      <Select.Root
        // defaultValue={issue.status || ''}
        onValueChange={assignStatus}
      >
        <Select.Trigger placeholder='Mark As' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Mark as</Select.Label>
            {/* <Select.Item value={''}>Unassigned</Select.Item> */}
            {statuses?.map((issue) => (
              <Select.Item key={issue.label} value={issue.value}>
                {issue.value}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default MarkAs;
