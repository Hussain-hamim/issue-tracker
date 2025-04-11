export { default } from 'next-auth/middleware';

export const config = {
  // matcher: ['/issues/new', '/issues/:id+/edit'],
  matcher: ['/issues/:id+/edit'], // protected routes
};
