import React from 'react';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex justify-center items-center h-full mt-[100px]">{children}</div>
    </>
  );
}
