import { SignUp } from '@clerk/nextjs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SignUp'
};
export default function Page() {
  return <SignUp />;
}
