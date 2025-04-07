'use client';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { issueSchema } from '@/app/issueSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
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

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='tomato' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=' space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            console.log(error);
            setError('an unexpected error occurred.');
          }
        })}
      >
        <TextField.Root placeholder='Title' {...register('title')}>
          <TextField.Slot>
            <BiSearch size={20} />
          </TextField.Slot>
        </TextField.Root>
        {errors && (
          <Text as='p' color='tomato'>
            {errors.title?.message}
          </Text>
        )}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        {errors.description && (
          <Text as='p' color='tomato'>
            {errors.description.message}
          </Text>
        )}

        <Button type='submit'>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
