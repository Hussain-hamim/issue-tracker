import { prisma } from '@/prisma/client';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import Pagination from '../components/Pagination';
import IssueTable, { columnNames } from './IssueTable';
import { Box, Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue; page: string }>;
}

export default async function IssuePage({ searchParams }: Props) {
  const orderByParams = (await searchParams).orderBy;

  const statues = Object.values(Status);
  const status = statues.includes((await searchParams).status)
    ? (await searchParams).status
    : undefined;

  const orderBy = columnNames.includes(orderByParams)
    ? { [orderByParams]: 'asc' }
    : undefined;

  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: orderBy /**TODO: fixed*/,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status },
  });

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Box className='self-center'>
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        />
      </Box>
    </Flex>
  );
}

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
};
