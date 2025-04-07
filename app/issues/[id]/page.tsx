import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { prisma } from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react';
import Markdown from 'react-markdown';
import delay from 'delay';

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const id = parseInt((await params).id);

  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) notFound();

  await delay(2000);

  return (
    <div>
      <Heading>{issue?.title}</Heading>
      <Flex gap='3' my='2'>
        <IssueStatusBadge status={issue?.status} />
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose' mt='4'>
        <Markdown>{issue?.description}</Markdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
