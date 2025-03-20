'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export const AppbarAuth = () => {
  const session = useSession();

  const handleSignIn = async () => {
    await signIn(); // ✅ Redirects to /blog after login
};

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" }); // Redirects to the landing page ("/")
};
 


  return (
    !session?.data?.user ? (
      <button
        onClick={handleSignIn} // Redirects to the blog page ("/blog")
        className='mx-2 px-2 py-2 text-white bg-blue-700 rounded-lg cursor-pointer' 
      >
        Login
      </button>
    ) : (
        <button
            onClick={handleSignOut}
            className='mx-2 px-2 py-2 text-white bg-blue-700 rounded-lg cursor-pointer'
        >
            Logout
        </button>
    )
  );
};