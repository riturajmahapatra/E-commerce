import './globals.css';
import { Inter } from 'next/font/google';

// ClerkProvider will encapsulate the entire app to provide authentication and session management
import { ClerkProvider } from '@clerk/nextjs';
import { ModalProvider } from '@/providers/modal-provider';

// ToasterProvider come from react-toast and will provide toast notifications to entire app
import { ToasterProvider } from '@/providers/toast-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s : E-Commerce',
    default: 'E-Commerce'
  },
  description:
    'A E-commerce startup business, providing reliable solutions to the customers and vendors'
  // openGraph: {
  //   title: 'E-Commerce',
  //   description: 'A startup business, providing solutions for website development, app development',
  //   type: 'website',
  //   site_name: 'E-Commerce',
  //   url: 'https://digital-growth.vercel.app/',
  //   images: '/DG_ShareImage.webp'
  // }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
