import { prisma } from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueActions from './IssueActions';
import { IssueStatusBadge, Link } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '../components/Pagination';
// import delay from 'delay';

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue; page: string }>;
}

export default async function IssuePage({ searchParams }: Props) {
  const columns: { label: string; value: keyof Issue; classname?: string }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', classname: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', classname: 'hidden md:table-cell' },
  ];

  const orderByParams = (await searchParams).orderBy;

  const statues = Object.values(Status);
  const status = statues.includes((await searchParams).status)
    ? (await searchParams).status
    : undefined;

  const orderBy = columns.map((column) => column.value).includes(orderByParams)
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
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map(async (column) => (
              <Table.ColumnHeaderCell
                className={column.classname}
                key={column.value}
              >
                <NextLink
                  href={{
                    query: { ...(await searchParams), orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === orderByParams && (
                  <ArrowUpIcon className='inline' />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
}

export const dynamic = 'force-dynamic';
