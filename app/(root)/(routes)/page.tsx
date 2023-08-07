'use client';

import { Modal } from '@/components/ui/modal';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';

// This is main page of the app which will be rendered if the user do not have any store.
console.log('SetupPage');
const SetupPage = () => {
  // We are using useStoreModal hook to manage the state of modal component.
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  // When the empty main page loaded we will open the create store modal by below logic.
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
