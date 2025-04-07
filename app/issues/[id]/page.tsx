import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { prisma } from '@/prisma/client';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react';
import Markdown from 'react-markdown';
import delay from 'delay';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

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
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Box>
        <Heading>{issue?.title}</Heading>
        <Flex gap='3' my='2'>
          <IssueStatusBadge status={issue?.status} />
          <Text>{issue?.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose' mt='4'>
          <Markdown>{issue?.description}</Markdown>
        </Card>
      </Box>

      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
