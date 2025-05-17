// frontend/components/EditModal.tsx
'use client';
import { Dialog } from '@headlessui/react';
import React from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function EditModal({ isOpen, onClose, children }: EditModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10">
      <div className="fixed inset-0 bg-black/50" />
      <div className="flex items-center justify-center min-h-full">
        <Dialog.Panel className="bg-white rounded p-6 w-full max-w-md shadow-lg">
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
