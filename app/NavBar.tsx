'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug, AiFillSetting } from 'react-icons/ai';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import { BiLogIn, BiLogOut, BiUser } from 'react-icons/bi';
import { MoonIcon } from '@radix-ui/react-icons';
import { Skeleton } from '@/app/components';

const NavBar = () => {
  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='5'>
            <Link href='/'>
              <AiFillBug size={20} color='green' />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <ul className='flex space-x-6'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              'nav-link': true,
              '!text-zinc-900': link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton />;

  if (status === 'unauthenticated')
    return (
      <Link className='nav-link' href='/api/auth/signin'>
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback={<BiUser color='violet' />}
            size='2'
            radius='full'
            className='cursor-pointer'
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Flex direction='column'>
              <Text size='2' className='font-bold'>
                {session!.user!.email}
              </Text>
              <Text className='pb-3' size='2'>
                Hello {session!.user!.name}!
              </Text>
            </Flex>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <BiLogIn size={18} />
            <Link href='/api/auth/signin'>Login</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <AiFillSetting size={18} />
            <Link href='/'>Settings</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <MoonIcon />
            <Link href='/'>Dark Mode</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <BiLogOut size={18} />
            <Link href='/api/auth/signout'>Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
