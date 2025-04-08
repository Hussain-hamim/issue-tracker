'use client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false, // tell nextjs not to render this on
}); // dynamic import to avoid error: navigator not defined
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { issueSchema } from '@/app/issueSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';

type IssueForm = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });

  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) await axios.patch('/api/issues/' + issue.id, data);
      // for updating the issue
      else await axios.post('/api/issues', data); // for creating new
      router.push('/issues');
      router.refresh();
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setError('an unexpected error occurred.');
    }
  });

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=' space-y-3' onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder='Title'
          {...register('title')}
        >
          <TextField.Slot>
            <BiSearch size={20} />
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting} type='submit'>
          {issue ? 'Update Issue' : 'Submit New Issue'}

          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
