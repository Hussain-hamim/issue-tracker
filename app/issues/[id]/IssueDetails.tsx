import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Heading, Flex, Card, Text } from '@radix-ui/themes';
import React from 'react';
import Markdown from 'react-markdown';
import MarkAs from './MarkAs';

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <Flex gap='3' my='2' align='center'>
        <IssueStatusBadge status={issue?.status} />
        <Text>{issue?.createdAt.toDateString()}</Text>
        <MarkAs issue={issue} />
      </Flex>
      <Card className='prose max-w-full' mt='4'>
        <Markdown>{issue?.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetails;
