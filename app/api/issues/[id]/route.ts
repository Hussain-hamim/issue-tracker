import authOptions from '@/app/auth/authOptions';
import { patchIssueSchema } from '@/app/issueSchema';
import { prisma } from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const { assignedToUserId, title, description } = body;
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: 'invalid user' }, { status: 404 });
  }

  const id = parseInt((await params).id);

  const issue = await prisma.issue.findUnique({
    where: { id },
  });
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const id = parseInt((await params).id);

  const issue = await prisma.issue.findUnique({
    where: { id },
  });
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
