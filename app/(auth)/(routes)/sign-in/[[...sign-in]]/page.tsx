import { SignIn } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SignIn'
};
export default function Page() {
  return <SignIn />;
}
