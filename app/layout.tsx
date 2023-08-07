import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// ClerkProvider will encapsulate the entire app to provide authentication and session management
import { ClerkProvider } from '@clerk/nextjs';
import { ModalProvider } from '@/providers/modal-provider';

// ToasterProvider come from react-toast and will provide toast notifications to entire app
import { ToasterProvider } from '@/providers/toast-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          <ModalProvider></ModalProvider>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
