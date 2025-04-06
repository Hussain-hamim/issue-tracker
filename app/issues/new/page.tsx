'use client';
import { TextField } from '@radix-ui/themes';
import React from 'react';
import { BiSearch } from 'react-icons/bi';

const NewIssuePage = () => {
  return (
    <div className='max-w-xl'>
      <TextField.Root placeholder='Title'>
        <TextField.Slot>
          <BiSearch size={20} />
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
};

export default NewIssuePage;
