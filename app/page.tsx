// import React from 'react';
// import LatestIssues from './LatestIssues';

// export default async function Home() {
//   return <LatestIssues />;
// }

import { prisma } from '@/prisma/client';
import IssueSummary from './IssueSummary';

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: 'OPEN' },
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' },
  });

  return <IssueSummary open={open} inProgress={inProgress} closed={closed} />;
}
