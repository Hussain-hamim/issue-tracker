import z from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }).max(255),
  description: z.string().min(1, 'description is required'),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(255)
    .max(65535)
    .optional(),
  description: z
    .string()
    .min(1, 'description is required')
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, 'assign to userId is required')
    .max(255)
    .optional()
    .nullable(),
  status: z.string().optional(),
});
