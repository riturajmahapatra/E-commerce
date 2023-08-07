import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function SetupLayout({ children }: { children: React.ReactNode }) {
  // call the auth function to check user is already signed in or not.
  const { userId } = auth();

  // If not signed in, redirect to sign in page.
  if (!userId) {
    redirect('/sign-in');
  }

  // If signed in, check if the user has a store.
  const store = await prismadb.store.findFirst({
    where: {
      userId
    }
  });

  // If the user has a store, redirect to the store page.
  if (store) {
    redirect(`/${store.id}`);
  }
  return <>{children}</>;
}
