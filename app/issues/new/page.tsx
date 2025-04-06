'use client';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder='Title'>
        <TextField.Slot>
          <BiSearch size={20} />
        </TextField.Slot>
      </TextField.Root>
      <SimpleMDE className='' placeholder='Description' />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
